const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Contacts API',
        version: '1.0.0',
        description: 'API documentation for CSE 341 contacts application',
      },
    },
    // Path to the API docs
    apis: ['./src/routes/*.js'], // Replace with the path to your route files
  };
  
  module.exports = swaggerOptions;
  