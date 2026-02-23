import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Award } from "lucide-react";

interface MonthlyProgressProps {
  monthlyData: {
    month: string;
    score: number;
  }[];
  milestones: {
    title: string;
    date: string;
    achieved: boolean;
  }[];
}

export function MonthlyProgress({ monthlyData, milestones }: MonthlyProgressProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-semibold">Progress Over Time</h3>
        </div>
        <p className="text-sm text-gray-600">Your brand readiness score trend</p>
      </div>

      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={{ stroke: '#e5e7eb' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => [`${value}%`, 'Readiness Score']}
            />
            <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">Recent Milestones</h4>
        </div>
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${milestone.achieved ? 'bg-green-600' : 'bg-gray-300'}`} />
              <div className="flex-1 flex items-center justify-between">
                <span className={`text-sm ${milestone.achieved ? 'text-gray-900' : 'text-gray-500'}`}>
                  {milestone.title}
                </span>
                <span className="text-xs text-gray-500">{milestone.date}</span>
              </div>
              {milestone.achieved && (
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  Completed
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
