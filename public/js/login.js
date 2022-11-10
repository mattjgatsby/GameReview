const { urlencoded } = require("express");

const loginForm = async (event) => {
  event.preventDefault();

  const userName = document.querySelector("#email-login").value.trim();
  const userPassword = document.querySelector("#password-login").value.trim();

  if (userName && userPassword) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ userName, userPassword }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

const signpForm = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#name-signup').value.trim()
    const userPassword = document.querySelector('#password-signup').value.trim()
    
    if(userName && userPassword) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({userName, userPassword}),
            headers: { 'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText)
        }
    }
}

document
.querySelector('.login-form')
.addEventListener('submit', loginForm)

document
.querySelector('.signup-form')
.addEventListener('submit', signpForm)