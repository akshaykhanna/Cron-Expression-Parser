const {fieldsMap } = require('./constants');

module.exports = function (fieldKey, field) {
    if (fieldKey === 'cmd') {
        return [field];
    }
    const expandedField = [];
    if (field === '*') {
        return _getAllPossibleFields(fieldKey);
    }
    const parts = field.split(',');

    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            expandedField.push(..._generateFieldBtw(start, end, fieldKey));
        } else if (part.includes('/')) {
            let [start, step] = part.split('/');
            expandedField.push(..._generateFieldBtw(start, fieldsMap[fieldKey].end, fieldKey, Number(step)));
        } else {
            expandedField.push(Number(part));
        }
    }

    return expandedField;
}

function _getValidStartAndEnd(start, end, fieldKey) {
    let [validStart, validEnd] = [start, end];
    if(fieldKey && fieldKey in fieldsMap) {
        const fieldObj = fieldsMap[fieldKey];
        validStart = !start || start === '*' ? fieldObj.start : Number(start);
        validEnd = !end || end === '*' ? fieldObj.end : Number(end);
    }
    return [ validStart, validEnd ];
}

function _generateFieldBtw(start, end, fieldKey, step = 1) {
    [start, end] = _getValidStartAndEnd(start, end, fieldKey);
    const result = [];
    for (let i = start; i <= end; i += step) {
        result.push(i);
    }
    return result;
}

function _getAllPossibleFields(fieldKey) {
    const { start, end } = fieldsMap[fieldKey];
    return _generateFieldBtw(start, end);
}
