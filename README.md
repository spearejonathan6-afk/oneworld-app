'use client';

import React, { useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const COUNTRIES = [
  'Liberia',
  'Nigeria',
  'Ghana',
  'Sierra Leone',
  'United States',
  'United Kingdom',
  'Canada',
  'South Africa',
  'Kenya',
];

export default function OneWorldApp() {
  const [step, setStep] = useState<'landing' | 'signup' | 'verify' | 'terms' | 'home'>('landing');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: 'Liberia',
    phone: '',
    email: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    password: '',
    confirmPassword: '',
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignupNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match.');
    }
    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      if (authMethod === 'phone') {
        if (!formData.phone) throw new Error('Please enter your mobile number.');
        const formattedPhone = formData.phone.startsWith('+')
          ? formData.phone
          : `+${formData.phone.replace(/^0+/, '')}`;

        const { error: otpError } = await supabase.auth.signInWithOtp({
          phone: formattedPhone,
        });
        if (otpError) throw otpError;
        setFormData((prev) => ({ ...prev, phone: formattedPhone }));
      } else {
        if (!formData.email) throw new Error('Please enter your email address.');
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: formData.email,
        });
        if (otpError) throw otpError;
      }
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otp.join('');
    if (token.length !== 6) {
      return setError('Please enter all 6 digits.');
    }

    setLoading(true);
    setError('');
    try {
      const verifyPayload =
        authMethod === 'phone'
          ? { phone: formData.phone, token, type: 'sms' as const }
          : { email: formData.email, token, type: 'email' as const };

      const { error: verifyError } = await supabase.auth.verifyOtp(verifyPayload);
      if (verifyError) throw verifyError;

      setStep('terms');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const payload =
        authMethod === 'phone'
          ? { phone: formData.phone }
          : { email: formData.email };
      const { error: resendError } = await supabase.auth.signInWithOtp(payload);
      if (resendError) throw resendError;
      setMessage('A new code has been sent.');
    } catch (err: any) {
      setError(err.message || 'Could not resend code.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgreeAndCreate = async () => {
    setLoading(true);
    setError('');
    try {
      const { data: userData, error: updateError } = await supabase.auth.updateUser({
        password: formData.password,
      });
      if (updateError) throw updateError;

      const formattedDob =
        formData.dobYear && formData.dobMonth && formData.dobDay
          ? `${formData.dobYear}-${formData.dobMonth.padStart(2, '0')}-${formData.dobDay.padStart(2, '0')}`
          : null;

      if (userData?.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: userData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            country: formData.country,
            phone: authMethod === 'phone' ? formData.phone : null,
            email: authMethod === 'email' ? formData.email : null,
            dob: formattedDob,
          },
        ]);
        if (profileError) throw profileError;
      }

      setStep('home');
    } catch (err: any) {
      setError(err.message || 'Error finalizing your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-5 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl">
        {step === 'landing' && (
          <div className="flex flex-col items-center text-center space-y-10 py-8">
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-widest text-blue-400">
                ONEWORLD
              </h1>
              <p className="text-slate-300 text-lg font-light">
                Making the world feels together
              </p>
            </div>

            <div className="w-full space-y-4 pt-4">
              <button
                onClick={() => setStep('signup')}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full transition shadow-lg shadow-blue-600/30"
              >
                LOGIN / SIGN UP
              </button>

              <button
                onClick={() => alert('Exploring OneWorld as a guest...')}
                className="w-full py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-full transition border border-slate-700"
              >
                Explore the world
              </button>
            </div>

            <button
              onClick={() => alert('Contact us: support@oneworld.app')}
              className="text-sm text-slate-400 hover:text-white underline underline-offset-4 pt-4"
            >
              Contact us / Need help?
            </button>
          </div>
        )}

        {step === 'signup' && (
          <form onSubmit={handleSignupNext} className="space-y-4">
            <div className="text-center space-y-1 pb-1">
              <h1 className="text-2xl font-extrabold tracking-widest text-blue-400">
                ONEWORLD
              </h1>
              <p className="text-sm text-slate-300">
                Sign up to get the best experience
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs bg-red-500/10 border border-red-500/50 text-red-300 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">First name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-400">
                  {authMethod === 'phone' ? 'Mobile Number' : 'Email'}
                </label>
                <button
