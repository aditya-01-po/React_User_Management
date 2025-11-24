const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

// Create the client directly here
const connStr = process.env.AzureWebJobsStorage;   // or TABLES_CONNECTION_STRING
const tableName = 'ReactJS';                           // replace with your actual table name
const client = TableClient.fromConnectionString(connStr, tableName);

app.http('DeleteData', {
  route:   'users/{email}',
  methods: ['DELETE'],
  authLevel: 'anonymous',
  handler: async (req, context) => {
    const email = req.params.email;
    context.log(`Attempting to delete user with Email=${email}`);

    try {
      // PartitionKey must match what you used when inserting
      const partitionKey = "Users";
      const rowKey = email;

      // First check if entity exists
      try {
        await client.getEntity(partitionKey, rowKey);
      } catch (err) {
        if (err.statusCode === 404) {
          return {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
            body: { error: `No user found with email ${email}` }
          };
        }
        throw err; // rethrow other errors
      }

      // Delete the entity
      await client.deleteEntity(partitionKey, rowKey);

      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { message: `User with email ${email} deleted successfully` }
      };
    } catch (err) {
      context.log.error(`Error deleting user: ${err.message}`);
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Failed to delete user' }
      };
    }
  }
});
