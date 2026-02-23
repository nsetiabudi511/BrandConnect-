import { Button } from "./ui/button";
import { 
  ArrowRight, 
  Upload, 
  MessageCircle, 
  FileText,
  Target,
  Lightbulb
} from "lucide-react";

interface ImprovementAction {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: string;
  icon: React.ReactNode;
  impact: string;
}

interface ImprovementPanelProps {
  actions: ImprovementAction[];
  weakestCategory: string;
}

export function ImprovementPanel({ actions, weakestCategory }: ImprovementPanelProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-50 border-red-200 text-red-800";
      case "medium":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "low":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h3 className="text-xl font-semibold">Recommended Actions</h3>
        </div>
        <p className="text-sm text-gray-600">
          Focus on <span className="font-medium text-orange-600">{weakestCategory}</span> for the biggest impact
        </p>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`border rounded-lg p-4 ${getPriorityColor(action.priority)}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {action.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium mb-1">{action.title}</h4>
                    <p className="text-sm opacity-80 mb-2">{action.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBadgeColor(action.priority)}`}>
                    {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} Priority
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 opacity-60" />
                    <span className="text-sm opacity-80">{action.impact}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="gap-1 hover:gap-2 transition-all"
                  >
                    Take Action
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
