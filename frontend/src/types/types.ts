export type Course = {
    id: string,
    title: string,
    description: string,
    lessons: Lesson[],
    assignments: Assignment[],
    students: string[],
    instructors: string[]
}

export type Lesson = {
    id: string,
    title: string,
    content: string,
    whenPublic: Date
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
    timestamp: Date
}