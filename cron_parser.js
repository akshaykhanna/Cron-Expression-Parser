const fieldNames = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
const fieldsMap = {
    'min': {name: 'minute', start: 0, end: 59},
    'hr': {name: 'hour', start: 0, end: 23},
    'dayOfMonth': {name: 'hour', start: 0, end: 23},
    'dayOfMonth': 'day of month',
    'month': 'month',
    'dayOfWeek': 'day of week',
    'cmd': 'command'
};

function expandField(fieldName, field) {
    const expandedField = [];
    if (field === '*') {
        return _allPossibleFields(fieldName);
    }
    if (fieldName === 'command') {
        return [field];
    }
    const parts = field.split(',');

    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            expandedField.push(..._generateFieldBtw(start, end));
        } else if (part.includes('/')) {
            let [start, step] = part.split('/');
            start = start === '*' ? 0 : Number(start);
            for (let i = start; i < 60; i += Number(step)) {
                expandedField.push(i);
            }
        } else {
            expandedField.push(Number(part));
        }
    }

    // return Array.from(new Set(expandedField)).sort((a, b) => a - b);
    return expandedField;
}

function _generateFieldBtw(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

function _allPossibleFields(fieldName) {
    switch (fieldName) {
        case 'minute':
            return Array.from({ length: 60 }, (_, i) => i);
        case 'hour':
            return Array.from({ length: 24 }, (_, i) => i);
        case 'day of month':
            return Array.from({ length: 31 }, (_, i) => i + 1);
        case 'month':
            return Array.from({ length: 12 }, (_, i) => i + 1);
        case 'day of week':
            return Array.from({ length: 7 }, (_, i) => i);
        default:
            return [];
    }
}

function extractFields(cronString) {
    const cronFields = cronString.split(' ');
    return cronFields;
}

function parseCronString(cronString) {
    let outputString = '';
    const cronFields = extractFields(cronString);

    if (cronFields.length !== 6) {
        return "Invalid cron string. Please provide all 6 fields.";
    }


    const expandedFields = cronFields.map((field, index) => expandField(fieldNames[index], field));

    for (let i = 0; i < fieldNames.length; i++) {
        outputString += `${fieldNames[i].padEnd(14)}${expandedFields[i].join(' ')}`;
        if(i < fieldNames.length - 1) {
            outputString += '\n';
        }
    }
    return outputString;
}

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.log("Usage: node your_program.js 'cron_string'");
    process.exit(1);
}

const cronString = args[0];
console.log(parseCronString(cronString));

module.exports = { extractFields, expandField, parseCronString };
