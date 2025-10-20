import { CaretRightIcon } from "@phosphor-icons/react";

interface Props {
  selectedAnswer: number | null;
  correctAnswerIndex: number;
  options: string[];
  timeLeft: number;
  onNext: () => void;
  isLastQuestion: boolean;
}

const FeedbackScreen = ({ selectedAnswer, correctAnswerIndex, options, timeLeft, onNext, isLastQuestion }: Props) => {
  const isCorrect = selectedAnswer === correctAnswerIndex;
  const timeBonus = Math.floor(timeLeft / 3);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      {isCorrect ? (
        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6">
          <p className="text-2xl font-bold text-green-700 mb-2">Correct! 🎉</p>
          <p className="text-green-600">+{10 + timeBonus} points (including time bonus)</p>
        </div>
      ) : (
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 mb-6">
          <p className="text-2xl font-bold text-red-700 mb-2">Incorrect 😞</p>
          <p className="text-red-600">
            The correct answer was: {options[correctAnswerIndex]}
          </p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onNext}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
        >
          {isLastQuestion ? "View Results" : "Next Question"}
          <CaretRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;