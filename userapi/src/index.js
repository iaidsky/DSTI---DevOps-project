const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRouter = require('./routes/user');
const db = require('./dbClient');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Routes
app.use('/user', userRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'User API - DevOps Final Project',
    endpoints: {
      health: '/health',
      createUser: 'POST /user',
      getUser: 'GET /user/:username',
      updateUser: 'PUT /user/:username',
      deleteUser: 'DELETE /user/:username'
    }
  });
});

// Start server
const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    db.quit();
    console.log('Server closed');
  });
});

module.exports = app;
