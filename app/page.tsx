


"use client";
import { useState } from "react";
export default function Home() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
return (
[main style={{ background: "black", color: "white", minHeight: "100vh", textAlign: "center", padding: "40px 20px" }}]
[h1]Sign Up[/h1]
[p]Create your ONEWORLD account[/p]
[input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "13px", width: "300px" }} /]
[input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "13px", width: "300px" }} /]
[input type="password" placeholder="Password" style={{ display: "block", margin: "10px auto", padding: "13px", width: "300px" }} /]
[button style={{ background: "gold", padding: "13px 25px", border: "none", borderRadius: "10px", fontWeight: "bold" }}]Create Account[/button]
[p]Hello {name}[/p]
[/main]
);
}

