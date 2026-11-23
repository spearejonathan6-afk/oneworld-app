

"use client";
import { useState } from "react";
export default function Home() {
const [screen, setScreen] = useState("signup");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const input = { display: "block", width: "100%", maxWidth: "320px", margin: "10px auto", padding: "13px", borderRadius: "10px", border: "none" };
const btn = { background: "gold", color: "black", border: "none", padding: "13px 25px", borderRadius: "10px", fontWeight: "bold" };
const box = { background: "black", color: "white", minHeight: "100vh", textAlign: "center", padding: "40px 20px" };

if (screen === "signup") {
return (
< main style={box} >
< h1 >Sign Up< /h1 >
< p >Create your ONEWORLD account< /p >
< input style={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} / >
< input style={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} / >
< button style={btn} onClick={() => setScreen("login")} >Create Account< /button >
< br / >
< button style={btn} onClick={() => setScreen("login")} >Go To Login< /button >
< /main >
);
}

return (
< main style={box} >
< h1 >Login< /h1 >
< p >Welcome back< /p >
< input style={input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} / >
< input style={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} / >
< button style={btn} onClick={() => setScreen("signup")} >Login< /button >
< br / >
< button style={btn} onClick={() => setScreen("signup")} >Go To Sign Up< /button >
< /main >
);
}

