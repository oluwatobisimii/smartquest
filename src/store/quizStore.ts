import { create } from "zustand";
import type { LeaderboardEntry, Question } from "../types/quiz.types";

type GameState = "start" | "playing" | "feedback" | "end";

interface QuizState {
  // Global State
  gameState: GameState;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  playerName: string;
  leaderboard: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setGameState: (state: GameState) => void;
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setScore: (score: number) => void;
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
  score: 0,
  playerName: "",
  leaderboard: [],
  isLoading: false,
  error: null,

  // Setters
  setGameState: (gameState) => set({ gameState }),
  setQuestions: (questions) => set({ questions }),
  setCurrentQuestionIndex: (currentQuestionIndex) => set({ currentQuestionIndex }),
  setScore: (score) => set({ score }),
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
