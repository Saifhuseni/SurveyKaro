import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

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

  return (
    <div>
      <h2>Create Survey</h2>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} style={{ color: 'red' }}>{error.msg || error}</p>
        ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Survey Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Survey Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br />
        <h3>Questions</h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <label>Question Type:</label>
            <select
              value={q.questionType}
              onChange={(e) => handleQuestionChange(qIndex, 'questionType', e.target.value)}
            >
              <option value="single-choice">Single Choice</option>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="subjective">Subjective</option>
              <option value="rating-scale">Rating Scale</option>
            </select>
            <br />
            <input
              type="text"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
              required
            />
            <br />
            {(q.questionType === 'single-choice' || q.questionType === 'multiple-choice') && (
              <div>
                <h4>Options</h4>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <input
                      type="text"
                      placeholder={`Option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
              </div>
            )}
            <button type="button" onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <br />
        <button type="submit">Create Survey</button>
      </form>
    </div>
  );
};

export default CreateSurvey;
