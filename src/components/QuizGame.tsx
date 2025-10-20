// src/components/QuizGame.tsx
import { useEffect, useState } from "react";
import type { LeaderboardEntry, Question } from "../types/quiz.types";
import { loadQuestions } from "../utils/questionLoader";
import StartScreen from "./StartScreen";
import FeedbackScreen from "./FeebackScreen";
import EndScreen from "./EndScreen";
import PlayingScreen from "./PlayingScreen";

const QuizGame: React.FC = () => {
  const [gameState, setGameState] = useState<
    "start" | "playing" | "feedback" | "end"
  >("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    await loadQuestionsAndLeaderboard();
  };

  const loadQuestionsAndLeaderboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await loadQuestions();
      setQuestions(fetchedQuestions);
    } catch (err) {
      console.log(err);
      setError("Failed to load questions. Please try again.");
      setQuestions([]); // or fallback if needed
    } finally {
      setIsLoading(false);
    }

    loadLeaderboard();
  };

  const loadLeaderboard = () => {
    const saved = localStorage.getItem("quizLeaderboard");
    if (saved) {
      try {
        setLeaderboard(JSON.parse(saved));
      } catch {
        setLeaderboard([]);
      }
    }
  };

  const saveToLeaderboard = (name: string, finalScore: number) => {
    const newEntry: LeaderboardEntry = {
      name: name || "Anonymous",
      score: finalScore,
      date: new Date().toISOString(),
    };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem("quizLeaderboard", JSON.stringify(updated));
  };

  // Timer logic
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleAnswer(null);
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    if (!playerName.trim()) {
      alert("Please enter your name!");
      return;
    }
    setGameState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answerIndex: number | null) => {
    setSelectedAnswer(answerIndex);
    const currentQuestion = questions[currentQuestionIndex];

    if (answerIndex !== null && answerIndex === currentQuestion.correctAnswer) {
      const timeBonus = Math.floor(timeLeft / 3);
      setScore((prev) => prev + 10 + timeBonus);
    }

    setGameState("feedback");
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setGameState("playing");
    } else {
      saveToLeaderboard(playerName, score);
      setGameState("end");
    }
  };

  const resetGame = () => {
    setGameState("start");
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setPlayerName("");
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading questions...</div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={loadQuestionsAndLeaderboard}
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

export default QuizGame;
