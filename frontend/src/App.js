import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import CreateSurvey from './components/Surveys/CreateSurvey';
import SurveyList from './components/Surveys/SurveyList';
import SurveyDetails from './components/Surveys/SurveyDetails';
import SubmitResponse from './components/Surveys/SubmitResponse';
import SurveyResults from './components/Surveys/SurveyResults';
import PrivateRoute from './components/PrivateRoute';
import UpdateSurvey from './components/Surveys/UpdateSurvey'; 
import './css/styles.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> {/* Should always be accessible */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-survey"
          element={
            <PrivateRoute>
              <CreateSurvey />
            </PrivateRoute>
          }
        />
        <Route
          path="/surveys"
          element={
            <PrivateRoute>
              <SurveyList />
            </PrivateRoute>
          }
        />
        <Route
          path="/surveys/:id"
          element={
            <PrivateRoute>
              <SurveyDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/surveys/:id/submit"
          element={
            <PrivateRoute>
              <SubmitResponse />
            </PrivateRoute>
          }
        />
        <Route
          path="/surveys/:id/results"
          element={
            <PrivateRoute>
              <SurveyResults />
            </PrivateRoute>
          }
        />
        <Route
          path="/surveys/:id/update"
          element={
            <PrivateRoute>
              <UpdateSurvey />
            </PrivateRoute>
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
