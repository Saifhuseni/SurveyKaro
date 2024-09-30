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
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{survey.title} [ {id} ]</h2>
      <p style={{ fontStyle: 'italic', color: '#666' }}>{survey.description}</p>
      
      <h3 style={{ color: '#007BFF' }}>Questions</h3>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {survey.questions.map((q, index) => (
          <li key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', backgroundColor: '#fff' }}>
            <strong>{q.questionText}</strong>
            
            {q.questionType === 'single-choice' && (
              <ul style={{ paddingLeft: '20px' }}>
                {q.options.map((option, oIndex) => (
                  <li key={oIndex}>{option}</li>
                ))}
              </ul>
            )}

            {q.questionType === 'multiple-choice' && (
              <ul style={{ paddingLeft: '20px' }}>
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
      <Link to={`/surveys/${id}/results`} style={{ textDecoration: 'none' }}>
        <button style={{ backgroundColor: '#007BFF', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          View Results
        </button>
      </Link>

      <br/>

      {/* Add Update Survey Button */}
      <Link to={`/surveys/${id}/update`} style={{ textDecoration: 'none' }}>
        <button style={{ marginTop: '10px', backgroundColor: '#28A745', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          Update Survey
        </button>
      </Link>
      
      <br />

      {/* Delete Survey Button */}
      <button onClick={handleDelete} style={{ color: 'white', marginTop: '10px', backgroundColor: 'red', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>
        Delete Survey
      </button>
    </div>
  );
};

export default SurveyDetails;
