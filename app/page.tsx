

"use client";
import { useState } from "react";
export default function Home() {
const [screen, setScreen] = useState("opening");
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const box = { background: "black", color: "white", minHeight: "100vh", textAlign: "center", padding: "40px 20px", fontFamily: "sans-serif" };
const input = { display: "block", width: "100%", maxWidth: "320px", margin: "10px auto", padding: "13px", borderRadius: "10px", border: "none" };
const btn = { background: "gold", color: "black", border: "none", padding: "13px 25px", borderRadius: "10px", fontWeight: "bold", marginTop: "10px" };
const linkBtn = { background: "transparent", color: "gold", border: "1px solid gold", padding: "10px 20px", borderRadius: "10px", margin: "5px" };
if (screen === "opening") { return ( <main style={box}><h1 style={{ fontSize: "48px" }}>ONE<span style={{ color: "gold" }}>WORLD</span></h1><p>ONE WORLD. ONE PEOPLE. ONE PLATFORM.</p><p>Everything Liberia In One Place.</p><div><button style={btn} onClick={() => setScreen("signup")}>Get Started</button><br /><button style={linkBtn} onClick={() => setScreen("login")}>Login</button></div></main> ); }
if (screen === "signup") { return ( <main style={box}><h1>Sign Up</h1><p>Create your ONEWORLD account</p><input style={input} placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} /><input style={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><input style={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><button style={btn} onClick={() => setScreen("welcome")}>Create Account</button><br /><button style={linkBtn} onClick={() => setScreen("login")}>Already have account? Login</button><br /><button style={linkBtn} onClick={() => setScreen("opening")}>Back</button></main> ); }
if (screen === "login") { return ( <main style={box}><h1>Login</h1><p>Welcome back</p><input style={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><input style={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><button style={btn} onClick={() => setScreen("welcome")}>Login</button><br /><button style={linkBtn} onClick={() => setScreen("signup")}>No account? Sign Up</button><br /><button style={linkBtn} onClick={() => setScreen("opening")}>Back</button></main> ); }
if (screen === "welcome") { return ( <main style={box}><h1>Welcome!</h1><p>Hello {name}, You don join ONEWORLD.</p><p>Your Liberia journey start now.</p><button style={btn} onClick={() => setScreen("home")}>Enter Homepage</button></main> ); }
return ( <main style={{ background: "black", color: "white", minHeight: "100vh", padding: "20px", fontFamily: "sans-serif" }}><h1>ONE<span style={{ color: "gold" }}>WORLD</span></h1><h2 style={{ textAlign: "center" }}>Everything Liberia In One Place.</h2><p style={{ textAlign: "center" }}>Music - News - Jobs - Market - Football - Community</p><div style={{ textAlign: "center", marginTop: "20px" }}><button style={linkBtn} onClick={() => setScreen("opening")}>Logout</button></div><p style={{ textAlign: "center", color: "#666", fontSize: "12px" }}>2026 ONEWORLD - Primeroll</p></main> );
}

