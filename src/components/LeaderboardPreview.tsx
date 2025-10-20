// src/components/LeaderboardPreview.tsx
interface Props {
  leaderboard: { name: string; score: number }[];
  highlightName?: string;
  highlightScore?: number;
}

const LeaderboardPreview = ({ leaderboard, highlightName, highlightScore }: Props) => {
  return (
    <div className="space-y-3">
      {leaderboard.map((entry, index) => {
        const isHighlighted =
          highlightName &&
          highlightScore &&
          entry.name === highlightName &&
          entry.score === highlightScore;

        return (
          <div
            key={index}
            className={`flex justify-between items-center px-4 py-3 rounded-lg ${
              isHighlighted ? "bg-purple-100 border-2 border-purple-500" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold text-lg ${index < 3 ? "text-yellow-600" : "text-gray-600"}`}>
                {index + 1}.
              </span>
              <span className="font-semibold text-gray-800">{entry.name}</span>
            </div>
            <span className="text-purple-600 font-bold text-lg">{entry.score} pts</span>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderboardPreview;