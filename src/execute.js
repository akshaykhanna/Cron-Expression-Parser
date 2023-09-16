const parseCronString = require('./main/cron-parser');

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.log("Usage: node execute.js 'cron_string'");
    process.exit(1);
}

const cronString = args[0];
console.log(parseCronString(cronString));