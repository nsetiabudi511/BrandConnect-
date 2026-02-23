import { projectId, publicAnonKey } from '/utils/supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-c7ecd8ca`;

interface BrandReadinessData {
  score: number;
  scoreChange: number;
  lastUpdated: string;
  categories: {
    name: string;
    score: number;
    target: number;
    status: string;
    description: string;
  }[];
  improvementActions: {
    id: string;
    title: string;
    description: string;
    priority: string;
    category: string;
    impact: string;
  }[];
  weakestCategory: string;
}

interface ProgressData {
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

async function makeRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getBrandReadiness(userId: string): Promise<BrandReadinessData | null> {
  try {
    const data = await makeRequest(`/brand-readiness/${userId}`);
    return data;
  } catch (error) {
    console.log('Error fetching brand readiness:', error);
    return null;
  }
}

export async function saveBrandReadiness(userId: string, data: BrandReadinessData): Promise<boolean> {
  try {
    await makeRequest(`/brand-readiness/${userId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.log('Error saving brand readiness:', error);
    return false;
  }
}

export async function getProgress(userId: string): Promise<ProgressData> {
  try {
    const data = await makeRequest(`/progress/${userId}`);
    return data;
  } catch (error) {
    console.log('Error fetching progress:', error);
    return { monthlyData: [], milestones: [] };
  }
}

export async function saveProgress(userId: string, data: ProgressData): Promise<boolean> {
  try {
    await makeRequest(`/progress/${userId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.log('Error saving progress:', error);
    return false;
  }
}
