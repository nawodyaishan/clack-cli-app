export interface IQuestion {
    question: string
    answersArray: string[]
    correctAnswerIndex: number
}

export class Question implements IQuestion {
    question: string
    answersArray: string[]
    correctAnswerIndex: number

    constructor({question, answersArray, correctAnswerIndex}: IQuestion) {
        this.question = question
        this.answersArray = answersArray
        this.correctAnswerIndex = correctAnswerIndex
    }
}