#!/usr/bin/env node
const { DateTime } = require('luxon');

// Function to construct a full datetime from potentially partial input
function parseDateTime(input) {
    if (!input) {
        // No input, return current local datetime
        return DateTime.local();
    }

    // Check if input is just time (e.g., "16:20:00")
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(input)) {
        // Prepend today's date to the time
        const todayDate = DateTime.local().toISODate(); // YYYY-MM-DD
        input = `${todayDate}T${input}`;
    }

    // Parse the datetime assuming local timezone
    return DateTime.fromISO(input, { zone: 'local' });
}

// Function to convert local time to UTC
function localTimeToUTC(localDateTime) {
    // Convert to UTC and format
    return localDateTime.toUTC().toISO();
}

// Get input from the command line
const input = process.argv[2];

// Process the input and output the UTC time
const dateTime = parseDateTime(input);
console.log(localTimeToUTC(dateTime));

