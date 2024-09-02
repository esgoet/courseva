export type Student = {
    id: string,
    username: string,
    email: string,
    gitHubId: string,
    courses: string[],
    grades: {courseId: string, courseGrades: number[]}[]
}

export type Instructor = {
    id: string,
    username: string,
    email: string,
    gitHubId: string,
    courses: string[]
}