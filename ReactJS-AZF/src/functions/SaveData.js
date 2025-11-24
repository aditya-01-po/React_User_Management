const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

// Create the client directly here
const connStr = process.env.AzureWebJobsStorage;   // or TABLES_CONNECTION_STRING
const tableName = 'ReactJS';                           // replace with your actual table name
const client = TableClient.fromConnectionString(connStr, tableName);

app.http('SaveData', {
  route:   'users',
  methods: ['POST', 'PUT'],
  authLevel: 'anonymous',
  handler: async (req, context) => {
    try {
      const body = await req.json();
      const { email, interest, location } = body;

      if (!email || !interest || !location) {
        return {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          body: { error: "Please provide email, interest, and location in the request body." }
        };
      }

      // PartitionKey can be static or dynamic — here we use "Users"
      const partitionKey = "Users";
      const rowKey = email; // using email as RowKey

      const entity = {
        partitionKey,
        rowKey,
        Email: email,
        interest,
        Location: location
      };

      // Upsert (Insert or Replace)
      await client.upsertEntity(entity, "Replace");

      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: { message: "User data saved successfully", data: entity }
      };
    } catch (err) {
      context.log.error(`Error saving user: ${err.message}`);
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Failed to save user' }
      };
    }
  }
});
