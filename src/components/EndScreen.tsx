// src/components/EndScreen.tsx

import { ArrowsClockwiseIcon, TrophyIcon } from "@phosphor-icons/react";
import LeaderboardPreview from "./LeaderboardPreview";

interface Props {
  playerName: string;
  score: number;
  leaderboard: { name: string; score: number }[];
  onPlayAgain: () => void;
}

const EndScreen = ({ playerName, score, leaderboard, onPlayAgain }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
      <TrophyIcon className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
      <p className="text-2xl text-gray-600 mb-2">Well done, {playerName}!</p>
      <p className="text-5xl font-bold text-purple-600 mb-8">{score} points</p>

      <div className="flex gap-4 justify-center mb-12">
        <button
          onClick={onPlayAgain}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
        >
          <ArrowsClockwiseIcon className="w-5 h-5" />
          Play Again
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Leaderboard</h3>
        <LeaderboardPreview
          leaderboard={leaderboard}
          highlightName={playerName}
          highlightScore={score}
        />
      </div>
    </div>
  );
};

export default EndScreen;
