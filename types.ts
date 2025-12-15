export enum AppState {
  LANDING = 'LANDING',
  ASSESSMENT = 'ASSESSMENT',
  ANALYZING = 'ANALYZING',
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  RESULTS = 'RESULTS'
}

export interface UserInput {
  industry: string;
  role: string;
  companySize: string;
  revenueRange: string;
  primaryChallenge: string;
  marketingChannels: string[];
}

export interface LeadInfo {
  name: string;
  email: string;
  companyName: string;
}

export interface AuditRecommendation {
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
}

export interface ChartDataPoint {
  name: string;
  current: number;
  potential: number;
}

export interface EfficiencyMetric {
  category: string;
  score: number; // 0-100
}

export interface AuditResult {
  overallScore: number;
  executiveSummary: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: AuditRecommendation[];
  revenueProjection: ChartDataPoint[]; // For Bar Chart
  efficiencyMetrics: EfficiencyMetric[]; // For Radar Chart
}

export interface AssessmentStepProps {
  data: UserInput;
  updateData: (key: keyof UserInput, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}
