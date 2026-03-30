// CEK UMUR 17+
function isAdult(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age >= 17;
}

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const birthdate = document.getElementById("birthdate").value;

        if (!isAdult(birthdate)) {
            alert("Pendaftaran ditolak! Minimal usia 17 tahun.");
            return;
        }

        const formData = new FormData();
        formData.append("name", document.getElementById("name").value);
        formData.append("email", document.getElementById("email").value);
        formData.append("password", document.getElementById("password").value);
        formData.append("birthdate", birthdate);
        formData.append("ktp", document.getElementById("ktp").files[0]);

        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        alert(data.message);
        window.location.href = "login.html";
    });
}

// LOGIN EMAIL
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        });

        const data = await res.json();
        alert(data.message);
    });
}

// LOGIN GOOGLE
function handleGoogleLogin(response) {
    console.log("Google Token:", response.credential);
    alert("Login Google Berhasil!");
}
