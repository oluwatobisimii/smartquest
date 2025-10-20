import { TrophyIcon } from "@phosphor-icons/react";
import LeaderboardPreview from "./LeaderboardPreview";

interface Props {
  playerName: string;
  setPlayerName: (name: string) => void;
  onStart: () => void;
  leaderboard: { name: string; score: number }[];
}

const StartScreen = ({
  playerName,
  setPlayerName,
  onStart,
  leaderboard,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
      <TrophyIcon className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
      <h1 className="text-5xl font-bold text-gray-800 mb-4">Smart Quest</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Test your knowledge across various topics!
      </p>

      <div className="flex mx-auto flex-col items-center mb-8">
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full max-w-md px-4 py-3 border-2 border-gray-300 rounded-lg mb-6 text-lg focus:border-purple-600 focus:outline-none"
          onKeyPress={(e) => e.key === "Enter" && onStart()}
        />

        <button
          onClick={onStart}
          className="bg-purple-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg"
        >
          Start Quiz
        </button>
      </div>

      {leaderboard.length > 0 && (
        <LeaderboardPreview leaderboard={leaderboard.slice(0, 3)} />
      )}
    </div>
  );
};

export default StartScreen;
