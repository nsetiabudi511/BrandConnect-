import { TrendingUp, TrendingDown } from "lucide-react";

interface BrandReadinessScoreProps {
  score: number;
  change: number;
  lastUpdated: string;
}

export function BrandReadinessScore({ score, change, lastUpdated }: BrandReadinessScoreProps) {
  const getScoreColor = (score: number) => {
    if (score === 100) return "text-green-600";
    return "text-orange-600";
  };

  const getTierLabel = (score: number) => {
    if (score === 100) return "🥇 Brand-Ready Creator";
    return "🥉 Emerging Creator";
  };

  const r = 60;
  const circumference = 2 * Math.PI * r;
  const tierLabel = getTierLabel(score);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-0.5">Brand Readiness Score</h2>
          <p className="text-xs text-gray-500">Last updated {lastUpdated}</p>
        </div>
        <div className="flex items-center gap-2">
          {change >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-600" />
          )}
          <span className={`text-xs font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {change >= 0 ? "+" : ""}{change}% this month
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={r}
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r={r}
              stroke={score === 100 ? "#16a34a" : "#ea580c"}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl sm:text-5xl font-bold ${getScoreColor(score)}`}>{score}</div>
            <div className="text-xs text-gray-500">out of 100</div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <span className="block text-base sm:text-lg font-semibold text-gray-900">
              {tierLabel}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {score === 100 ? (
              <>
                You've unlocked Brand-Ready status. Your profile is fully optimized for partnerships.
              </>
            ) : (
              <>
                You're building your monetization foundation. Complete all requirements to unlock Brand-Ready status.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
