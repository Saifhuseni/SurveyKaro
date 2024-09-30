import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import '../../css/SurveyList.css'; // Import your CSS file

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
