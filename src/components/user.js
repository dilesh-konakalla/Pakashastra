import React, { useState } from 'react';
import Header from './header';
import Navbar from './Navbar';
import { Container, Box } from '@mui/material';
import '../static/user.css'; // Import the CSS file

const User = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [''],
    procedure: [''],
    category: '',
  });

  const backgroundStyle = {
    backgroundImage: "url('https://i.ibb.co/0QFRX4j/Pakashastrahome.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedRecipe = { ...recipe };

    if (index === null) {
      updatedRecipe[field] = value;
    } else {
      updatedRecipe[field][index] = value;
    }

    setRecipe(updatedRecipe);
  };

  const handleAddField = (field) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe[field].push('');
    setRecipe(updatedRecipe);
  };

  const handleRemoveField = (index, field) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe[field].splice(index, 1);
    setRecipe(updatedRecipe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();
      console.log(data);

      setRecipe({
        name: '',
        ingredients: [''],
        procedure: [''],
        category: '',
      });
    } catch (error) {
      console.error(error);
    }
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

  const bodyStyle = {
    overflow: 'hidden', // Hide the main scrollbar
  };

  const formContainerStyle = {
    color: '#2f4e1b',
    padding: '20px',
    width: '50%',
    margin: 'auto',
    overflowY: 'auto', // Make the form scrollable
    height: '80vh', // Set the maximum height for the form
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  };

  const inputStyle = {
    margin: '5px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px',
    backgroundColor: '#5d9b36',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={backgroundStyle}>
      <Header />
      <Navbar />
      <p></p>
      <Container style={formContainerStyle}>
        <Box style={formStyle}>
          <form onSubmit={handleSubmit}>
            <h1>Cook a new recipe...?</h1>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={recipe.name}
                onChange={(e) => handleInputChange(e, null, 'name')}
                style={inputStyle}
              />
            </label>
            <label>
              Ingredients:
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleInputChange(e, index, 'ingredients')}
                    style={inputStyle}
                  />
                  <button type="button" onClick={() => handleRemoveField(index, 'ingredients')} style={buttonStyle}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddField('ingredients')} style={buttonStyle}>
                Add Ingredient
              </button>
            </label>
            <p></p>
            <label>
              Procedure:
              {recipe.procedure.map((step, index) => (
                <div key={index}>
                  <textarea
                    value={step}
                    onChange={(e) => handleInputChange(e, index, 'procedure')}
                    style={inputStyle}
                  />
                  <button type="button" onClick={() => handleRemoveField(index, 'procedure')} style={buttonStyle}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddField('procedure')} style={buttonStyle}>
                Add Step
              </button>
            </label>
            <p></p>
            <label>
              Category:
              <select
                name="category"
                value={recipe.category}
                onChange={(e) => handleInputChange(e, null, 'category')}
                style={inputStyle}
              >
                {categoryOptions.sort().map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" style={buttonStyle}>
              Submit
            </button>
          </form>
        </Box>
      </Container>
      <style>{`body {${Object.entries(bodyStyle).map(([key, value]) => `${key}: ${value};`).join('')}}`}</style>
    </div>
  );
};

export default User;
