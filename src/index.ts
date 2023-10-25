import * as p from '@clack/prompts';
import color from 'picocolors';
import {QuestionHelper} from "./helpers/question-helper";
import {questionsData} from "./data/questions-data";
import {StateStore} from "./features/StateScore";

const TOTAL_PROGRESS = 10000;
const QUIZ_TITLE = 'Trivia Quiz';
const LOADING_INTERVAL = 100;
const REPLAY_DELAY = 10000;

const displayIntro = (title: string) => {
    p.intro(`${color.bgMagenta(color.black(title))}`);
};

const displayOutro = (message: string) => {
    p.outro(`${color.bgMagenta(color.black(message))}`);
};

const loadPackages = async (): Promise<void> => {
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
    displayOutro('spinner stop...');
};

const askQuestions = async (): Promise<void> => {
    for (const question of questionsData) {
        await QuestionHelper.askQuestion(question);
        console.clear();
    }
};

const displayResult = (): void => {
    const stateStore = StateStore.getInstance();
    const score = stateStore.getState();
    displayOutro(`You got ${score} questions correct!`);

    const s = p.spinner();

    if (score === 10) {
        setTimeout(() => {
            s.start("Generating secret message");
            s.stop();
            displayOutro(`The command line is a tool that is ripe for change.`);
        }, 5000);
    } else {
        setTimeout(() => {
            s.start();
            s.stop();
            displayOutro(`You need 10/10 correct to unlock the secret message. Try again.`);
        }, 3000);
    }
};

const main = async () => {
    try {
        console.clear();
        displayIntro(QUIZ_TITLE);

        await loadPackages();

        setTimeout(() => {
            displayIntro(QUIZ_TITLE);
        }, REPLAY_DELAY);

        const readyToPlay = await p.select({
            message: "No cheating. 10 questions. Results at the end. Ready to play?",
            initialValue: "Yes",
            options: [
                {value: "Yes", label: "Yes"},
                {value: "No", label: "No"}
            ],
        });

        if (readyToPlay == "Yes") {
            await askQuestions();
            displayResult();
        } else {
            displayOutro(`Ok. Bye!`);
        }
    } catch (error) {
        console.error(error);
    }
};

main();

