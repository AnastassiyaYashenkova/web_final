document.addEventListener("DOMContentLoaded", () => {
    // Регистрация пользователей
    const usernameEl = document.getElementById("username");
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const toggleFormBtn = document.getElementById("toggleForm");
    const formTitle = document.getElementById("formTitle");
    const messageEl = document.getElementById("message");
    const toggleText = document.getElementById("toggleText");

    let isLogin = true;

    // Проверка существования элементов 
    if (!usernameEl || !emailEl || !passwordEl || !loginBtn || !signupBtn || !toggleFormBtn) {
        console.error("One or more form elements are missing!");
        return;
    }

    toggleFormBtn.addEventListener("click", (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        formTitle.textContent = isLogin ? "Login" : "Sign Up";
        emailEl.classList.toggle("hidden");
        loginBtn.classList.toggle("hidden");
        signupBtn.classList.toggle("hidden");
        toggleFormBtn.textContent = isLogin ? "Sign Up" : "Login";
        toggleText.textContent = isLogin ? "Don't have an account?" : "Already have an account?";
        messageEl.textContent = "";
    });

    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const username = usernameEl.value.trim();
        const email = emailEl.value.trim();
        const password = passwordEl.value.trim();

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            if (localStorage.getItem(username)) {
                alert("User already exists.");
                return;
            }

            const user = { username, email, password };
            localStorage.setItem(username, JSON.stringify(user));
            alert("Sign up successful! Please log in.");

            // Сброс формы
            usernameEl.value = "";
            emailEl.value = "";
            passwordEl.value = "";
            isLogin = true;
            formTitle.textContent = "Login";
            emailEl.classList.add("hidden");
            loginBtn.classList.remove("hidden");
            signupBtn.classList.add("hidden");
        } catch (error) {
            console.error("LocalStorage error:", error);
            alert("An error occurred. Please try again.");
        }
    });

    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const username = usernameEl.value.trim();
        const password = passwordEl.value.trim();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const userData = JSON.parse(localStorage.getItem(username));
            if (userData && userData.password === password) {
                window.location.href = "index.html";
            } else {
                alert("Incorrect username or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});