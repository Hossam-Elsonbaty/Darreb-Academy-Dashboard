

import { ICategory } from "./i-category";

export interface ILecture {
  id: string;
  title: string;
  title_ar: string;
  videoUrl: string;
  duration: number;
  order: number;
}

export interface IChapter {
  id: string;
  title: string;
  title_ar: string;
  duration: number;
  order: number;
  lectures?: ILecture[];
}
export interface IInstructor {
id: string;
email?: string;
fullName: string;
role?: string;
}
export interface ICourse {
  id: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  price: number;
  thumbnail: string;
  instructor?: IInstructor;
  category: ICategory;
  level: string;
  duration: number;
  isPublished: boolean;
  chapters?: IChapter[];
}
