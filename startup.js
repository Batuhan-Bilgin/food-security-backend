// Azure App Service startup script with version checking
const express = require('express');
const path = require('path');

// Version check for Azure compatibility
console.log('Node.js version:', process.version);
console.log('NODE_ENV:', process.env.NODE_ENV || 'production');
console.log('PORT:', process.env.PORT || 'not set');

// Create Express app
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for Azure
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://food-security.net',
    'https://food-security-front.azurewebsites.net',
    'http://localhost:3000',
    'http://localhost:3001'
  ];
  
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Simple HTML test endpoint
app.get('/html-test', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Azure Test</title>
    </head>
    <body>
      <h1>Azure App Service Test</h1>
      <p>Status: Working!</p>
      <p>Node.js Version: ${process.version}</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
      <p>Environment: ${process.env.NODE_ENV || 'production'}</p>
    </body>
    </html>
  `);
});

// Health check endpoint with version info
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    nodeVersion: process.version,
    port: process.env.PORT || 'not set'
  });
});

// Version info endpoint
app.get('/version', (req, res) => {
  res.json({ 
    nodeVersion: process.version,
    npmVersion: process.env.npm_config_user_agent || 'unknown',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString()
  });
});

// Minimal test endpoint
app.get('/minimal-test', (req, res) => {
  res.json({ 
    message: 'Minimal test endpoint working',
    timestamp: new Date().toISOString(),
    status: 'success',
    nodeVersion: process.version
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Basic test endpoint working',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

// Login endpoint (simplified for testing)
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple response for testing
    res.json({ 
      message: 'Login endpoint working',
      username: username,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Login failed', 
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    nodeVersion: process.version
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found',
    path: req.originalUrl,
    nodeVersion: process.version
  });
});

// Start server
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Azure startup server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`Node.js version: ${process.version}`);
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`Version info: http://localhost:${port}/version`);
});

module.exports = app;
