const API = "http://localhost:3000/api";

// LOGIN
async function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if(res.ok){
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else alert(data.message);
}

// REGISTER
async function register(e){
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if(password !== confirm) return alert("Passwords do not match");

  const res = await fetch(`${API}/auth/register`, {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ username, email, password })
  });

  if(res.ok){
    alert("Registered!");
    window.location.href="login.html";
  }
}

// IMAGE DETECTION
async function detectImage(){
  const file = document.getElementById("imageFile").files[0];
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API}/detect/image`, {
    method:"POST",
    headers:{ Authorization:`Bearer ${token}` },
    body: formData
  });

  const data = await res.json();
  document.getElementById("imageResult").innerText = JSON.stringify(data,null,2);
}

// VIDEO DETECTION
async function detectVideo(){
  const file = document.getElementById("videoFile").files[0];
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("video", file);

  const res = await fetch(`${API}/detect/video`, {
    method:"POST",
    headers:{ Authorization:`Bearer ${token}` },
    body: formData
  });

  const data = await res.json();
  document.getElementById("videoResult").innerText = JSON.stringify(data,null,2);
}

// AUTH CHECK
function checkAuth(){
  if(!localStorage.getItem("token")){
    window.location.href="login.html";
  }
}

// LOAD USER
async function loadUser(){
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/user/profile`, {
    headers:{ Authorization:`Bearer ${token}` }
  });

  const user = await res.json();
  document.getElementById("username").innerText = user.username;
}

// LOGOUT
function logout(){
  localStorage.removeItem("token");
  window.location.href="login.html";
}