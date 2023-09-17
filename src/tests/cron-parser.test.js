const parseCronString = require('../main/cron-parser');
const expandField = require('../main/field-expander');

jest.mock('../main/field-expander'); // Mock the field-expander module

fdescribe('parseCronString', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset the call count before each test
    });
    it('should return expanded cron fields', () => {
        // Mock the expandField function to return specific values
        expandField.mockReturnValueOnce(['0', '15', '30', '45']);
        expandField.mockReturnValueOnce(['0']);
        expandField.mockReturnValueOnce(['1', '15']);
        expandField.mockReturnValueOnce(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
        expandField.mockReturnValueOnce(['1', '2', '3', '4', '5']);
        expandField.mockReturnValueOnce(['/usr/bin/find']);

        const cronString = '*/15 0 1,15 * 1-5 /usr/bin/find';
        const expectedOutput = [
            'minute        0 15 30 45',
            'hour          0',
            'day of month  1 15',
            'month         1 2 3 4 5 6 7 8 9 10 11 12',
            'day of week   1 2 3 4 5',
            'command       /usr/bin/find'
        ];

        const result = parseCronString(cronString);

        expect(result).toEqual(expectedOutput);
        expect(expandField).toHaveBeenCalledTimes(6);
    });
    it('should handle an invalid cron string', () => {
        const invalidCronString = '*/15 0 1,15 * 1-5';
        const expectedErrorMessage = 'Invalid cron string. Please provide all 6 fields.';

        const result = parseCronString(invalidCronString);

        expect(result).toBe(expectedErrorMessage);
        expect(expandField).not.toHaveBeenCalled(); // Ensure expandField was not called
    });
});
