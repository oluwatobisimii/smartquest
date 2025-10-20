// src/hooks/useQuizLogic.ts
import { useEffect } from "react";
import { useQuizStore } from "../store/quizStore";
import { loadQuestions } from "../utils/questionLoader";
import type { LeaderboardEntry } from "../types/quiz.types";

export const useQuiz = () => {
  const {
    gameState,
    timeLeft,
    questions,
    selectedAnswer,
    currentQuestionIndex,
    score,
    playerName,
    isLoading,
    leaderboard,
    setGameState,
    setTimeLeft,
    setQuestions,
    setLeaderboard,
    setIsLoading,
    setError,
    setPlayerName,
    setScore,
    setSelectedAnswer,
    setCurrentQuestionIndex,
    getCurrentQuestion,
    isLastQuestion,
  } = useQuizStore();

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetched = await loadQuestions();
        setQuestions(fetched);
      } catch (err) {
        console.log(err);
        setError("Failed to load questions. Please try again.");
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }

      // Load leaderboard
      const saved = localStorage.getItem("quizLeaderboard");
      if (saved) {
        try {
          setLeaderboard(JSON.parse(saved));
        } catch {
          setLeaderboard([]);
        }
      }
    };

    loadData();
  }, [setQuestions, setLeaderboard, setIsLoading, setError]);

  // Timer
  useEffect(() => {
    let timer = null;
    if (gameState === "playing" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleAnswer(null);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, gameState, setTimeLeft]);

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
    const current = getCurrentQuestion();
    if (!current) return;

    if (answerIndex === current.correctAnswer) {
      const timeBonus = Math.floor(timeLeft / 10);
      setScore(score + 10 + timeBonus);
    }
    setGameState("feedback");
  };

  const nextQuestion = () => {
    if (isLastQuestion()) {
      // Save to leaderboard
      const newEntry: LeaderboardEntry = {
        name: playerName || "Anonymous",
        score,
        date: new Date().toISOString(),
      };
      const updated = [...leaderboard, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setLeaderboard(updated);
      localStorage.setItem("quizLeaderboard", JSON.stringify(updated));
      setGameState("end");
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
      setGameState("playing");
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

  return {
    startGame,
    handleAnswer,
    nextQuestion,
    resetGame,
    questions,
    isLoading,
    leaderboard,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    gameState,
    selectedAnswer,
    setSelectedAnswer,
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    playerName,
    setPlayerName,
  };
};
