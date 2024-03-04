import React from 'react';
import Header from './header';
import Navbar from './Navbar';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: "url('https://i.ibb.co/0QFRX4j/Pakashastrahome.png')", // Adjust the path based on your project structure
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Adjust the height as needed
  };

  return (
    <div style={backgroundStyle}>
      <Header />
      <Navbar />
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
        {/* Content with a semi-transparent white background */}
        <h1>Welcome to Pakashastra</h1>
        <p>
          {/* Add some content here */}
        </p>
      </div>
    </div>
  );
};

export default Home;
