import chalk from 'chalk';
import { prompt as promptInput, rl } from './prompt';

type Text = string | Error | Array<string | Error>;
type Color = 'blueBright' | 'greenBright' | 'redBright';

export function createConsoleLogger(descriptiveTitle: string) {
    const curriedPrint = (emoji: string) => (color: Color) => {
        return (descriptiveTitle: string) => (text: Text) => {
            const title = chalk[color].bold(`${emoji} [${descriptiveTitle}]`);
            const body = chalk.whiteBright.bgBlack(
                (Array.isArray(text) ? text : [text]).map((_) => _.toString()).join(' '),
            );
            console.info('');
            return `${title} ${body}`;
        };
    };

    const log = (callback: (text: Text) => string) => (text: Text) => console.info(callback(text));

    const prompt = (callback: (text: Text) => string) => async (text: Text) => {
        const answer = await promptInput(callback(text));
        rl.close();
        return answer;
    };

    return {
        info: log(curriedPrint('ℹ️')('blueBright')(descriptiveTitle)),
        task: log(curriedPrint('🛠')('greenBright')(descriptiveTitle)),
        error: log(curriedPrint('❌')('redBright')(descriptiveTitle)),
        prompt: prompt(curriedPrint('🖊')('blueBright')(descriptiveTitle)),
    };
}
