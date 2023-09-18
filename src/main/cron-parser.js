const { fieldsMap, fieldKeys, PAD_LENGTH, EMPTY_SPACE, NO_OF_CRON_FIELDS } = require('./constants');
const expandField = require('./field-expander');

module.exports = function (cronString) {
    const cronFields = _extractFields(_sanitiesInput(cronString));

    if (cronFields.length !== NO_OF_CRON_FIELDS) {
        return `Invalid cron string. Please provide all ${NO_OF_CRON_FIELDS} fields.`;
    }
    const expandedFields = cronFields.map((field, index) => expandField(fieldKeys[index], field));

    return _generateOutputLines(expandedFields);
}

function _sanitiesInput(cronString) {
    return cronString.trim();
}

function _extractFields(cronString) {
    const cronFields = cronString.split(' ');
    return cronFields;
}

function _generateOutputLines(expandedFields) {
    let outputLines = [];
    for (let i = 0; i < fieldKeys.length; i++) {
        const fieldName = fieldsMap[fieldKeys[i]].name;
        outputLines.push(`${fieldName.padEnd(PAD_LENGTH)}${expandedFields[i].join(EMPTY_SPACE)}`);
    }
    return outputLines;
}


