const { TableClient } = require('@azure/data-tables');
const app = require('../../index.js'); 

app.http('GetAlldata', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log('Fetching users from Table Storage');

    // Connect to your table
    const connStr = process.env.AzureWebJobsStorage; // or TABLES_CONNECTION_STRING if you prefer
    const tableName = 'ReactJS'; // replace with your actual table name
    const client = TableClient.fromConnectionString(connStr, tableName);

    let users = [];
    try {
      // Iterate through all entities in the table
      for await (const entity of client.listEntities()) {
        users.push({
          id: entity.RowKey,
          email: entity.Email,
          interest: entity.interest,
          location: entity.Location
        });
      }
    } catch (err) {
      context.log.error('Error querying table:', err);
      return {
        status: 500,
        body: { error: 'Failed to query users.' }
      };
    }

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users)
    };
  }
});
