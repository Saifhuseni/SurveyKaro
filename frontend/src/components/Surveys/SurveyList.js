import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import '../../css/SurveyList.css'; 

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSurveys = async () => {
    try {
      const response = await API.get('/surveys');
      setSurveys(response.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();

    // Set the background image on component mount
    document.body.style.backgroundImage = 'url("https://img.freepik.com/premium-vector/blue-white-abstract-background-design-well-use-as-wallpaper-website-template-background_756251-43.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';

    // Clean up the effect when the component is unmounted
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.height = '';
    };
  }, []);

  if (loading) return <p>Loading surveys...</p>;
  if (error) return <p>Error loading surveys.</p>;

  return (
    <div className="container"> {/* Add the container class for styling */}
      <h2>Your Surveys</h2>
      {surveys.length === 0 ? (
        <p>No surveys created yet.</p>
      ) : (
        <ul>
          {surveys.map((survey) => (
            <li key={survey._id}>
              <Link to={`/surveys/${survey._id}`}>{survey.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyList;
