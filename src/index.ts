import * as p from '@clack/prompts'
import color from 'picocolors'
import {QuestionHelper} from "./helpers/question-helper";
import {questionsData} from "./data/questions-data";
import {StateStore} from "./features/StateScore";

const main = async () => {
    console.clear();
    p.intro(`${color.bgMagenta(color.black('Trivia Quiz'))}`)

    const spin = p.spinner();
    const total = 10000;
    let progress = 0;
    spin.start();

    new Promise((resolve) => {
        const timer = setInterval(() => {
            progress = Math.min(total, progress + 1);
            if (progress >= total) {
                clearInterval(timer);
                resolve(true);
            }
            spin.message(`Loading packages [${progress}/${total}]`); // <===
        }, 100);
    }).then(() => {
        spin.stop(`Done`);
        p.outro('spinner stop...');
    });

    setTimeout(() => {
        p.intro(`${color.bgMagenta(color.black('Trivia Quiz'))}`)
    }, 10000);
    const stateStore = StateStore.getInstance();
    const readyToPlay = await p.select({
        message: "No cheating. 10 questions. Results at the end. Ready to play?",
        initialValue: "Yes",
        options: [
            {value: "Yes", label: "Yes"},
            {value: "No", label: "No"}],
    })

    if (readyToPlay == "Yes") {
        // Begin trivia game
        questionsData.map(question => {
            QuestionHelper.askQuestion(question).then(() => console.clear())
        })

        // Decide what ending screen to show based on how many questions user answered correctly
        p.outro(`${color.bgMagenta(color.black(`You got ${stateStore.getState()} questions correct!`))}`);

        if (stateStore.getState() == 10) {
            const s = p.spinner();
            setTimeout(() => {
                s.start("Generating secret message");
            }, 5000);
            s.stop();
            p.outro(`${color.bgMagenta(color.black(`The command line is a tool that is ripe for change. `))}`);
        } else {
            const s = p.spinner();
            setTimeout(() => {
                s.start();
            }, 3000);
            s.stop();
            p.outro(`${color.bgMagenta(color.black(`You need 10/10 correct to unlock the secret message. Try again.`))}`);
        }
    } else {
        p.outro(`${color.bgMagenta(color.black(`Ok. Bye!`))}`);
    }
}

main().catch(console.error);