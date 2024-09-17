import { Grade } from "../types/userTypes";

export default function calcCourseGradeAverage(grades: Grade[]) {
    return grades.reduce((acc, currentValue) => acc + currentValue.grade, 0)/grades.length;
}