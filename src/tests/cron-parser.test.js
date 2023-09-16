const { extractFields, parseCronString } = require('../main/cron-parser');

describe('extractFields', () => {
    it('extractFields cron field correctly', () => {
        const cronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
        const actualExtractedFields = extractFields(cronString);
        const expectedExtractedFields = ['*/15', '0', '1,15', '*', '1-5', '/usr/bin/find'];
        expect(actualExtractedFields.length).toEqual(6);
        expect(actualExtractedFields).toEqual(expectedExtractedFields);
    });
       
});

describe('parseCronString', () => {
    it('parses a valid cron string correctly', () => {
        const cronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
        const expectedOutput = [
            'minute        0 15 30 45',
            'hour          0',
            'day of month  1 15',
            'month         1 2 3 4 5 6 7 8 9 10 11 12',
            'day of week   1 2 3 4 5',
            'command       /usr/bin/find'
        ].join('\n');

        expect(parseCronString(cronString)).toEqual(expectedOutput);
    });

    it('handles invalid cron strings', () => {
        const invalidCronString = '*/15 0 1,15 * 1-5';
        expect(parseCronString(invalidCronString)).toEqual("Invalid cron string. Please provide all 6 fields.");
    });
});
