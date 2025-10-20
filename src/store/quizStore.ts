import { create } from "zustand";
import type { LeaderboardEntry, Question } from "../types/quiz.types";

type GameState = "start" | "playing" | "feedback" | "end";

interface QuizState {
  // State
  gameState: GameState;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  score: number;
  timeLeft: number;
  playerName: string;
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setGameState: (state: GameState) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setSelectedAnswer: (answer: number | null) => void;
  setScore: (score: number) => void;
  setTimeLeft: (time: number) => void;
  setPlayerName: (name: string) => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Derived
  getCurrentQuestion: () => Question | null;
  isLastQuestion: () => boolean;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  gameState: "start",
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  score: 0,
  timeLeft: 30,
  playerName: "",
  leaderboard: [],
  isLoading: false,
  error: null,

  // Setters
  setGameState: (gameState) => set({ gameState }),
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (currentQuestionIndex) =>
    set({ currentQuestionIndex }),
  setSelectedAnswer: (selectedAnswer) => set({ selectedAnswer }),
  setScore: (score) => set({ score }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setPlayerName: (playerName) => set({ playerName }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Derived
  getCurrentQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    return questions[currentQuestionIndex] || null;
},
  isLastQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    return currentQuestionIndex >= questions.length - 1;
  },
}));
