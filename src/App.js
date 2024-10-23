import React, { useState } from 'react';
import questionsData from '/Users/shivakhanduri/quiz-app/src/questions_output.json';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);  // Set the selected answer
  };

  const handleSubmitAnswer = () => {
    setShowCorrectAnswer(true);

    // Remove the option prefix (e.g., 'A.', 'B.', etc.) for comparison
    const cleanedSelectedAnswer = selectedAnswer.replace(/^([A-D]\.\s)/, '');
    const correctAnswer = questionsData[currentQuestion].correctAnswer;

    if (cleanedSelectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);
    setSelectedAnswer('');

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizOver(true);
    }
  };

  return (
    <div className="app-container">
      <h1>NPTEL PSY of learninng</h1>
      {!isQuizOver && (
        <div className="quiz-question">
          <h2>{questionsData[currentQuestion].question}</h2>
          <ul>
            {questionsData[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
              >
                {option}
              </li>
            ))}
          </ul>

          {/* Button to submit the selected answer */}
          <button onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
            Submit Answer
          </button>

          {showCorrectAnswer && (
            <div className="feedback">
              {selectedAnswer.replace(/^([A-D]\.\s)/, '') === questionsData[currentQuestion].correctAnswer ? (
                <p className="correct">Correct!</p>
              ) : (
                <p className="incorrect">
                  Incorrect! The correct answer is: {questionsData[currentQuestion].correctAnswer}
                </p>
              )}
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      )}

      {isQuizOver && (
        <div>
          <h2>Quiz Over!</h2>
          <p>Your score: {score}/{questionsData.length}</p>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        Made by Shiva with ❤️
      </footer>
    </div>
  );
};

export default App;
