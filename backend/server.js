// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const Profile = require('./models/Profile');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST - Create new profile
app.post('/api/profiles', upload.single('photo'), async (req, res) => {
  try {
    const newProfile = new Profile({
      name: req.body.name,
      dob: req.body.dob,
      caste: req.body.caste,
      place: req.body.place,
      contact: req.body.contact,
      photo: req.file ? `/uploads/${req.file.filename}` : ''
    });

    await newProfile.save();
    res.status(200).json({ message: 'Profile submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving profile' });
  }
});

// GET - Fetch all profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching profiles' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend working');
});

app.get('/delete-profile', (req, res) => {
  res.sendFile(__dirname + '/admin-delete.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//POST- deletes profiles
app.post('/delete-profile', async (req, res) => {
  try {
    const { name, dob } = req.body;
    const deleted = await Profile.findOneAndDelete({ name, dob });
    if (deleted) {
      res.json({ message: 'Profile deleted successfully' });
    } else {
      res.json({ message: 'No matching profile found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting profile' });
  }
});
