const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const projectData = {};

// GET route to retrieve data from projectData
app.get('/weather', (req, res) => {
  res.json(projectData);
});

// POST route to add data to projectData
app.post('/weather', (req, res) => {
  const { temperature, date, userResponse } = req.body;

  // Add data to projectData
  projectData.temperature = temperature;
  projectData.date = date;
  projectData.userResponse = userResponse;

  res.status(201).json({ message: 'Data added successfully.' });
});

// Serve index.html when browsing http://localhost:3000/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
