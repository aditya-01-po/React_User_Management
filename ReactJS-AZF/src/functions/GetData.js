const { app } = require('@azure/functions');
const { TableClient } = require('@azure/data-tables');

// Create the client directly here
const connStr = process.env.AzureWebJobsStorage;   // or TABLES_CONNECTION_STRING
const tableName = 'ReactJS';                       // replace with your actual table name
const client = TableClient.fromConnectionString(connStr, tableName);

app.http('getUserByEmail', {
  route:   'users/{email}',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (req, context) => {
    const email = req.params.email;
    context.log(`Looking for user with Email=${email}`);

    try {
      // Query entities where Email matches (case-sensitive!)
      const filter = `Email eq '${email}'`;
      const entities = client.listEntities({ queryOptions: { filter } });

      let user = null;
      for await (const e of entities) {
        // Map the entity into a clean object
        user = {
          id:       e.rowKey,
          email:    e.Email,
          interest: e.interest,   // adjust case to match your table
          location: e.Location    // adjust case to match your table
        };
        break; // stop after first match
      }

      if (!user) {
        return {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
          body: { error: `No user found with email ${email}` }
        };
      }

      // Return the user object
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
    } catch (err) {
      context.log.error(`Error fetching user: ${err.message}`);
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'Failed to fetch user' }
      };
    }
  }
});
