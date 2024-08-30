import {
    Assignment,
    AssignmentDto,
    Course,
    CourseDto,
    Lesson,
    LessonDto,
    Submission,
    SubmissionDto
} from "../types/types.ts";
import {formatDate} from "./formatDate.ts";

export const convertToCourse = (courseDto: CourseDto): Course => ({
    ...courseDto,
    startDate: formatDate(courseDto.startDate),
    lessons: courseDto.lessons.map(convertToLesson),
    assignments: courseDto.assignments.map(convertToAssignment)
})

const convertToLesson = (lessonDto: LessonDto): Lesson => ({
    ...lessonDto,
    whenPublic: formatDate(lessonDto.whenPublic),
});

const convertToAssignment = (assignmentDto: AssignmentDto): Assignment => ({
    ...assignmentDto,
    whenPublic: formatDate(assignmentDto.whenPublic),
    deadline: formatDate(assignmentDto.deadline),
    submissions: assignmentDto.submissions.map(convertToSubmission),
});

const convertToSubmission = (submissionDto: SubmissionDto): Submission => ({
    ...submissionDto,
    timestamp: formatDate(submissionDto.timestamp),
});
