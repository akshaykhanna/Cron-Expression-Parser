# Cron-Expression-Parser
Command line application or script which parses a cron string and expands each field to show the times at which it will run. 

## Setup
 - Clone repo
 - Install node (>= 14) if not already present.
 - `npm install` in repo folder to install node dependencies .

## Steps to run
Run `npm run exec` followed by `cron_string` in quotes in node terminal to print the parse cron string as output.
> npm run exec '*/15 0 1,15 * 1-5 /usr/bin/find'

## Run tests
> npm run test

## What is a valid cron string ?
A valid Cron string must adhere to specific rules and format to be considered valid. Here are the typical validations for a valid Cron string:

Number of Fields: A valid Cron string should consist of six fields separated by spaces: minute, hour, day of the month, month, day of the week, and the command. If there are not exactly six fields, it's invalid.

Field Ranges: Each field should contain valid values within specified ranges:

Minute (0 - 59)
Hour (0 - 23)
Day of the Month (1 - 31)
Month (1 - 12)
Day of the Week (0 - 6)
Field Separators: Fields should be separated by spaces. Some Cron parsers also accept tabs or a combination of spaces and tabs.

Asterisk (*) Usage: An asterisk (*) is a wildcard character used to represent all possible values within a field. For example, * in the minute field means "every minute." However, an asterisk cannot be used in combination with other values in the same field. For instance, 1-5, * in the hour field would be invalid.

Ranges: Ranges of values can be specified using a hyphen (-). For example, 1-5 in the hour field means "from 1 to 5." Ranges should have valid start and end values.

Lists: Comma-separated lists of values are allowed within a field. For example, 1,15 in the day of the month field means "on the 1st and 15th." Lists should contain valid individual values.

Steps (/): A step value can be used to skip values within a range. For example, */15 in the minute field means "every 15 minutes." Steps should have a valid range and step value.

Command Field: The last field should contain the command or script to be executed. It may need to be a valid path to an executable script or command.

Whitespace: Leading or trailing whitespace in the Cron string should be trimmed.

Note that the specific rules and requirements for valid Cron strings may vary depending on the Cron implementation or library being used. It's essential to refer to the documentation of the Cron system or library you are working with to understand the precise validation rules it enforces.
