import * as p from "@clack/prompts";
import color from "picocolors";
import {questionsData} from "../data/questions-data";
import {QuestionHelper} from "./question-helper";
import {StateStore} from "../features/StateScore";
import {LOADING_INTERVAL, TOTAL_PROGRESS} from "../data/constants";

export abstract class CliHelpers {
    static displayIntro(title: string) {
        p.intro(`${color.bgMagenta(color.black(title))}`);
    };

    static displayOutro(message: string) {
        p.outro(`${color.bgMagenta(color.black(message))}`);
    };

    static async loadPackages(): Promise<void> {
        const spin = p.spinner();
        let progress = 0;
        spin.start();

        await new Promise<void>((resolve) => {
            const timer = setInterval(() => {
                progress = Math.min(TOTAL_PROGRESS, progress + 800);
                spin.message(`Loading packages [${progress}/${TOTAL_PROGRESS}]`);
                if (progress >= TOTAL_PROGRESS) {
                    clearInterval(timer);
                    resolve();
                }
            }, LOADING_INTERVAL);
        });

        spin.stop('Done');
        this.displayOutro('spinner stop...');
    };

    static async askQuestions(): Promise<void> {
        for (const question of questionsData) {
            await QuestionHelper.askQuestion(question);
            console.clear();
        }
    };

    static displayResult(): void {
        const stateStore = StateStore.getInstance();
        const score = stateStore.getState();
        this.displayOutro(`You got ${score} questions correct!`);

        const s = p.spinner();

        if (score === 10) {
            setTimeout(() => {
                s.start("Generating secret message");
                s.stop();
                this.displayOutro(`The command line is a tool that is ripe for change.`);
            }, 5000);
        } else {
            setTimeout(() => {
                s.start();
                s.stop();
                this.displayOutro(`You need 10/10 correct to unlock the secret message. Try again.`);
            }, 3000);
        }
    };
}