import StartScreen from "./components/StartScreen";
import FeedbackScreen from "./components/FeebackScreen";
import EndScreen from "./components/EndScreen";
import PlayingScreen from "./components/PlayingScreen";
import { useQuiz } from "./hooks/useQuiz";

const App: React.FC = () => {
  const {
    startGame,
    handleAnswer,
    nextQuestion,
    resetGame,
    questions,
    isLoading,
    leaderboard,
    currentQuestionIndex,
    gameState,
    selectedAnswer,
    score,
    timeLeft,
    playerName,
    setPlayerName,
  } = useQuiz();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading questions...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4 relative">
        <div className="bg-white rounded-lg p-8 max-w-md text-center z-10">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>

          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {gameState === "start" && (
          <StartScreen
            playerName={playerName}
            setPlayerName={setPlayerName}
            onStart={startGame}
            leaderboard={leaderboard}
          />
        )}

        {gameState === "playing" && currentQuestion && (
          <PlayingScreen
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            score={score}
            timeLeft={timeLeft}
            onAnswerSelect={handleAnswer}
          />
        )}

        {gameState === "feedback" && currentQuestion && (
          <FeedbackScreen
            selectedAnswer={selectedAnswer}
            correctAnswerIndex={currentQuestion.correctAnswer}
            options={currentQuestion.options}
            timeLeft={timeLeft}
            onNext={nextQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        )}

        {gameState === "end" && (
          <EndScreen
            playerName={playerName}
            score={score}
            leaderboard={leaderboard}
            onPlayAgain={resetGame}
          />
        )}
      </div>
    </div>
  );
};

export default App;
