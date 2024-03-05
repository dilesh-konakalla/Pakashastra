import React, { useState, useEffect } from 'react';
import Header from './header';
import Navbar from './Navbar';
import { Container, Box, Button, Typography } from '@mui/material';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
  };

  const containerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <div style={backgroundStyle}>
      <Header />
      <Navbar />
      <div style={{ font: 'Serif', backgroundColor: 'rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Pakashastra
        </Typography>
      </div>

      {/* Display category buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        {categoryOptions.map((category) => (
          <Button
            key={category}
            variant="contained"
            onClick={() => handleCategoryClick(category)}
            style={{ font: 'didot', margin: '5px', backgroundColor: '#ff8409', padding: '10px' }}
          >
            {category || 'All'}
          </Button>
        ))}
      </div>

      {/* Center the Container */}
      <Container style={{ ...containerStyle, margin: '0 auto' }}>
        {/* Display recipe names or full recipe details based on selection */}
        {selectedRecipe ? (
          <Box style={boxStyle}>
            <Typography variant="h4" gutterBottom>
              {selectedRecipe.name}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Ingredients:</strong> {Array.isArray(selectedRecipe.ingredients) ? selectedRecipe.ingredients.join(', ') : 'N/A'}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Procedure:</strong> {Array.isArray(selectedRecipe.procedure) ? selectedRecipe.procedure.join(', ') : 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Category:</strong> {selectedRecipe.category}
            </Typography>
          </Box>
        ) : (
          filteredRecipes.map(renderRecipeName)
        )}
      </Container>
    </div>
  );
};

export default Home;
