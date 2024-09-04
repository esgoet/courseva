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

export type NewUserDto = {
    username: string,
    email: string,
    password: string,
    role: UserRole
}

export type UserLoginDto = {
    username: string,
    password: string
}

type UserRole = "STUDENT" | "INSTRUCTOR";