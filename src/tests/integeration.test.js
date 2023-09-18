const parseCronString = require('../main/cron-parser');

describe('integration', () => {
    it("parse a valid cron string '*/15 0 1,15 * 1-5 /usr/bin/find' correctly" , () => {
        const cronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
        const expectedOutput = [
            'minute        0 15 30 45',
            'hour          0',
            'day of month  1 15',
            'month         1 2 3 4 5 6 7 8 9 10 11 12',
            'day of week   1 2 3 4 5',
            'command       /usr/bin/find'
        ];
        expect(parseCronString(cronString)).toEqual(expectedOutput);
    });
    it("parse a valid cron string '0 12 * * 1-5 /usr/bin/command' correctly" , () => {
        const cronString = '0 12 * * 1-5 /usr/bin/command';
        const expectedOutput = [
            'minute        0',
            'hour          12',
            'day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31',
            'month         1 2 3 4 5 6 7 8 9 10 11 12',
            'day of week   1 2 3 4 5',
            'command       /usr/bin/command'
        ];
        expect(parseCronString(cronString)).toEqual(expectedOutput);
    });
    it("parse a valid cron string '30 2 * 4,8,12 * /usr/local/bin/script' correctly" , () => {
        const cronString = '30 2 * 4,8,12 * /usr/local/bin/script';
        const expectedOutput = [
            'minute        30',
            'hour          2',
            'day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31',
            'month         4 8 12',
            'day of week   0 1 2 3 4 5 6',
            'command       /usr/local/bin/script'
        ];
        expect(parseCronString(cronString)).toEqual(expectedOutput);
    });
    it("parse a valid cron string '*/10 * * * * /bin/task' correctly" , () => {
        const cronString = '*/10 * * * * /bin/task';
        const expectedOutput = [
            'minute        0 10 20 30 40 50',
            'hour          0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23',
            'day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31',
            'month         1 2 3 4 5 6 7 8 9 10 11 12',
            'day of week   0 1 2 3 4 5 6',
            'command       /bin/task'
        ];
        expect(parseCronString(cronString)).toEqual(expectedOutput);
    });
    it("parse a valid cron string '0 0 1 1 * /usr/bin/monthly-job' correctly" , () => {
        const cronString = '0 0 1 1 * /usr/bin/monthly-job';
        const expectedOutput = [
            'minute        0',
            'hour          0',
            'day of month  1',
            'month         1',
            'day of week   0 1 2 3 4 5 6',
            'command       /usr/bin/monthly-job'
        ];
        expect(parseCronString(cronString)).toEqual(expectedOutput);
    });
    it('handles invalid cron strings', () => {
        const invalidCronString = '*/15 0 1,15 * 1-5';
        expect(parseCronString(invalidCronString)).toEqual("Invalid cron string. Please provide all 6 fields.");
    });
});
