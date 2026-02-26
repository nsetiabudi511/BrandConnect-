import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { BrandReadinessScore } from "./components/BrandReadinessScore";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { ImprovementPanel } from "./components/ImprovementPanel";
import { MonthlyProgress } from "./components/MonthlyProgress";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle,
  Upload,
  MessageCircle,
  Target
} from "lucide-react";
import { useEffect, useState } from "react";
import * as api from "./api/brandConnect";
import { BRANDS } from "./OpportunitiesPage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const userId = "jacob-l"; // In a real app, this would come from authentication

  // Mock data for Jacob L. - Early Emerging Creator (12.5K subscribers)
  const defaultBrandReadinessScore = 68;
  const defaultScoreChange = 12; // 12% increase this month

  const defaultCategories = [
    {
      name: "Upload Consistency",
      score: 75,
      target: 80,
      icon: "Calendar",
      status: "good" as const,
      description: "Uploading 2x/week consistently",
    },
    {
      name: "Engagement Rate",
      score: 82,
      target: 75,
      icon: "TrendingUp",
      status: "strong" as const,
      description: "4.2% avg. engagement (likes, comments, shares)",
    },
    {
      name: "Audience Demographics",
      score: 55,
      target: 70,
      icon: "Users",
      status: "needs-work" as const,
      description: "Need clearer audience targeting data",
    },
    {
      name: "Media Kit Completion",
      score: 60,
      target: 90,
      icon: "FileText",
      status: "needs-work" as const,
      description: "Missing rate card and case studies",
    },
    {
      name: "Eligibility Thresholds",
      score: 85,
      target: 100,
      icon: "CheckCircle",
      status: "strong" as const,
      description: "12.5K subs, 4K watch hours (meets YPP)",
    },
  ];

  const defaultImprovementActions = [
    {
      id: "1",
      title: "Complete your Media Kit",
      description: "Add your rate card and 2-3 case studies from past collaborations or content highlights",
      priority: "high" as const,
      category: "Media Kit Completion",
      icon: "FileText",
      impact: "+15 points to readiness score",
    },
    {
      id: "2",
      title: "Improve Audience Demographics Data",
      description: "Enable detailed analytics and add audience insights to your media kit",
      priority: "high" as const,
      category: "Audience Demographics",
      icon: "Users",
      impact: "+12 points to readiness score",
    },
    {
      id: "3",
      title: "Maintain Upload Schedule",
      description: "Continue your 2x/week upload schedule for the next 4 weeks",
      priority: "medium" as const,
      category: "Upload Consistency",
      icon: "Upload",
      impact: "+5 points to readiness score",
    },
  ];

  const defaultMonthlyData = [
    { month: "Oct", score: 45 },
    { month: "Nov", score: 52 },
    { month: "Dec", score: 56 },
    { month: "Jan", score: 62 },
    { month: "Feb", score: 68 },
  ];

  const defaultMilestones = [
    {
      title: "Reached 10K subscribers",
      date: "Jan 15, 2026",
      achieved: true,
    },
    {
      title: "Achieved 4K watch hours",
      date: "Dec 28, 2025",
      achieved: true,
    },
    {
      title: "Joined YouTube Partner Program",
      date: "Feb 1, 2026",
      achieved: true,
    },
    {
      title: "Complete media kit",
      date: "Target: Mar 1, 2026",
      achieved: false,
    },
    {
      title: "Reach 80% readiness score",
      date: "Target: Mar 15, 2026",
      achieved: false,
    },
  ];

  const [brandReadinessScore, setBrandReadinessScore] = useState(defaultBrandReadinessScore);
  const [scoreChange, setScoreChange] = useState(defaultScoreChange);
  const [categories, setCategories] = useState(defaultCategories);
  const [improvementActions, setImprovementActions] = useState(defaultImprovementActions);
  const [monthlyData, setMonthlyData] = useState(defaultMonthlyData);
  const [milestones, setMilestones] = useState(defaultMilestones);

  // Load data from backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        // Try to load existing data
        const readinessData = await api.getBrandReadiness(userId);
        const progressData = await api.getProgress(userId);

        if (readinessData) {
          setBrandReadinessScore(readinessData.score);
          setScoreChange(readinessData.scoreChange);
          // Note: categories and actions from API don't have icon components
          // so we'll keep using the defaults for now
        } else {
          // Save default data if none exists
          await api.saveBrandReadiness(userId, {
            score: defaultBrandReadinessScore,
            scoreChange: defaultScoreChange,
            lastUpdated: "Feb 23, 2026",
            categories: defaultCategories.map(c => ({
              name: c.name,
              score: c.score,
              target: c.target,
              status: c.status,
              description: c.description,
            })),
            improvementActions: defaultImprovementActions.map(a => ({
              id: a.id,
              title: a.title,
              description: a.description,
              priority: a.priority,
              category: a.category,
              impact: a.impact,
            })),
            weakestCategory: "Audience Demographics",
          });
        }

        if (progressData.monthlyData.length > 0) {
          setMonthlyData(progressData.monthlyData);
          setMilestones(progressData.milestones);
        } else {
          // Save default progress data if none exists
          await api.saveProgress(userId, {
            monthlyData: defaultMonthlyData,
            milestones: defaultMilestones,
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [userId]);

  // Map icon names to components
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: JSX.Element } = {
      Calendar: <Calendar className="w-5 h-5" />,
      TrendingUp: <TrendingUp className="w-5 h-5" />,
      Users: <Users className="w-5 h-5" />,
      FileText: <FileText className="w-5 h-5" />,
      CheckCircle: <CheckCircle className="w-5 h-5" />,
      Upload: <Upload className="w-5 h-5" />,
      MessageCircle: <MessageCircle className="w-5 h-5" />,
    };
    return icons[iconName] || <Target className="w-5 h-5" />;
  };

  // Add icons to categories and actions
  const categoriesWithIcons = categories.map(c => ({
    ...c,
    icon: getIcon(c.icon as string),
  }));

  const actionsWithIcons = improvementActions.map(a => ({
    ...a,
    icon: getIcon(a.icon as string),
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your brand readiness dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* Top Section - Brand Readiness Score */}
          <div className="mb-6">
            <BrandReadinessScore 
              score={brandReadinessScore}
              change={scoreChange}
              lastUpdated="Feb 23, 2026"
            />
          </div>

          {/* Recommended Actions */}
          <div className="mb-8">
            <ImprovementPanel 
              score={brandReadinessScore}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Category Breakdown - Takes 2 columns */}
            <div className="lg:col-span-2">
              <CategoryBreakdown categories={categoriesWithIcons} />
            </div>

            {/* Monthly Progress */}
            <div className="lg:col-span-1">
              <MonthlyProgress 
                monthlyData={monthlyData}
                milestones={milestones}
              />
            </div>
          </div>

          {/* Partnership Picks */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">Partnership Picks</h3>
                <p className="text-sm text-gray-600">
                  A sneak peek of brands you&apos;re eligible to apply to.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/opportunities";
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View all opportunities
              </button>
            </div>
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                {BRANDS.filter((brand) => brand.eligible)
                  .slice(0, 8)
                  .map((brand) => {
                    const initials = brand.emoji || brand.name.slice(0, 2).toUpperCase();

                    return (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => {
                          window.location.href = `/opportunities?brand=${brand.id}`;
                        }}
                        className="snap-start flex-shrink-0 w-44 bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-base font-semibold text-gray-700">
                            {initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {brand.name}
                            </div>
                            <div className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              Eligible
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}