import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showSurveyInput, setShowSurveyInput] = useState(false); // To toggle input visibility
  const [surveyId, setSurveyId] = useState(''); // To store the input value for surveyId
  const navigate = useNavigate();

  const handleSurveyResponse = () => {
    if (surveyId.trim()) {
      navigate(`/surveys/${surveyId}/submit`);
    } else {
      alert('Please enter a valid Survey ID.');
    }
  };

  return (
    <div className="dashboard-container"> {/* Add class name here */}
      <h2>Dashboard</h2>
      
      {/* Existing links */}
      <Link to="/create-survey">Create New Survey</Link>
      <Link to="/surveys">View Your Surveys</Link>

      {/* Respond to Survey Link */}
      <button onClick={() => setShowSurveyInput(!showSurveyInput)}>
        Respond to a Survey
      </button>

      {/* Conditionally render the input for surveyId */}
      {showSurveyInput && (
        <div className="survey-input-container"> {/* Add class name for styling */}
          <input
            type="text"
            placeholder="Enter Survey ID"
            value={surveyId}
            onChange={(e) => setSurveyId(e.target.value)}
          />
          <button onClick={handleSurveyResponse}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
