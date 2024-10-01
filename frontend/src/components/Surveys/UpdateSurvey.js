import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import '../../css/UpdateSurvey.css'; 

const UpdateSurvey = () => {
  const { id } = useParams(); // Survey ID from the URL
  const navigate = useNavigate();
  const [survey, setSurvey] = useState({ title: '', description: '', questions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch the existing survey details
  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await API.get(`/surveys/${id}`);
        setSurvey(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching survey:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id]);

  // Handle input changes for title and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurvey({ ...survey, [name]: value });
  };

  // Handle changes in questions
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[index][field] = value;
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  // Add a new question
  const addQuestion = () => {
    setSurvey({
      ...survey,
      questions: [
        ...survey.questions,
        { questionType: 'single-choice', questionText: '', options: [''] },
      ],
    });
  };

  // Add a new option to a question
  const addOption = (qIndex) => {
    const updatedQuestions = [...survey.questions];
    updatedQuestions[qIndex].options.push('');
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  // Delete a question
  const deleteQuestion = (qIndex) => {
    const updatedQuestions = survey.questions.filter((_, index) => index !== qIndex);
    setSurvey({ ...survey, questions: updatedQuestions });
  };

  // Handle submission of the updated survey
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/surveys/${id}`, survey);
      alert('Survey updated successfully!');
      navigate(`/surveys/${id}`); // Redirect to the updated survey details page
    } catch (err) {
      console.error('Error updating survey:', err);
      alert('Failed to update the survey. Please try again.');
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

  if (loading) return <p>Loading survey details...</p>;
  if (error) return <p>Error loading survey.</p>;
  if (!survey) return <p>Survey not found.</p>;

  return (
    <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }}>
      <h2>Update Survey</h2>
      <form onSubmit={handleSubmit}>
        {/* Survey Title */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={survey.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        {/* Survey Description */}
        <label>
          Description:
          <textarea
            name="description"
            value={survey.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />

        {/* Survey Questions */}
        <h3>Questions</h3>
        {survey.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-container">
            <label>
              Question Type:
              <select
                value={question.questionType}
                onChange={(e) => handleQuestionChange(qIndex, 'questionType', e.target.value)}
              >
                <option value="single-choice">Single Choice</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="subjective">Subjective</option>
                <option value="rating-scale">Rating Scale</option>
              </select>
            </label>
            <br />

            <label>
              Question Text:
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                required
              />
            </label>
            <br />

            {/* Options for choice-based questions */}
            {(question.questionType === 'single-choice' || question.questionType === 'multiple-choice') && (
              <div className="options-container">
                <h4>Options</h4>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[oIndex] = e.target.value;
                        handleQuestionChange(qIndex, 'options', updatedOptions);
                      }}
                      required
                    />
                  </div>
                ))}
                <button type="button" className="add-question-button" onClick={() => addOption(qIndex)}>
                  Add Option
                </button>
              </div>
            )}

            {/* Delete question button */}
            <button type="button" className="delete-question-button" onClick={() => deleteQuestion(qIndex)}>
              Delete Question
            </button>
          </div>
        ))}

        <button type="button" className="add-question-button" onClick={addQuestion}>
          Add Question
        </button>
        <br /><br />

        {/* Centered Update Survey Button */}
        <div className="submit-button-container">
          <button type="submit">Update Survey</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSurvey;
