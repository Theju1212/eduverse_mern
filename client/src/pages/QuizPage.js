import React, { useState, useEffect } from 'react';
import QuizCard from '../components/QuizCard';
import quizData from '../data/quizData';
import '../styles/quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseTitle = location.state?.courseTitle;

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!courseTitle || !quizData[courseTitle]) {
      alert("You must access quiz through your enrolled course.");
      navigate('/dashboard');
    } else {
      setStart(true);
    }
  }, [courseTitle, navigate]);

  const handleGoBack = () => {
    setStart(false);
    navigate('/dashboard');
  };

  return (
    <div>
      {start ? (
        <QuizCard
          questions={quizData[courseTitle]}
          onRetake={() => setStart(true)}
          goBack={handleGoBack}
        />
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default QuizPage;
