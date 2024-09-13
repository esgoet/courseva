export type Course = {
    id: string,
    title: string,
    description: string,
    lessons: Lesson[],
    assignments: Assignment[],
    students: string[],
    instructors: string[],
    startDate: Date
}

export type CourseDto = {
    id: string,
    title: string,
    description: string,
    lessons: LessonDto[],
    assignments: AssignmentDto[],
    students: string[],
    instructors: string[],
    startDate: string
}

export type NewCourseDto = {
    title: string,
    description: string,
    students: string[],
    instructors: string[],
    startDate: string
}

export type Lesson = {
    id: string,
    title: string,
    content: string,
    whenPublic: Date
}
export type LessonDto = {
    id: string,
    title: string,
    content: string,
    whenPublic: string
}
export type AssignmentDto = {
    id: string,
    title: string,
    description: string,
    whenPublic: string,
    deadline: string,
    submissions: SubmissionDto[]
}

export type Assignment = {
    id: string,
    title: string,
    description: string,
    whenPublic: Date,
    deadline: Date,
    submissions: Submission[]
}

export type Submission = {
    id: string,
    studentId: string,
    content: string,
    feedback: string,
    grade: number,
    timestamp: Date
}

export type SubmissionDto = {
    id: string,
    studentId: string,
    content: string,
    feedback: string,
    grade: number,
    timestamp: string
}