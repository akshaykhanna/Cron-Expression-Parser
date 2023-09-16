const {fieldsMap } = require('./constants');

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

module.exports = { expandField };