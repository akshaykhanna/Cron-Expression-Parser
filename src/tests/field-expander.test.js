const { expandField } = require('../main/field-expander');

describe('expandField', () => {
    it('expands a cron field correctly', () => {
        expect(expandField('min', '*')).toEqual(Array.from({ length: 60 }, (_, i) => i));
        expect(expandField('hr', '5')).toEqual([5]);
        expect(expandField('month', '1,2,3')).toEqual([1, 2, 3]);
        expect(expandField('dayOfWeek', '10-15')).toEqual([10, 11, 12, 13, 14, 15]);
        expect(expandField('min', '*/10')).toEqual([0, 10, 20, 30, 40, 50]);
        expect(expandField('cmd', '/usr/bin/find')).toEqual(['/usr/bin/find']);
    });
    it('expands all cron fields with * value', () => {
        expect(expandField('min', '*')).toEqual(Array.from({ length: 60 }, (_, i) => i));
        expect(expandField('hr', '*')).toEqual(Array.from({ length: 24 }, (_, i) => i));
        expect(expandField('dayOfMonth', '*')).toEqual(Array.from({ length: 31 }, (_, i) => i + 1));
        expect(expandField('month', '*')).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
        expect(expandField('dayOfWeek', '*')).toEqual(Array.from({ length: 7 }, (_, i) => i + 1));
        expect(expandField('cmd', '*')).toEqual(['*']);
    });
    it('expands all cron fields with - value', () => {
        expect(expandField('min', '15-20')).toEqual([15, 16, 17, 18, 19, 20]);
        expect(expandField('hr', '5-10')).toEqual([5, 6, 7, 8, 9, 10]);
        expect(expandField('dayOfMonth', '10-15')).toEqual([10, 11, 12, 13, 14, 15]);
        expect(expandField('month', '2-5')).toEqual([2, 3, 4, 5]);
        expect(expandField('dayOfWeek', '1-3')).toEqual([1, 2, 3]);
        expect(expandField('cmd', '2-5')).toEqual(['2-5']);
    });
    xit('expands all cron fields with *-* value', () => {
        expect(expandField('min', '*-5')).toEqual([1,2,3,4,5]);
        expect(expandField('hr', '20-*')).toEqual([20,21,22,23]);
        expect(expandField('dayOfMonth', '27-*')).toEqual([27,28,29,30,31]);
        expect(expandField('month', '*-*')).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
        expect(expandField('dayOfWeek', '*-*')).toEqual([1,2,3,4,5,6,7]);
        expect(expandField('cmd', '2-5')).toEqual(['2-5']);
    });
});

