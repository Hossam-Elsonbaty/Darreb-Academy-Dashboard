export interface IAnalytics {
  totalUsers: number;
  totalPurchasedCourses: number;
  totalIncome: number;
  totalCourses: number;
  purchasesByMonth: IPurchasesByMonth[];
  purchasesByCategory: IPurchasesByCategory[];
  recentPurchases: IRecentPurchase[];
}

export interface IPurchasesByMonth {
  month: string;
  purchases: number;
}

export interface IPurchasesByCategory {
  category: string;
  value: number;
}

export interface IRecentPurchase {
  id: number;
  user: string;
  course: string;
  price: number;
  date: string; // or Date
}
