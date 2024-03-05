import React, { useState, useEffect } from 'react';
import Header from './header';
import Navbar from './Navbar';
import { Container, Box, Button, Typography, TextField } from '@mui/material';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const backgroundStyle = {
    backgroundImage: "url('https://i.ibb.co/0QFRX4j/Pakashastrahome.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    overflow: 'hidden', // Hide any potential content overflow
  };

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    overflowY: 'auto',
    borderRadius: '8px',
    margin: '20px',
    height: 'calc(65vh - 46px)',
  };

  const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px',
    textAlign: 'left',
    cursor: 'pointer',
  };

  const customScrollbarStyle = `
    ::-webkit-scrollbar {
      width: 0.5em;
    }

    ::-webkit-scrollbar-track {
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent; // Set the thumb color to transparent
    }
  `;

  const categoryOptions = [
    '',
    'Breakfast Recipes',
    'Bread Recipes',
    'Dinner Recipes',
    'Festivals',
    'Healthy Recipes',
    'Kids Recipes',
    'Rice Recipes',
    'Snacks Recipes',
    'Winter Recipes',
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedRecipe(null);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const isInCategory = !selectedCategory || recipe.category === selectedCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    return isInCategory && matchesSearch;
  });

  const renderRecipeName = (recipe) => (
    <Box
      key={recipe.name}
      style={boxStyle}
      onClick={() => handleRecipeClick(recipe)}
    >
      <Typography variant="h5" gutterBottom>
        {recipe.name}
      </Typography>
    </Box>
  );

  const renderFullRecipe = () => (
    <Box style={boxStyle}>
      <Typography variant="h4" gutterBottom>
        {selectedRecipe.name}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Ingredients:</strong>
        <ul>
          {Array.isArray(selectedRecipe.ingredients) ? (
            selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <li>N/A</li>
          )}
        </ul>
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Procedure:</strong>
        <ol>
          {Array.isArray(selectedRecipe.procedure) ? (
            selectedRecipe.procedure.map((step, index) => (
              <li key={index}>{step}</li>
            ))
          ) : (
            <li>N/A</li>
          )}
        </ol>
      </Typography>
      <Typography variant="body2">
        <strong>Category:</strong> {selectedRecipe.category}
      </Typography>
    </Box>
  );

  return (
    <div style={backgroundStyle}>
      <Header />
      <p></p>
      <Navbar />
      <p></p>

      {/* Display category buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        {categoryOptions.map((category) => (
          <Button
            key={category}
            variant="contained"
            onClick={() => handleCategoryClick(category)}
            style={{ font: 'didot', margin: '10px', backgroundColor: 'rgb(1, 127, 42)', padding: '10px' }}
          >
            {category || 'All'}
          </Button>
        ))}
        <TextField
          label="Search Recipes"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '10%', margin: '10px', Color: "#b1d176" }}
        />
      </div>

      {/* Center the Container */}
      <Container style={{ ...containerStyle, margin: '0 auto' }}>
        {/* Display recipe names or full recipe details based on selection */}
        {selectedRecipe ? renderFullRecipe() : filteredRecipes.map(renderRecipeName)}
      </Container>

      {/* Custom CSS for hiding scrollbar */}
      <style>{customScrollbarStyle}</style>
    </div>
  );
};

export default Home;
