import { TrendingUp, TrendingDown } from "lucide-react";

interface BrandReadinessScoreProps {
  score: number;
  change: number;
  lastUpdated: string;
}

export function BrandReadinessScore({ score, change, lastUpdated }: BrandReadinessScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return "Brand Ready";
    if (score >= 60) return "Growing";
    return "Building";
  };

  const r = 52;
  const circumference = 2 * Math.PI * r;

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
          <svg className="w-36 h-36 transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r={r}
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="72"
              cy="72"
              r={r}
              stroke={score >= 80 ? "#16a34a" : score >= 60 ? "#ca8a04" : "#ea580c"}
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
            <div className="text-xs text-gray-500">out of 100</div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className={`inline-block px-3 py-1 rounded-full mb-2 text-sm ${
            score >= 80 ? "bg-green-100 text-green-800" : 
            score >= 60 ? "bg-yellow-100 text-yellow-800" : 
            "bg-orange-100 text-orange-800"
          }`}>
            {getScoreStatus(score)}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            {score >= 80 ? (
              <>
                Your channel meets the criteria for brand partnerships! You're ready to start 
                connecting with brands through BrandConnect.
              </>
            ) : score >= 60 ? (
              <>
                You're making great progress! Focus on the improvement areas below to become 
                brand-ready and unlock partnership opportunities.
              </>
            ) : (
              <>
                Keep building your foundation. Complete the recommended actions below to improve 
                your brand readiness and grow your monetization potential.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
