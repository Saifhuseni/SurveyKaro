const express = require('express');
const router = express.Router();
const {
  createSurvey,
  getSurveys,
  getSurvey,
  updateSurvey,
  deleteSurvey,
  submitResponse,
  getSurveyResults,
} = require('../controllers/surveyController');
const authMiddleware = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');


//POST /api/surveys
router.post(
  '/',
  authMiddleware,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('questions', 'At least one question is required').isArray({ min: 1 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    createSurvey(req, res);
  }
);

// GET /api/surveys
router.get('/', authMiddleware, getSurveys);


//GET /api/surveys/:surveyId
router.get('/:surveyId', authMiddleware, getSurvey);


// PUT /api/surveys/:surveyId
router.put(
  '/:surveyId',
  authMiddleware,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('questions', 'At least one question is required').isArray({ min: 1 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    updateSurvey(req, res);
  }
);


//DELETE /api/surveys/:surveyId
router.delete('/:surveyId', authMiddleware, deleteSurvey);

//    POST /api/surveys/:surveyId/response
router.post(
  '/:surveyId/response',
  authMiddleware,
  [
    check('answers', 'Answers are required').isArray({ min: 1 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    submitResponse(req, res); 
  }
);

// GET /api/surveys/:surveyId/results
router.get('/:surveyId/results', authMiddleware, getSurveyResults);




module.exports = router;
