exports.fieldsMap = {
    'min': { name: 'minute', start: 0, end: 59 },
    'hr': { name: 'hour', start: 0, end: 23 },
    'dayOfMonth': { name: 'day of month', start: 1, end: 31 },
    'month': { name: 'month', start: 1, end: 12 },
    'dayOfWeek': { name: 'day of week', start: 0, end: 6 },
    'cmd': { name: 'command', start: -1, end: -1 },
};
exports.fieldKeys = ['min', 'hr', 'dayOfMonth', 'month', 'dayOfWeek', 'cmd'];
exports.PAD_LENGTH = 14;
exports.EMPTY_SPACE = ' ';
exports.NO_OF_CRON_FIELDS = 6;
