
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ['single-choice', 'multiple-choice', 'subjective', 'rating-scale', 'agreement-scale'],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [String], // For choice questions
  scale: {
    min: Number,
    max: Number,
  }, // For rating scales
});

const ResponseSchema = new mongoose.Schema({
  respondentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      answer: mongoose.Schema.Types.Mixed, // Can be String, Number, Array based on question type
    },
  ],
}, { timestamps: true });

const SurveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  questions: [QuestionSchema],
  responses: [ResponseSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Survey', SurveySchema);
