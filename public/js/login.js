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
