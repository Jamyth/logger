require('ts-node').register({ transpileOnly: true });

const { createConsoleLogger } = require('../src');
const { strict: assert } = require('assert');
const consoleOutput = require('test-console').stdout;

describe('createConsoleLogger', () => {
    const logger = createConsoleLogger('My Console Logger');

    it('info', () => {
        const output = consoleOutput.inspectSync(() => {
            logger.info('Test logger.info()');
        })
        assert.deepEqual(output, ["\n","\x1B[94m\x1B[1mℹ️ [My Console Logger]\x1B[22m\x1B[39m \x1B[97m\x1B[40mTest logger.info()\x1B[49m\x1B[39m\n"])
    })
    it('task', () => {
        const output = consoleOutput.inspectSync(() => {
            logger.task('Test logger.task()');
        })
        assert.deepEqual(output, ["\n","\u001b[92m\u001b[1m🛠 [My Console Logger]\u001b[22m\u001b[39m \u001b[97m\u001b[40mTest logger.task()\u001b[49m\u001b[39m\n"])
    })
    it('error', () => {
        const output = consoleOutput.inspectSync(() => {
            logger.error('Test logger.error()');
        })
        assert.deepEqual(output, ["\n","\u001b[91m\u001b[1m❌ [My Console Logger]\u001b[22m\u001b[39m \u001b[97m\u001b[40mTest logger.error()\u001b[49m\u001b[39m\n"])
    })
})
