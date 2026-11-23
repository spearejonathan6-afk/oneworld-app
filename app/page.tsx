
html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PulseTube — Social & Video Hub</title>
  <style>
    :root {
      --bg: #f0f2f5;
      --surface: #ffffff;
      --primary: #1877f2;
      --accent: #ff0000;
      --text: #1c1e21;
      --muted: #65676b;
      --border: #dddfe2;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    }

    body {
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }

    .hidden {
      display: none !important;
    }

    /* Opening Page */
    .opening {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 24px;
      background: linear-gradient(135deg, #1877f2 0%, #0f172a 100%);
      color: #fff;
    }

    .opening h1 {
      font-size: 2.5rem;
      margin-bottom: 12px;
    }

    .opening p {
      max-width: 480px;
      margin-bottom: 24px;
      opacity: 0.92;
      line-height: 1.5;
    }

    .btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    button {
      cursor: pointer;
      border: none;
      border-radius: 8px;
      padding: 10px 18px;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .btn-primary {
      background: var(--primary);
      color: #fff;
    }

    .btn-light {
      background: #fff;
      color: var(--text);
    }

    .btn-outline {
      background: transparent;
      color: #fff;
      border: 1.5px solid #fff;
    }

    /* Auth Cards (Sign Up / Login) */
    .auth-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .auth-card {
      background: var(--surface);
      padding: 28px;
      border-radius: 12px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    .auth-card h2 {
      margin-bottom: 16px;
    }

    .auth-card input,
    .post-box textarea,
    .post-box input {
      width: 100%;
      padding: 11px 12px;
      margin-bottom: 12px;
      border: 1px solid var(--border);
      border-radius: 8px;
      font-size: 0.95rem;
    }

    .auth-card button[type="submit"] {
      width: 100%;
      margin-bottom: 10px;
    }

    .switch-link {
      color: var(--primary);
      background: none;
      padding: 4px;
      font-size: 0.9rem;
    }

    .error-msg {
      color: #c62828;
      font-size: 0.88rem;
      margin-bottom: 10px;
    }

    /* Navbar & Homepage */
    nav {
      position: sticky;
      top: 0;
      z-index: 10;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .brand {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--primary);
    }

    .brand span {
      color: var(--accent);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .home-container {
      max-width: 820px;
      margin: 24px auto;
      padding: 0 16px;
      display: grid;
      gap: 20px;
    }

    .card {
      background: var(--surface);
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    }

    .card h3 {
      margin-bottom: 12px;
      font-size: 1.05rem;
    }

    .feed-item {
      border-top: 1px solid var(--border);
      padding-top: 12px;
      margin-top: 12px;
    }

    .feed-item:first-child {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }

    .meta {
      font-size: 0.82rem;
      color: var(--muted);
      margin-bottom: 6px;
    }

    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 14px;
    }

    .video-thumb {
      height: 120px;
      border-radius: 8px;
      background: #111827;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>

  <!-- 1. OPENING PAGE -->
  <section id="opening-page" class="opening">
    <h1>PulseTube</h1>
    <p>Share status updates with friends and watch trending videos in one place.</p>
    <div class="btn-row">
      <button class="btn-light" onclick="showView('signup-page')">Sign Up</button>
      <button class="btn-outline" onclick="showView('login-page')">Log In</button>
    </div>
  </section>

  <!-- 2. SIGN UP PAGE -->
  <section id="signup-page" class="auth-wrapper hidden">
    <form class="auth-card" onsubmit="handleSignup(event)">
      <h2>Create Account</h2>
      <div id="signup-error" class="error-msg"></div>
      <input type="text" id="signup-name" placeholder="Full Name" required />
      <input type="email" id="signup-email" placeholder="Email Address" required />
      <input type="password" id="signup-password" placeholder="Password (min 6 chars)" minlength="6" required />
      <button type="submit" class="btn-primary">Sign Up</button>
      <button type="button" class="switch-link" onclick="showView('login-page')">Already have an account? Log In</button>
      <button type="button" class="switch-link" onclick="showView('opening-page')">Back to Opening Page</button>
    </form>
  </section>

  <!-- 3. LOGIN PAGE -->
  <section id="login-page" class="auth-wrapper hidden">
    <form class="auth-card" onsubmit="handleLogin(event)">
      <h2>Log In</h2>
      <div id="login-error" class="error-msg"></div>
      <input type="email" id="login-email" placeholder="Email Address" required />
      <input type="password" id="login-password" placeholder="Password" required />
      <button type="submit" class="btn-primary">Log In</button>
      <button type="button" class="switch-link" onclick="showView('signup-page')">Need an account? Sign Up</button>
      <button type="button" class="switch-link" onclick="showView('opening-page')">Back to Opening Page</button>
    </form>
  </section>

  <!-- 4. HOMEPAGE -->
  <section id="home-page" class="hidden">
    <nav>
      <div class="brand">Pulse<span>Tube</span></div>
      <div class="nav-actions">
        <span id="nav-user" class="meta"></span>
        <button class="btn-primary" onclick="handleLogout()">Log Out</button>
      </div>
    </nav>

    <main class="home-container">
      <!-- Social Feed Composer & Posts (Facebook-style) -->
      <div class="card post-box">
        <h3>Create Post</h3>
        <form onsubmit="handleAddPost(event)">
          <textarea id="post-input" rows="2" placeholder="What's on your mind?" required></textarea>
          <button type="submit" class="btn-primary">Post Update</button>
        </form>
        <div id="feed-list"></div>
      </div>

      <!-- Video Feed (YouTube-style) -->
      <div class="card">
        <h3>Trending Videos</h3>
        <div class="video-grid" id="video-list"></div>
      </div>
    </main>
  </section>

  <script>
    const views = ["opening-page", "signup-page", "login-page", "home-page"];

    const defaultVideos = [
      { title: "Building a Web App in 10 Minutes", channel: "CodeCraft", views: "124K views" },
      { title: "Top Travel Spots Around the Coast", channel: "Wanderlust", views: "89K views" },
      { title: "Quick Morning Workout Routine", channel: "FitDaily", views: "210K views" }
    ];

    function showView(viewId) {
      views.forEach((id) => {
        document.getElementById(id).classList.toggle("hidden", id !== viewId);
      });
    }

    function getUsers() {
      return JSON.parse(localStorage.getItem("pt_users") || "[]");
    }

    function saveUsers(users) {
      localStorage.setItem("pt_users", JSON.stringify(users));
    }

    function getPosts() {
      return JSON.parse(localStorage.getItem("pt_posts") || "[]");
    }

    function savePosts(posts) {
      localStorage.setItem("pt_posts", JSON.stringify(posts));
    }

    function handleSignup(e) {
      e.preventDefault();
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim().toLowerCase();
      const password = document.getElementById("signup-password").value;
      const errorEl = document.getElementById("signup-error");

      const users = getUsers();
      if (users.some((u) => u.email === email)) {
        errorEl.textContent = "An account with this email already exists.";
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      saveUsers(users);
      localStorage.setItem("pt_session", JSON.stringify(newUser));
      errorEl.textContent = "";
      e.target.reset();
      openHomepage(newUser);
    }

    function handleLogin(e) {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const password = document.getElementById("login-password").value;
      const errorEl = document.getElementById("login-error");

      const user = getUsers().find((u) => u.email === email && u.password === password);
      if (!user) {
        errorEl.textContent = "Invalid email or password.";
        return;
      }

      localStorage.setItem("pt_session", JSON.stringify(user));
      errorEl.textContent = "";
      e.target.reset();
      openHomepage(user);
    }

    function handleLogout() {
      localStorage.removeItem("pt_session");
      showView("opening-page");
    }

    function handleAddPost(e) {
      e.preventDefault();
      const session = JSON.parse(localStorage.getItem("pt_session"));
      const text = document.getElementById("post-input").value.trim();
Use code with caution.
if (!text || !session) return;
const posts = getPosts();
posts.unshift({
author: session.name,
text,
time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
});
savePosts(posts);
document.getElementById("post-input").value = "";
renderFeed();
}
function renderFeed() {
const list = document.getElementById("feed-list");
const posts = getPosts();
if (!posts.length) {
list.innerHTML = <div class="feed-item meta">No posts yet. Share the first update above.</div>;
return;
}
list.innerHTML = posts
.map(
(p) => `

${escapeHtml(p.author)} · ${escapeHtml(p.time)}
${escapeHtml(p.text)}
`
)
.join("");
}
function renderVideos() {
const grid = document.getElementById("video-list");
grid.innerHTML = defaultVideos
.map(
(v) =>  <div> <div class="video-thumb">▶ Watch</div> <strong>${escapeHtml(v.title)}</strong> <div class="meta">${escapeHtml(v.channel)} · ${escapeHtml(v.views)}</div> </div>
)
.join("");
}
function openHomepage(user) {
document.getElementById("nav-user").textContent = Hi, ${user.name};
renderFeed();
renderVideos();
showView("home-page");
}
function escapeHtml(str) {
return str
.replace(/&/g, "&")
.replace(/</g, "<")
.replace(/>/g, ">")
.replace(/"/g, """);
}
const activeUser = JSON.parse(localStorage.getItem("pt_session") || "null");
if (activeUser) {
openHomepage(activeUser);
} else {
showView("opening-page");
}



### Next Steps for Production
* **Real authentication & database:** Replace `localStorage` with a backend service (such as Firebase Authentication, Supabase, or your own API with hashed passwords).
* **Real video playback:** Swap the placeholder video cards for embedded players or video streams (`<video>` tags or YouTube embeds).
* **Deployment:** You can host static files on platforms like [Netlify](https://www.netlify.com/) [0.6.14] once you expand the app.
  
