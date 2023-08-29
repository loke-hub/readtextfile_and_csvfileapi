// read the text file in the postman choose body and select form data in the key =choose files and value 
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.memoryStorage(); // Store the uploaded file in memory
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('loketextdata'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileContent = req.file.buffer.toString(); // Convert the file buffer to string

  console.log('File contents:', fileContent);
  const jsonData = req.body.email; // Assuming you've used "json" as the key
  console.log('JSON data:', jsonData);
  res.status(200).json({ message: 'File contents received.' });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//read the csv file in the postman choose body and select form data in the key =choose files and value 
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

// const app = express();
// const port = 3000;

app.get('/readcsv', (req, res) => {
  const results = [];

  fs.createReadStream('data.csv')  // Replace with your CSV file's path
    .pipe(csv())
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      console.log("data",results)
      res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





