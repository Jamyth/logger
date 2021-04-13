import util from 'util';
import readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
export const prompt = (util.promisify(rl.question).bind(rl) as unknown) as (question: string) => string;
