export type AppUser = {
    id: string,
    username: string,
    email: string,
    student: Student | undefined,
    instructor: Instructor | undefined
}

export type Student = {
    id: string,
    courses: string[],
    grades: {
        [courseId: string] : Grade[],
    }
}

export type Grade = {
    assignmentId: string,
    grade: number
}

export type Instructor = {
    id: string,
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