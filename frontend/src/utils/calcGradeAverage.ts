import {Course} from "../types/courseTypes";
import {Grade} from "../types/userTypes";
import {getMostRecentSubmissionsByStudent} from "./getMostRecentSubmissionsByStudent.ts";

const calcStudentGradeAverage = (grades: Grade[]): number => {
    return grades.reduce((acc, currentValue) => acc + currentValue.grade, 0)/grades.length;
}

const calcCourseGradeAverage = (course: Course): number => {
    const allGrades: number[] = [];

    course.assignments.forEach((assignment) => {
        const mostRecentSubmissions = getMostRecentSubmissionsByStudent(assignment.submissions);

        mostRecentSubmissions.forEach((submission) => {
            if (submission.grade !== null && submission.grade !== undefined) {
                allGrades.push(submission.grade);
            }
        });
    });

    const gradesSum = allGrades.reduce((sum, grade) => sum + grade, 0);
    return allGrades.length > 0 ? gradesSum / allGrades.length : 0;
};

export {calcStudentGradeAverage, calcCourseGradeAverage};