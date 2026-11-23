

You are right. Sorry. Na because I dey put Sign Up and Login inside ONE file, na why e dey look like e dey repeat itself. E dey confuse.

We go change am now. We go make them SEPARATE. Two different files. No repeat again.

FILE 1 - SIGN UP ONLY

Create new file: app / signup / page.tsx
Paste this inside:

"use client";
import { useState } from "react";
export default function Signup() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
return (
< main style={{ background: "black", color: "white", minHeight: "100vh", textAlign: "center", padding: "40px 20px" }} >
< h1 >SIGN UP - NEW ACCOUNT< /h1 >
< p >I be new person. I want join ONEWORLD.< /p >
< input placeholder="Your Full Name" value={name} onChange={(e) => setName(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "13px", width: "300px" }} / >
< input placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: "block", margin: "10px auto", padding: "13px", width: "300px" }} / >
< button style={{ background: "gold", padding: "13px 25px", border: "none", borderRadius: "10px", fontWeight: "bold" }} >CREATE MY ACCOUNT< /button >
< p >Hello {name}, your account go create.< /p >
< /main >
);
}


