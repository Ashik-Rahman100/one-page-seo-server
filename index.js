// server.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const UserModel = require('./models/Users');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://seo_page:NfPLJijDjoPqUaVR@cluster0.z8svvp5.mongodb.net/seo_page?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri)

// Set up storage options with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Define upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname) ); // Set unique filename
  },
});

// Initialize multer with defined storage
const upload = multer({ storage:storage });

// // Serve static files from the uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route for file uploads
app.post('/upload',upload.single("files"), (req, res) => {
// app.post('/upload', upload.array('files'), (req, res) => {
    console.log(req.file);
    UserModel.create({image:req.file.filename})
    .then(result => res.json(result))
    .catch(err=> console.log(err))

//   try {
//     res.status(200).json({ message: 'Files uploaded successfully!', files: req.files });
//   } catch (error) {
//     res.status(500).json({ error: 'File upload failed' });
//   }
});

// get image data
app.get('/getImages', (req,res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
