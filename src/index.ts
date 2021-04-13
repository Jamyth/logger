import chalk from 'chalk';

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

    return {
        info: curriedPrint('ℹ️')('blueBright')(descriptiveTitle),
        task: curriedPrint('🛠')('greenBright')(descriptiveTitle),
        error: curriedPrint('❌')('redBright')(descriptiveTitle),
    };
}
