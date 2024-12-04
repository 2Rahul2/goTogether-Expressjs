const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'rahul',
      password: 'mypass',
      database: 'rideshare'
    }
  });
  
  knex.raw('SELECT 1')
    .then(() => {
      console.log('Connection successful!');
    })
    .catch(err => {
      console.error('Connection failed:', err);
    })
    .finally(() => {
      knex.destroy();
    });
  