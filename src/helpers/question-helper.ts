import * as p from '@clack/prompts'
import {IQuestion} from "../features/question";
import {StateStore} from "../features/state-score";

export abstract class QuestionHelper {
    static async askQuestion(question: IQuestion) {
        const options: { value: string; label?: string | undefined; hint?: string | undefined; }[] = []
        const stateStore = StateStore.getInstance();

        question.answersArray.map(answer => {
            options.push({
                value: answer,
                label: answer
            })
        })

        const answer = await p.select({
            message: question.question,
            options: options,
            initialValue: '1'
        })

        if (answer === question.answersArray[question.correctAnswerIndex]) {
            stateStore.increment()
        }
    }
}