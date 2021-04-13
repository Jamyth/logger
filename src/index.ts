import chalk from 'chalk';
import util from 'util';
import readline from 'readline';

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
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const promptInput = (util.promisify(rl.question).bind(rl) as unknown) as (question: string) => string;

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
