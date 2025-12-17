import { ICategory } from "./i-category";

export interface ILecture {
  _id: string;
  title: string;
  title_ar: string;
  videoUrl: string;
  videoId: string;
  duration: number;
  order: number;
}
export interface ICourseChaptersResponse {
  courseId: string;
  totalChapters: number;
  data: IChapter[];
}
export interface IChapter {
  _id: string;
  title: string;
  title_ar: string;
  totalDuration: string;
  totalLectures: number;
  order: number;
  lectures?: ILecture[];
}
export interface IInstructor {
_id: string;
email?: string;
fullName: string;
role?: string;
}
export interface ICourse {
  _id: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  price: number;
  thumbnail: string;
  instructor?: IInstructor;
  category: ICategory;
  level: string;
  totalDuration: string;
  isPublished: boolean;
  chapters?: IChapter[];
  totalRatings:number;
  totalEnrollments:number;
  totalLectures:number;
}
