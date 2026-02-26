import { Lightbulb } from "lucide-react";

type TierKey = "emerging" | "brand_ready" | "premium";

interface TierTask {
  id: string;
  label: string;
  tier: TierKey;
}

interface ImprovementPanelProps {
  score: number;
}

const TIER_TASKS: TierTask[] = [
  // Emerging Creator
  { id: "emerging-1", label: "Add bio + niche", tier: "emerging" },
  { id: "emerging-2", label: "Connect at least 1 platform", tier: "emerging" },
  { id: "emerging-3", label: "Start media kit", tier: "emerging" },
  // Brand-Ready Creator
  { id: "brand-1", label: "Complete media kit (100%)", tier: "brand_ready" },
  { id: "brand-2", label: "Input audience demographics", tier: "brand_ready" },
  { id: "brand-3", label: "Connect analytics data", tier: "brand_ready" },
  { id: "brand-4", label: "Set pricing ranges", tier: "brand_ready" },
  { id: "brand-5", label: "Add 1 case study / past collaboration", tier: "brand_ready" },
  // Premium Partner
  { id: "premium-1", label: "Upload campaign report (performance recap)", tier: "premium" },
  { id: "premium-2", label: "Upload contract checklist", tier: "premium" },
  { id: "premium-3", label: "Verify payout setup", tier: "premium" },
  { id: "premium-4", label: "Add 3+ case studies", tier: "premium" },
];

const getTierKey = (score: number): TierKey => {
  if (score >= 75) return "premium";
  if (score >= 40) return "brand_ready";
  return "emerging";
};

const getTierName = (tier: TierKey): string => {
  switch (tier) {
    case "premium":
      return "Premium Partner";
    case "brand_ready":
      return "Brand-Ready Creator";
    default:
      return "Emerging Creator";
  }
};

const getCompletedCountForTier = (score: number, tier: TierKey, totalTasks: number) => {
  if (totalTasks === 0) return 0;

  let ratio = 0;

  if (tier === "emerging") {
    ratio = Math.max(0, Math.min(1, score / 39));
  } else if (tier === "brand_ready") {
    ratio = Math.max(0, Math.min(1, (score - 40) / (74 - 40)));
  } else {
    ratio = Math.max(0, Math.min(1, (score - 75) / (100 - 75)));
  }

  return Math.max(0, Math.min(totalTasks, Math.round(ratio * totalTasks)));
};

export function ImprovementPanel({ score }: ImprovementPanelProps) {
  const tierKey = getTierKey(score);
  const tierName = getTierName(tierKey);

  const tasksForTier = TIER_TASKS.filter((task) => task.tier === tierKey);
  const completedCount = getCompletedCountForTier(score, tierKey, tasksForTier.length);
  const completedTasks = tasksForTier.slice(0, completedCount);
  const upNextTasks = tasksForTier.slice(completedCount);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h3 className="text-xl font-semibold">Recommended Actions</h3>
        </div>
        <p className="text-sm text-gray-600">
          Based on your current tier:{" "}
          <span className="font-medium text-orange-600">{tierName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Completed</h4>
          {completedTasks.length === 0 ? (
            <p className="text-sm text-gray-500">You haven’t completed any tier tasks yet.</p>
          ) : (
            <ul className="space-y-1">
              {completedTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{task.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Up Next</h4>
          {upNextTasks.length === 0 ? (
            <p className="text-sm text-gray-500">You’ve completed all tasks for this tier.</p>
          ) : (
            <ul className="space-y-1">
              {upNextTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                  <span>{task.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
