import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

const SurveyResults = () => {
  const { id } = useParams(); // surveyId
  const { user, isAuthenticated } = useContext(AuthContext);
  const [responses, setResponses] = useState([]);
  const [survey, setSurvey] = useState(null);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const calculateSummary = (responses, questions) => {
    const summary = {};

    // Initialize summary object with question details
    questions.forEach((question) => {
      if (question.questionType === 'single-choice' || question.questionType === 'multiple-choice') {
        summary[question._id] = {
          questionText: question.questionText,
          type: question.questionType,
          options: question.options.map((option) => ({ text: option, count: 0, percentage: 0 })),
        };
      } else if (question.questionType === 'rating-scale') {
        summary[question._id] = {
          questionText: question.questionText,
          type: question.questionType,
          totalRating: 0,
          count: 0,
          averageRating: 0,
        };
      }
    });

    // Calculate summary
    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        const questionSummary = summary[answer.questionId];
        if (questionSummary) {
          if (questionSummary.type === 'single-choice') {
            const selectedOptionIndex = questionSummary.options.findIndex(
              (option) => option.text === answer.answer
            );
            if (selectedOptionIndex !== -1) {
              questionSummary.options[selectedOptionIndex].count += 1;
            }
          } else if (questionSummary.type === 'multiple-choice') {
            answer.answer.forEach((selectedOption) => {
              const selectedOptionIndex = questionSummary.options.findIndex(
                (option) => option.text === selectedOption
              );
              if (selectedOptionIndex !== -1) {
                questionSummary.options[selectedOptionIndex].count += 1;
              }
            });
          } else if (questionSummary.type === 'rating-scale') {
            questionSummary.totalRating += parseFloat(answer.answer); // Ensure it's treated as a number
            questionSummary.count += 1;
          }
        }
      });
    });

    // Calculate percentages for single-choice/multiple-choice and average for rating-scale
    Object.values(summary).forEach((questionSummary) => {
      if (questionSummary.type === 'single-choice' || questionSummary.type === 'multiple-choice') {
        const totalResponses = responses.length;
        questionSummary.options.forEach((option) => {
          option.percentage = totalResponses > 0 ? (option.count / totalResponses) * 100 : 0;
        });
      } else if (questionSummary.type === 'rating-scale') {
        questionSummary.averageRating =
          questionSummary.count > 0 ? (questionSummary.totalRating / questionSummary.count).toFixed(2) : 0;
      }
    });

    setSummary(summary);
  };

  const fetchResults = async () => {
    try {
      const surveyResponse = await API.get(`/surveys/${id}/results`);
      setResponses(surveyResponse.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const fetchSurvey = async () => {
    try {
      const response = await API.get(`/surveys/${id}`);
      setSurvey(response.data);
    } catch (err) {
      console.error('Error fetching survey:', err);
    }
  };

  useEffect(() => {
    fetchSurvey();
    fetchResults();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (survey && responses.length > 0) {
      calculateSummary(responses, survey.questions);
    }
    // eslint-disable-next-line
  }, [survey, responses]);

  if (loading) return <p>Loading survey results...</p>;
  if (error) return <p>Error loading survey results.</p>;

  return (
    <div>
      <h2>Results for "{survey?.title}"</h2>
      
      {/* Summary Section - only show if there are responses */}
      {responses.length > 0 && (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h2>Summary of Responses</h2>
          
          <h4>Responses Recieved: {responses.length}</h4>
          {Object.values(summary).map((question, index) => (
            <div key={index} >
              <p><strong>{question.questionText}</strong></p>
              {question.type === 'single-choice' || question.type === 'multiple-choice' ? (
                <ul>
                  {question.options.map((option, oIndex) => (
                    <li key={oIndex}>
                      {option.text}: {option.count} response(s) ({option.percentage.toFixed(2)}%)
                    </li>
                  ))}
                </ul>
              ) : question.type === 'rating-scale' ? (
                <p>Average Rating: {question.averageRating} (from {question.count} response(s))</p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Detailed Individual Responses */}
      <h3>Individual Responses</h3>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        responses.map((response, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Respondent:</strong> {response.respondent ? response.respondent.username : 'Anonymous'}</p>
            <ul>
              {response.answers.map((ans, aIndex) => (
                <li key={aIndex}>
                  <strong>Question:</strong> {survey.questions.find(q => q._id === ans.questionId)?.questionText}
                  <br />
                  <strong>Answer:</strong> {Array.isArray(ans.answer) ? ans.answer.join(', ') : ans.answer}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default SurveyResults;
