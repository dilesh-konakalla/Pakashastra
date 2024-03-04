const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const recipesFilePath = path.join(__dirname, '..', 'src', 'components', 'recipes.json');

app.get('/api/recipes', async (req, res) => {
    try {
      const data = await fs.readFile(recipesFilePath, 'utf-8');
  
      // Check if the file is empty or not properly formatted
      if (!data.trim()) {
        return res.json([]); // Return an empty array or handle it as appropriate
      }
  
      let parsedData;
      try {
        parsedData = JSON.parse(data);
      } catch (parseError) {
        console.error(parseError);
        return res.status(500).send('Error parsing JSON data');
      }
  
      res.json(parsedData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
app.post('/api/recipes', async (req, res) => {
  try {
    const existingData = await fs.readFile(recipesFilePath, 'utf-8');
    const newData = JSON.parse(existingData);
    newData.push(req.body);

    await fs.writeFile(recipesFilePath, JSON.stringify(newData, null, 2));
    res.json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
