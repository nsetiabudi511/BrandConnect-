import { Progress } from "./ui/progress";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle,
  AlertCircle 
} from "lucide-react";

interface Category {
  name: string;
  score: number;
  target: number;
  icon: React.ReactNode;
  status: "strong" | "good" | "needs-work";
  description: string;
}

interface CategoryBreakdownProps {
  categories: Category[];
}

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong":
        return "text-green-600";
      case "good":
        return "text-yellow-600";
      case "needs-work":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "strong":
        return "bg-green-600";
      case "good":
        return "bg-yellow-500";
      case "needs-work":
        return "bg-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-6">Category Breakdown</h3>
      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`${getStatusColor(category.status)}`}>
                  {category.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{category.name}</h4>
                    {category.status === "strong" && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {category.status === "needs-work" && (
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-semibold ${getStatusColor(category.status)}`}>
                  {category.score}%
                </div>
                <div className="text-xs text-gray-500">Target: {category.target}%</div>
              </div>
            </div>
            <div className="relative">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(category.status)}`}
                  style={{ width: `${category.score}%` }}
                />
              </div>
              {category.target < 100 && (
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-gray-400"
                  style={{ left: `${category.target}%` }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
