import * as p from '@clack/prompts';
import {CliHelpers} from "./helpers/cli-helpers";
import {QUIZ_TITLE, REPLAY_DELAY} from "./data/constants";


const main = async () => {
    try {
        console.clear();
        CliHelpers.displayIntro(QUIZ_TITLE);

        await CliHelpers.loadPackages();

        setTimeout(() => {
            CliHelpers.displayIntro(QUIZ_TITLE);
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
            await CliHelpers.askQuestions();
            CliHelpers.displayResult();
        } else {
            CliHelpers.displayOutro(`Ok. Bye!`);
        }
    } catch (error) {
        console.error(error);
    }
};

main();

