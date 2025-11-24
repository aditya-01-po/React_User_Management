const { app, HttpMethod } = require('@azure/functions');

app.setup({ enableHttpStream: true });

module.exports = app;