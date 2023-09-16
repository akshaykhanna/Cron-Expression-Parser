const fieldsMap = {
    'min': { name: 'minute', start: 0, end: 59 },
    'hr': { name: 'hour', start: 0, end: 23 },
    'dayOfMonth': { name: 'day of month', start: 1, end: 31 },
    'month': { name: 'month', start: 1, end: 12 },
    'dayOfWeek': { name: 'day of week', start: 1, end: 7 },
    'cmd': { name: 'command', start: -1, end: -1 },
};
const fieldKeys = ['min', 'hr', 'dayOfMonth', 'month', 'dayOfWeek', 'cmd'];


function expandField(fieldKey, field) {
    if (fieldKey === 'cmd') {
        return [field];
    }
    const expandedField = [];
    if (field === '*') {
        return _allPossibleFields(fieldKey);
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

    return expandedField;
}

function _getValidStartAndEnd(start, end, fieldKey) {
    if(fieldKey && fieldKey in fieldsMap) {
        const fieldObj = fieldsMap[fieldKey];
        var validStart = !start || start === '*' ? fieldObj.start : Number(start);
        var validEnd = !end || end === '*' ? fieldObj.end : Number(end);
    }
    return [ validStart, validEnd ];
}

function _generateFieldBtw(start, end, fieldKey, step = 1) {
    const result = [];
    for (let i = start; i <= end; i += step) {
        result.push(i);
    }
    return result;
}

function _allPossibleFields(fieldKey) {
    const { start, end } = fieldsMap[fieldKey];
    return _generateFieldBtw(start, end);
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
    const expandedFields = cronFields.map((field, index) => expandField(fieldKeys[index], field));

    for (let i = 0; i < fieldKeys.length; i++) {
        const fieldName = fieldsMap[fieldKeys[i]].name;
        outputString += `${fieldName.padEnd(14)}${expandedFields[i].join(' ')}`;
        if (i < fieldKeys.length - 1) {
            outputString += '\n';
        }
    }
    return outputString;
}

module.exports = { extractFields, expandField, parseCronString };
