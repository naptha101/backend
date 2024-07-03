const express = require('express');
const router = require('./routes/routes');
const app = express();
const cors=require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const user = require('./model/user');
const fs=require('fs');
mongoose.connect('mongodb+srv://yash:yash123@cluster0.akum3ts.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });

// Define the upload directory path
const uploadPath = path.join(__dirname, 'uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}
app.use(cors());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/images', upload.single('file'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new user({ name, email, Image: [req.file.filename] });
    await newUser.save();

    return res.status(200).json({ message: "File uploaded successfully", file: req.file });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.post('/images-multiple', upload.array('files'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const files=req.files.map(file => file.filename);
    const newUser = new user({ name, email, Image: files });
    await newUser.save();


    return res.status(200).json({ message: "Files uploaded successfully", files: req.files });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
