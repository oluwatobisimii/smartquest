// Types
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}


export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}
