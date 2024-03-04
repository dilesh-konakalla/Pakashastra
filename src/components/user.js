import React, { useState } from 'react';
import Header from './header';
import Navbar from './Navbar';
import { Container,Box } from '@mui/material';
import '../static/user.css'; // Import the CSS file


const User = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [''], // Use an array to capture multiple ingredients
    procedure: [''],  // Use an array to capture multiple procedure steps
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
  
    // Copy the current state
    const updatedRecipe = { ...recipe };
  
    // If the index is null, update the field directly
    if (index === null) {
      updatedRecipe[field] = value;
    } else {
      // If the index is not null, update the specific field based on the index
      updatedRecipe[field][index] = value;
    }
  
    // Update the state
    setRecipe(updatedRecipe);
  };
  

  const handleAddField = (field) => {
    // Copy the current state
    const updatedRecipe = { ...recipe };

    // Add a new empty string to the specified field array
    updatedRecipe[field].push('');

    // Update the state
    setRecipe(updatedRecipe);
  };

  const handleRemoveField = (index, field) => {
    // Copy the current state
    const updatedRecipe = { ...recipe };

    // Remove the element at the specified index from the field array
    updatedRecipe[field].splice(index, 1);

    // Update the state
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
        ingredients: [''], // Reset ingredients after submission
        procedure: [''],   // Reset procedure after submission
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
  const constyle = {
    color: '#ea4f02',
    padding: '50px',
    paddingLeft: '40px'
  }; 
   const boxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
    borderRadius: '8px',
    height : '50vh',
    width : '70vh',
  };   

  return (
    <div style={backgroundStyle}>
      <Header />
      <Navbar />
        <Container style={constyle}>
        <Box style={boxStyle}><form onSubmit={handleSubmit}>
        <h1>Cook a new recipe...?</h1>
                <label>
                  Name:
                  <input
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={(e) => handleInputChange(e, null, 'name')}
                />

                </label>
                <br />
                <label>
                  Ingredients:
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleInputChange(e, index, 'ingredients')}
                      />
                      <button type="button" onClick={() => handleRemoveField(index, 'ingredients')}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddField('ingredients')}>Add Ingredient</button>
                </label>
                <br />
                <label>
                  Procedure:
                  {recipe.procedure.map((step, index) => (
                    <div key={index}>
                      <textarea
                        value={step}
                        onChange={(e) => handleInputChange(e, index, 'procedure')}
                      />
                      <button type="button" onClick={() => handleRemoveField(index, 'procedure')}>Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddField('procedure')}>Add Step</button>
                </label>
                <br />
                <label>
                  Category:
                  <select
                    name="category"
                    value={recipe.category}
                    onChange={(e) => handleInputChange(e, null, 'category')}
                  >
                    {categoryOptions.sort().map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <br />
                <button type="submit">Submit</button>
              </form></Box>
        </Container>
    </div>
  );
};

export default User;
