import chalk from 'chalk';
import inquirer from 'inquirer';

export function createConsoleLogger(descriptiveTitle: string) {
    const curriedPrint = (emoji: string) => (color: 'blueBright' | 'greenBright' | 'redBright') => {
        return (descriptiveTitle: string) => (text: string | Error | Array<string | Error>) => {
            const title = chalk[color].bold(`${emoji} [${descriptiveTitle}]`);
            const body = chalk.whiteBright.bgBlack(
                (Array.isArray(text) ? text : [text]).map((_) => _.toString()).join(' '),
            );
            console.info('');
            console.info(`${title} ${body}`);
        };
    };

    const prompt = async (question: string) => {
        const logger = curriedPrint('🖊')('blueBright')(descriptiveTitle);
        logger(question);
        const answer = await inquirer.prompt([
            {
                type: 'input',
                name: ' ',
            },
        ]);
        return answer[' '];
    };

    return {
        info: curriedPrint('ℹ️')('blueBright')(descriptiveTitle),
        task: curriedPrint('🛠')('greenBright')(descriptiveTitle),
        error: curriedPrint('❌')('redBright')(descriptiveTitle),
        prompt,
    };
}
