import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import '../../css/CreateSurvey.css';

const CreateSurvey = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([
    { questionType: 'single-choice', questionText: '', options: [''] },
  ]);
  const [errors, setErrors] = useState([]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionType: 'single-choice', questionText: '', options: [''] },
    ]);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push('');
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (qIndex) => {
    const updatedQuestions = questions.filter((_, index) => index !== qIndex);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const surveyData = { title, description, questions };
      await API.post('/surveys', surveyData);
      alert('Survey created successfully!');
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors || [err.response.data.msg]);
      }
    }
  };

  // Set the background image on component mount
  useEffect(() => {
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

  return (
    <div className="create-survey-container">
      <h2>Create Survey</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <p key={index} className="error">{error.msg || error}</p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="survey-title"
          placeholder="Survey Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="survey-description"
          placeholder="Survey Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <h3>Questions</h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-container">
            <label>Question Type:</label>
            <select
              className="question-type"
              value={q.questionType}
              onChange={(e) => handleQuestionChange(qIndex, 'questionType', e.target.value)}
            >
              <option value="single-choice">Single Choice</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="subjective">Subjective</option>
              <option value="rating-scale">Rating Scale</option>
            </select>
            <input
              type="text"
              className="question-text"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
              required
            />
            {(q.questionType === 'single-choice' || q.questionType === 'multiple-choice') && (
              <div className="options-container">
                <h4>Options</h4>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <input
                      type="text"
                      className="option-input"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                    />
                  </div>
                ))}
                <button type="button" className="add-option-button" onClick={() => addOption(qIndex)}>Add Option</button>
              </div>
            )}
            <button type="button" className="delete-question-button" onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
          </div>
        ))}
        <button type="button" className="add-question-button" onClick={addQuestion}>Add Question</button>
        <div className="submit-button-container">
          <button type="submit" className="submit-button">Create Survey</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;
