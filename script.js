
// ELEMENTS
const authContainer = document.getElementById("authContainer");
const authPage = document.getElementById("authPage");
const dashboard = document.getElementById("dashboard");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const displayUsername = document.getElementById("displayUsername");


// SLIDING TRANSITION

showRegister.addEventListener("click", () => {
    authContainer.classList.add("show-register");
});

showLogin.addEventListener("click", () => {
    authContainer.classList.remove("show-register");
});


// GET SAVED ACCOUNTS

function getAccounts() {
    return JSON.parse(localStorage.getItem("codeverseAccounts")) || [];
}


// SAVE ACCOUNT

function saveAccounts(accounts) {
    localStorage.setItem("codeverseAccounts", JSON.stringify(accounts));
}


// REGISTER ACCOUNT

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // CHECK PASSWORD

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (password.length < 8) {
        alert("Password must contain at least 8 characters.");
        return;
    }

    // CHECK EXISTING ACCOUNT

    const accounts = getAccounts();

    const existingAccount = accounts.find(account =>
        account.email === email ||
        account.username.toLowerCase() === username.toLowerCase()
    );

    if (existingAccount) {
        alert("Username or email is already registered!");
        return;
    }

    // CREATE ACCOUNT

    const newAccount = {
        username: username,
        email: email,
        password: password
    };

    accounts.push(newAccount);

    saveAccounts(accounts);

    alert("Account created successfully! You can now login.");

    // RESET FORM

    registerForm.reset();

    // GO BACK TO LOGIN

    authContainer.classList.remove("show-register");

    document.getElementById("loginEmail").value = email;

});


// LOGIN ACCOUNT

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const loginInput = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    const accounts = getAccounts();

    const user = accounts.find(account =>
        (account.email === loginInput ||
         account.username.toLowerCase() === loginInput) &&
        account.password === password
    );

    if (user) {
        openDashboard(user.username);
        loginForm.reset();
    } else {
        alert("Invalid username/email or password!");
    }

});


// OPEN DASHBOARD

function openDashboard(username) {

    authPage.style.display = "none";
    dashboard.style.display = "block";

    displayUsername.textContent = username;

    localStorage.setItem("codeverseCurrentUser", username);

}


// LOGOUT

document.getElementById("logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("codeverseCurrentUser");

    dashboard.style.display = "none";
    authPage.style.display = "flex";

    loginForm.reset();

});


// REMEMBER LOGGED-IN USER (DEMO)

window.addEventListener("DOMContentLoaded", () => {

    const currentUser = localStorage.getItem("codeverseCurrentUser");

    if (currentUser) {
        openDashboard(currentUser);
    }

});


// SOCIAL LOGIN PLACEHOLDERS

document.getElementById("googleLogin").addEventListener("click", () => {
    alert("Google authentication is not configured yet. OAuth setup is required.");
});

document.getElementById("facebookLogin").addEventListener("click", () => {
    alert("Facebook authentication is not configured yet. OAuth setup is required.");
});
