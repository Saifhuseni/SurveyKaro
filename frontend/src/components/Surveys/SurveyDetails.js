import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';

const SurveyDetails = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Fetch the survey details from the API
  const fetchSurvey = useCallback(async () => {
    try {
      const response = await API.get(`/surveys/${id}`);
      setSurvey(response.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [id]);

  // Load survey details when the component is mounted
  useEffect(() => {
    fetchSurvey();
  }, [fetchSurvey]);

  // Handle survey deletion
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this survey?");
    if (confirmed) {
      try {
        await API.delete(`/surveys/${id}`);
        alert('Survey deleted successfully!');
        navigate('/surveys'); // Redirect to surveys list after deletion
      } catch (error) {
        console.error("Failed to delete survey:", error);
        alert('Error deleting the survey. Please try again.');
      }
    }
  };

  if (loading) return <p>Loading survey details...</p>;
  if (error) return <p>Error loading survey.</p>;
  if (!survey) return <p>Survey not found.</p>;

  return (
    <div>
      <h2>{survey.title} [ {id} ]</h2>
      <p>{survey.description}</p>
      
      <h3>Questions</h3>
      <ul>
        {survey.questions.map((q, index) => (
          <li key={index}>
            <strong>{q.questionText}</strong>
            
            {q.questionType === 'single-choice' && (
              <ul>
                {q.options.map((option, oIndex) => (
                  <li key={oIndex}>{option}</li>
                ))}
              </ul>
            )}

            {q.questionType === 'multiple-choice' && (
              <ul>
                {q.options.map((option, oIndex) => (
                  <li key={oIndex}>{option}</li>
                ))}
              </ul>
            )}

            {q.questionType === 'rating-scale' && (
              <p>Rating Scale: {q.scale?.min || 0} to {q.scale?.max || 10}</p> 
            )}
          </li>
        ))}
      </ul>
      
      <br />

      {/* View Results Link */}
      <Link to={`/surveys/${id}/results`}>View Results</Link>

      <br/>

      {/* Add Update Survey Button */}
      <Link to={`/surveys/${id}/update`}>
        <button style={{ marginTop: '10px' }}>
          Update Survey
        </button>
      </Link>
      
      <br />

      {/* Delete Survey Button */}
      <button onClick={handleDelete} style={{ color: 'red', marginTop: '10px' }}>
        Delete Survey
      </button>

    </div>
  );
};

export default SurveyDetails;
