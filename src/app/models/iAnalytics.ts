// export interface IAnalytics {
//   totalUsers: number;
//   totalIncome: number;
//   totalCourses: number;
//   purchasedCourses: number;
//   purchasesByMonth: PurchasesOverviewItem[];
//   purchasesByCategory: IPurchasesByCategory[];
//   recentPurchases: IRecentPurchase[];
// }

// export interface PurchasesOverviewItem {
//   _id: number; // month number (1–12)
//   totalPurchases: number;
// }

// export interface IPurchasesByCategory {
//   _id: string; // categoryId
//   totalPurchases: number;}

// export interface IRecentPurchase {
//   _id: string;
//   items: {
//     course: string; // courseId
//     price: number;
//   };
//   createdAt: string; // ISO date string
//   userDetails: UserDetails;
// }
// export interface UserDetails {
//   email: string;
//   fullName: string;
// }
export interface IAnalytics {
  totalUsers: number;
  totalIncome: number;
  totalCourses: number;
  purchasedCourses: number;
  purchasesOverview: PurchasesOverviewItem[]; // ✅ Changed from purchasesByMonth
  purchasesByCategory: IPurchasesByCategory[];
  recentPurchases: IRecentPurchase[];
}

export interface PurchasesOverviewItem {
  _id: number; // month number (1–12)
  totalPurchases: number;
}

export interface IPurchasesByCategory {
  _id: string; // categoryId
  totalPurchases: number;
  category:string;
}

export interface IRecentPurchase {
  _id: string;
  items: {
    courseTitle: string; 
    price: number;
  };
  createdAt: string; // ISO date string
  userDetails: UserDetails;
  courseDetails?: CourseDetails; // ✅ Optional if you add course lookup in backend
}

export interface UserDetails {
  email: string;
  fullName: string;
}

export interface CourseDetails {
  title: string;
}
