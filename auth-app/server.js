const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: "uploads/ktp/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

let users = [];

// REGISTER + KTP
app.post("/register", upload.single("ktp"), (req, res) => {
    const { name, email, password, birthdate } = req.body;

    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();

    if (age < 17) {
        return res.json({ message: "Umur belum 17 tahun!" });
    }

    users.push({
        name,
        email,
        password,
        birthdate,
        ktp: req.file.filename
    });

    res.json({ message: "Akun berhasil didaftarkan & diverifikasi KTP!" });
});

// LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({ message: "Login berhasil!" });
    } else {
        res.json({ message: "Email atau password salah!" });
    }
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
