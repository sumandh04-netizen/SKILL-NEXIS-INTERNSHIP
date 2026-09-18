const API_URL = "http://127.0.0.1:5000";


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const registerCard = document.getElementById("registerCard");
const loginCard = document.getElementById("loginCard");
const profileCard = document.getElementById("profileCard");


// ==========================================
// SHOW REGISTER
// ==========================================

function showRegister() {

    registerCard.classList.remove("hidden");
    loginCard.classList.add("hidden");
    profileCard.classList.add("hidden");

}


// ==========================================
// SHOW LOGIN
// ==========================================

function showLogin() {

    registerCard.classList.add("hidden");
    loginCard.classList.remove("hidden");
    profileCard.classList.add("hidden");

}


// ==========================================
// SHOW PROFILE
// ==========================================

function showProfile() {

    registerCard.classList.add("hidden");
    loginCard.classList.add("hidden");
    profileCard.classList.remove("hidden");

}


// ==========================================
// REGISTER USER
// ==========================================

document
    .getElementById("registerForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const message =
            document.getElementById("registerMessage");


        // Frontend validation

        if (name.length < 2) {

            message.textContent =
                "Name must contain at least 2 characters.";

            return;
        }

        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                message.textContent =
                    "Registration successful!";

                message.style.color = "green";

                document
                    .getElementById("registerForm")
                    .reset();

                setTimeout(() => {

                    showLogin();

                }, 1000);

            } else {

                message.textContent =
                    data.message || "Registration failed.";

                message.style.color = "red";
            }

        } catch (error) {

            message.textContent =
                "Cannot connect to the server.";

            message.style.color = "red";

            console.error(error);
        }

    });


// ==========================================
// LOGIN USER
// ==========================================

document
    .getElementById("loginForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        try {

            const response = await fetch(
                `${API_URL}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (response.ok) {

                // Save JWT token
                localStorage.setItem(
                    "token",
                    data.token
                );

                message.textContent =
                    "Login successful!";

                message.style.color = "green";


                // Get protected profile
                await getProfile();

            } else {

                message.textContent =
                    data.message || "Login failed.";

                message.style.color = "red";
            }

        } catch (error) {

            message.textContent =
                "Cannot connect to the server.";

            message.style.color = "red";

            console.error(error);
        }

    });


// ==========================================
// GET PROTECTED PROFILE
// ==========================================

async function getProfile() {

    const token =
        localStorage.getItem("token");


    if (!token) {

        showLogin();

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/profile`,
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const data = await response.json();


        if (response.ok) {

            document.getElementById(
                "profileName"
            ).textContent = data.user.name;


            document.getElementById(
                "profileEmail"
            ).textContent = data.user.email;


            document.getElementById(
                "profileMessage"
            ).textContent = data.message;


            document.getElementById(
                "profileMessage"
            ).style.color = "green";


            showProfile();

        } else {

            localStorage.removeItem("token");

            showLogin();
        }

    } catch (error) {

        console.error(error);

        document.getElementById(
            "profileMessage"
        ).textContent =
            "Unable to load profile.";

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("token");

    document.getElementById(
        "loginForm"
    ).reset();

    document.getElementById(
        "loginMessage"
    ).textContent = "";

    showLogin();

}


// ==========================================
// CHECK LOGIN WHEN PAGE LOADS
// ==========================================

window.onload = function() {

    const token =
        localStorage.getItem("token");


    if (token) {

        getProfile();

    } else {

        showRegister();

    }

};