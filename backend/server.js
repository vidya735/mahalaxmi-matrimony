const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

// In-memory "database"
let profiles = [];

app.get('/', (req, res) => {
  res.send('Backend working');
});

// Upload endpoint
app.post('/upload', upload.single('photo'), (req, res) => {
  try {
    const data = req.body;
    const photoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const profile = { ...data, photo: photoUrl, id: Date.now() };
    profiles.push(profile);
    res.status(200).json({ message: 'Profile uploaded', profile });
  } catch (err) {
    res.status(500).json({ error: 'Error occurred while uploading' });
  }
});

// Get all profiles
app.get('/profiles', (req, res) => {
  res.json(profiles);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
