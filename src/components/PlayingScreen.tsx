import { AlarmIcon, TrophyIcon } from "@phosphor-icons/react";
import type { Question } from "../types/quiz.types";


interface Props {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  timeLeft: number;
  onAnswerSelect: (index: number) => void;
}

const PlayingScreen = ({ question, questionIndex, totalQuestions, score, timeLeft, onAnswerSelect }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Question {questionIndex + 1}/{totalQuestions}
          </span>
          <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {question.category}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <TrophyIcon className="w-5 h-5 text-yellow-500" />
            <span className="font-bold">{score}</span>
          </div>
          <div className={`flex items-center gap-2 ${timeLeft <= 10 ? "text-red-600" : "text-gray-700"}`}>
            <AlarmIcon className="w-5 h-5" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">{question.question}</h2>

      <div className="grid gap-4 mb-8">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className="w-full p-4 text-left rounded-xl border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 text-gray-700 font-semibold transition-all"
          >
            <span className="text-lg">{String.fromCharCode(65 + index)}. {option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayingScreen;