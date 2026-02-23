import { Progress } from "./ui/progress";
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Brand Readiness Score</h2>
          <p className="text-sm text-gray-500">Last updated {lastUpdated}</p>
        </div>
        <div className="flex items-center gap-2">
          {change >= 0 ? (
            <TrendingUp className="w-5 h-5 text-green-600" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-600" />
          )}
          <span className={`text-sm font-medium ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
            {change >= 0 ? "+" : ""}{change}% this month
          </span>
        </div>
      </div>

      <div className="flex items-center gap-12">
        <div className="relative">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke={score >= 80 ? "#16a34a" : score >= 60 ? "#ca8a04" : "#ea580c"}
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${(score / 100) * 2 * Math.PI * 88} ${2 * Math.PI * 88}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
        </div>

        <div className="flex-1">
          <div className={`inline-block px-4 py-2 rounded-full mb-4 ${
            score >= 80 ? "bg-green-100 text-green-800" : 
            score >= 60 ? "bg-yellow-100 text-yellow-800" : 
            "bg-orange-100 text-orange-800"
          }`}>
            {getScoreStatus(score)}
          </div>
          <p className="text-gray-700 leading-relaxed">
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
                Keep building your foundation. Complete the recommended actions to improve 
                your brand readiness and grow your monetization potential.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
