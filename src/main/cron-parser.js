const { fieldsMap, fieldKeys } = require('./constants');
const expandField = require('./field-expander');

module.exports = function (cronString) {
    let outputLines = [];
    const cronFields = _extractFields(_sanitiesInput(cronString));

    if (cronFields.length !== 6) {
        return "Invalid cron string. Please provide all 6 fields.";
    }
    const expandedFields = cronFields.map((field, index) => expandField(fieldKeys[index], field));

    for (let i = 0; i < fieldKeys.length; i++) {
        const fieldName = fieldsMap[fieldKeys[i]].name;
        outputLines.push(`${fieldName.padEnd(14)}${expandedFields[i].join(' ')}`);
    }
    return outputLines;
}

function _sanitiesInput (cronString) {
    return cronString.trim();
}   

function _extractFields(cronString) {
    const cronFields = cronString.split(' ');
    return cronFields;
} 

