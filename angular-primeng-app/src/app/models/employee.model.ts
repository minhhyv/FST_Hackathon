export interface Employee {
  id: string;
  employeeId: string;
  fullName: string;
  avatarUrl: string;
  department: string;
  position: string;
  contractInfo: ContractInfo;
  certificates: Certificate[];
  awards: Award[];
  workHistory: WorkHistory[];
  performanceData: PerformanceData;
}

export interface ContractInfo {
  startDate: string;
  contractType: string;
  position: string;
  department: string;
  level: string;
  grade: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: string;
}

export interface Award {
  id: string;
  title: string;
  description: string;
  awardDate: string;
  category: string;
}

export interface WorkHistory {
  id: string;
  period: string;
  position: string;
  project: string;
  description: string;
}

export interface PerformanceData {
  creEvaluation: ChartData;
  timesheetData: ChartData;
  auditSurveyData: ChartData;
  essSurveyData: ChartData;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string | string[];
  tension?: number;
}
