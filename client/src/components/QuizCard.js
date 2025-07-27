// src/components/QuizCard.js
import React, { useState } from 'react';
import '../styles/quiz.css';

const QuizCard = ({ questions, onRetake, goBack }) => {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState(null);

  const q = questions[i];
  if (!q) return null;

  const pick = (opt) => {
    setPicked(opt);
    if (opt === q.answer) setScore(score + 1);

    setTimeout(() => {
      setPicked(null);
      if (i + 1 < questions.length) setI(i + 1);
      else setDone(true);
    }, 600);
  };

  return (
    <div className="quiz-card">
      {done ? (
        <>
          <h2>🎯 You scored {score}/{questions.length}</h2>
          <div className="btn-group">
            <button className="gradient-btn" onClick={onRetake}>Retake Quiz</button>
            <button className="gradient-btn" onClick={goBack}>Back</button>
          </div>
        </>
      ) : (
        <>
          <h3>Q{i + 1}: {q.question}</h3>
          <div className="options">
            {q.options.map((o, idx) => (
              <button
                key={idx}
                className={`opt-btn ${picked === o ? (o === q.answer ? "correct" : "wrong") : ""}`}
                onClick={() => !picked && pick(o)}
                disabled={!!picked}
              >
                {o}
              </button>
            ))}
          </div>
          <button className="gradient-btn back-btn" onClick={goBack}>Back</button>
        </>
      )}
    </div>
  );
};

export default QuizCard;
