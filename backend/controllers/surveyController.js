const Survey = require('../models/Survey');

// Create a new survey
exports.createSurvey = async (req, res) => {
  const { title, description, questions } = req.body;

  try {
    const survey = new Survey({
      title,
      description,
      questions,
      createdBy: req.user.userId,
    });

    await survey.save();
    res.status(201).json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all surveys created by user
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ createdBy: req.user.userId });
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a specific survey by ID
exports.getSurvey = async (req, res) => {
  const { surveyId } = req.params;

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) return res.status(404).json({ msg: 'Survey not found' });

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a specific survey by ID
exports.updateSurvey = async (req, res) => {
  const { surveyId } = req.params;
  const { title, description, questions } = req.body;

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) return res.status(404).json({ msg: 'Survey not found' });

    if (survey.createdBy.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    survey.title = title || survey.title;
    survey.description = description || survey.description;
    survey.questions = questions || survey.questions;

    await survey.save();
    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a specific survey by ID
exports.deleteSurvey = async (req, res) => {
  const { surveyId } = req.params;

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) return res.status(404).json({ msg: 'Survey not found' });

    if (survey.createdBy.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await survey.deleteOne();
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Submit survey response
exports.submitResponse = async (req, res) => {
  const { surveyId } = req.params;
  const { answers } = req.body;

  try {
    const survey = await Survey.findById(surveyId);
    if (!survey) return res.status(404).json({ msg: 'Survey not found' });

    // Create a new survey response
    const surveyResponse = new SurveyResponse({
      surveyId: surveyId,
      respondent: req.user.userId,
      answers,
    });

    await surveyResponse.save();
    res.json({ msg: 'Response submitted successfully', surveyResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const SurveyResponse = require('../models/SurveyResponse');


// Get survey results (only for the creator)
exports.getSurveyResults = async (req, res) => {
  const { surveyId } = req.params;

  try {
    // Find the survey by ID
    const survey = await Survey.findById(surveyId).populate('responses.respondentId', 'username email');
    
    // Check if the survey exists
    if (!survey) return res.status(404).json({ msg: 'Survey not found' });

    // Check if the current user is the creator of the survey
    if (survey.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ msg: 'Access denied. You are not the creator of this survey.' });
    }

    // If the user is the creator, return the survey results
    
    const surveyResponses = await SurveyResponse.find({ surveyId }).populate('respondent', 'username email');

    res.json(surveyResponses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
