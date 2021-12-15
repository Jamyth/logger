import chalk from 'chalk';
import readline from 'readline';

type Text = string | Error | Array<string | Error>;
type Color = 'blueBright' | 'greenBright' | 'redBright';

export function createConsoleLogger(descriptiveTitle: string) {
    const curriedPrint = (emoji: string) => (color: Color) => {
        return (descriptiveTitle: string) =>
            (text: Text, lineBreak: boolean = false) => {
                const title = chalk[color].bold(`${emoji} [${descriptiveTitle}]`);
                const body = chalk.whiteBright(
                    (Array.isArray(text) ? text : [text]).map((_) => _.toString()).join(' '),
                );
                if (lineBreak) {
                    console.info('');
                }
                return `${title} ${body}`;
            };
    };

    const log =
        (callback: (text: Text, lineBreak?: boolean) => string) =>
        (text: Text, lineBreak: boolean = false) =>
            console.info(callback(text, lineBreak));

    const prompt = (callback: (text: Text) => string) => async (text: Text) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const promptInput = () => new Promise<string>((resolve) => rl.question(callback(text) + '\n> ', resolve));
        const answer = await promptInput();
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
