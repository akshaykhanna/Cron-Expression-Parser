function expandField(field) {
    const expandedField = [];
    const parts = field.split(',');

    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) {
                expandedField.push(i);
            }
        } else if (part.includes('/')) {
            const [start, step] = part.split('/').map(Number);
            for (let i = start; i < 60; i += step) {
                expandedField.push(i);
            }
        } else {
            expandedField.push(Number(part));
        }
    }

    return Array.from(new Set(expandedField)).sort((a, b) => a - b);
}

function parseCronString(cronString) {
    const cronFields = cronString.split(' ');

    if (cronFields.length !== 6) {
        return "Invalid cron string. Please provide all 6 fields.";
    }

    const fieldNames = ['minute', 'hour', 'day of month', 'month', 'day of week', 'command'];
    const expandedFields = cronFields.map(expandField);

    for (let i = 0; i < fieldNames.length; i++) {
        console.log(`${fieldNames[i].padEnd(14)}${expandedFields[i].join(' ')}`);
    }
}

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.log("Usage: node your_program.js 'cron_string'");
    process.exit(1);
}

const cronString = args[0];
parseCronString(cronString);
