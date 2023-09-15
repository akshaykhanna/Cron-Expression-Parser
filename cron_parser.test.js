const { extractFields, expandField, parseCronString } = require('./cron_parser');

describe('extractFields', () => {
    it('extractFields cron field correctly', () => {
        const cronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
        const actualExtractedFields = extractFields(cronString);
        const expectedExtractedFields = ['*/15', '0', '1,15', '*', '1-5', '/usr/bin/find'];
        expect(actualExtractedFields.length).toEqual(6);
        expect(actualExtractedFields).toEqual(expectedExtractedFields);
    });
       
});
describe('expandField', () => {
    it('expands a cron field correctly', () => {
        expect(expandField('minute', '*')).toEqual(Array.from({ length: 60 }, (_, i) => i));
        expect(expandField('hour', '5')).toEqual([5]);
        expect(expandField('month', '1,2,3')).toEqual([1, 2, 3]);
        expect(expandField('day of month', '10-15')).toEqual([10, 11, 12, 13, 14, 15]);
        expect(expandField('minute', '*/10')).toEqual([0, 10, 20, 30, 40, 50]);
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
