import { CategoryModel } from "./categoryModel";
import { SubjectModel } from "./subjectModel";

export interface CategorySubjects{
  category:CategoryModel,
  subject:SubjectModel[]
}
