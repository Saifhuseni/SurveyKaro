import React from 'react';
import { Link } from 'react-router-dom';
import { FaPoll, FaEdit, FaChartLine } from 'react-icons/fa';  // Importing icons from react-icons

const Home = () => {
  const styles = {
    container: {
      textAlign: 'center',
      padding: '50px',
      backgroundImage: 'url(https://img.freepik.com/premium-vector/blue-white-abstract-background-design-well-use-as-wallpaper-website-template-background_756251-43.jpg)', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      color: '#000000',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adding overlay to make text more readable
      zIndex: 1,
    },
    content: {
      position: 'relative',
      zIndex: 2,
    },
    header: {
      fontSize: '3rem',
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#000000',
      animation: 'fadeIn 2s', // Adding fade-in animation
    },
    description: {
      fontSize: '1.5rem',
      marginBottom: '30px',
      fontWeight: '300',
      letterSpacing: '1px',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px',
    },
    button: {
      padding: '15px 30px',
      fontSize: '1.2rem',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    imageSection: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '50px',
      gap: '20px',
    },
    featureImage: {
      width: '200px',
      height: '200px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease', // Hover effect
    },
    featureImageHover: {
      transform: 'scale(1.05)', // Scale up on hover
    },
    callToAction: {
      marginTop: '50px',
      padding: '30px',
      backgroundColor: '#e4e4e4',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    scrollIcon: {
      fontSize: '2rem',
      color: '#007BFF',
      marginTop: '30px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.header}>Welcome to SurveyKaro.com</h1>
        <p style={styles.description}>
          Create and manage your surveys easily. Start now by creating a survey or exploring others.
        </p>

        <div style={styles.buttons}>
          <Link to="/create-survey" style={styles.button}>
            <FaEdit /> Create Survey
          </Link>
          <Link to="/dashboard" style={styles.button}>
            <FaChartLine /> My Dashboard
          </Link>
          <Link to="/surveys" style={styles.button}>
            <FaPoll /> Explore Surveys
          </Link>
          
          
        </div>

        <div style={styles.imageSection}>
          <img
            src="https://saifhuseni.github.io/portfolio/assets/survey.jpg" 
            alt="Create Surveys"
            style={{ ...styles.featureImage }}
          />
          <img
            src="https://www.shutterstock.com/image-illustration/concept-financial-planning-people-scene-600nw-2254779371.jpg" 
            alt="Manage Surveys"
            style={{ ...styles.featureImage }}
          />
          <img
            src="https://th.bing.com/th/id/OIP.Jc2NRSN6NU3u5wpMIiZK9QHaE7?w=2000&h=1333&rs=1&pid=ImgDetMain"
            alt="Analyze Results"
            style={{ ...styles.featureImage }}
          />
        </div>

       
        <div style={styles.callToAction}>
          <h2 style={styles.header}>Why Choose SurveyKaro?</h2>
          <p style={styles.description}>
            At SurveyKaro, we simplify survey creation and management with a user-friendly interface and insightful analytics. Whether you need to gather feedback, conduct research, or analyze responses, we have you covered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
