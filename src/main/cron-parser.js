const { fieldsMap, fieldKeys } = require('./constants');
const expandField = require('./field-expander');

module.exports = function (cronString) {
    let outputString = '';
    const cronFields = _extractFields(cronString);

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

function _extractFields(cronString) {
    const cronFields = cronString.split(' ');
    return cronFields;
}

