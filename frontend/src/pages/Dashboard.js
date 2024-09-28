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
    <div>
      <h2>Dashboard</h2>
      
      {/* Existing links */}
      <Link to="/create-survey">Create New Survey</Link>
      <br />
      <Link to="/surveys">View Your Surveys</Link>
      <br /><br />

      {/* Respond to Survey Link */}
      <button onClick={() => setShowSurveyInput(!showSurveyInput)}>
        Respond to a Survey
      </button>
<br/><br/>
      {/* Conditionally render the input for surveyId */}
      {showSurveyInput && (
        <div>
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
