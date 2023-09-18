const { fieldsMap } = require('./constants');

module.exports = function (fieldKey, field) {
    if (fieldKey === 'cmd') {
        return [field];
    }
    if (field === '*') {
        return _getAllPossibleFields(fieldKey);
    }
    if (field.includes('-')) {
        const [start, end] = field.split('-').map(Number);
        return _generateFieldBtw(start, end, fieldKey);
    }
    if (field.includes('/')) {
        const [start, step] = field.split('/');
        return _generateFieldBtw(start, fieldsMap[fieldKey].end, fieldKey, Number(step));
    }
    if (field.includes(',')) {
        return _getCommaSeparatedFields(field);
    }
    return [Number(field)];

}

function _getCommaSeparatedFields(field) {
    return field.split(',').map(Number);
}

function _getValidStartAndEnd(start, end, fieldKey) {
    let [validStart, validEnd] = [start, end];
    if (fieldKey && fieldKey in fieldsMap) {
        const fieldObj = fieldsMap[fieldKey];
        validStart = !start || start === '*' ? fieldObj.start : Number(start);
        validEnd = !end || end === '*' ? fieldObj.end : Number(end);
    }
    return [validStart, validEnd];
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
