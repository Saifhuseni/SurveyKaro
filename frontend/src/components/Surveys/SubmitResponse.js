import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import '../../css/SubmitResponse.css'; // Import your CSS file

const SubmitResponse = () => {
  const { id } = useParams(); // surveyId
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchSurvey = async () => {
    try {
      const response = await API.get(`/surveys/${id}`);
      setSurvey(response.data);
      // Initialize answers
      const initialAnswers = response.data.questions.map((q) => ({
        questionId: q._id,
        answer: q.questionType === 'multiple-choice' ? [] : '',
      }));
      setAnswers(initialAnswers);
    } catch (err) {
      setErrors(['Error fetching survey.']);
    }
  };

  useEffect(() => {
    fetchSurvey();
    // eslint-disable-next-line
  }, [id]);

  const handleChange = (qIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex].answer = value;
    setAnswers(updatedAnswers);
  };

  const handleCheckboxChange = (qIndex, option) => {
    const updatedAnswers = [...answers];
    const currentAnswers = updatedAnswers[qIndex].answer;
    if (currentAnswers.includes(option)) {
      updatedAnswers[qIndex].answer = currentAnswers.filter((a) => a !== option);
    } else {
      updatedAnswers[qIndex].answer = [...currentAnswers, option];
    }
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      await API.post(`/surveys/${id}/response`, { answers });
      setSubmitSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect to the dashboard after submission
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors || [err.response.data.msg]);
      }
    }
  };

  if (!survey) return <p>Loading survey...</p>;

  return (
    <div className="container"> {/* Add the container class for styling */}
      <h2>Submit Response for "{survey.title}"</h2>
      {errors.length > 0 && 
        errors.map((error, index) => (
          <p key={index} style={{ color: 'red' }}>{error.msg || error}</p>
        ))}
      {submitSuccess && <p style={{ color: 'green' }}>Response submitted successfully!</p>}
      <form onSubmit={handleSubmit}>
        {survey.questions.map((q, qIndex) => (
          <div key={qIndex} style={{ marginBottom: '20px' }}>
            <strong>{q.questionText}</strong>
            <br />
            {q.questionType === 'single-choice' && (
              q.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option}
                    checked={answers[qIndex].answer === option}
                    onChange={(e) => handleChange(qIndex, e.target.value)}
                    required
                  />
                  <label>{option}</label>
                </div>
              ))
            )}
            {q.questionType === 'multiple-choice' && (
              q.options.map((option, oIndex) => (
                <div key={oIndex}>
                  <input
                    type="checkbox"
                    name={`question-${qIndex}`}
                    value={option}
                    checked={answers[qIndex].answer.includes(option)}
                    onChange={() => handleCheckboxChange(qIndex, option)}
                  />
                  <label>{option}</label>
                </div>
              ))
            )}
            {q.questionType === 'subjective' && (
              <textarea
                name={`question-${qIndex}`}
                value={answers[qIndex].answer}
                onChange={(e) => handleChange(qIndex, e.target.value)}
                required
              ></textarea>
            )}
            {q.questionType === 'rating-scale' && (
              <input
                type="number"
                min={q.scale?.min || 0} // Default to 0 if q.scale.min is undefined
                max={q.scale?.max || 10} // Default to 10 if q.scale.max is undefined
                value={answers[qIndex].answer}
                onChange={(e) => handleChange(qIndex, e.target.value)}
                required
              />
            )}
            {/* Add more conditions for other question types */}
          </div>
        ))}
        <button type="submit">Submit Response</button>
      </form>
    </div>
  );
};

export default SubmitResponse;
