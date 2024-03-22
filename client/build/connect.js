const { Pool } = require('pg');

// Create pool with creds
const pool = new Pool({
  user: 'uale0h3jh7ojt6',
  host: 'cc3engiv0mo271.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
  database: 'd3hn81upsdt7ta',
  password: 'p3abe9db54f09a88279e1f5da77add778ddd27e4285f6981d37d5ac9bc64229ed',
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Note: Setting this to false can pose security risks in production.
  }
  
});


// Connect to the database
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connection to database successful!');
  
});
