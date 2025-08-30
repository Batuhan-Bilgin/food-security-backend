// Test frontend-backend integration in production
const axios = require('axios');

console.log('🧪 Testing Frontend-Backend Production Integration...\n');

const frontendURL = 'https://food-security-front.azurewebsites.net';
const backendURL = 'https://food-security-back.azurewebsites.net';

async function testFrontendBackendIntegration() {
  try {
    console.log('1️⃣ Testing Frontend Availability...');
    const frontendResponse = await axios.get(frontendURL);
    console.log('✅ Frontend is accessible:', frontendResponse.status);
    
    console.log('\n2️⃣ Testing Backend Health...');
    try {
      const backendHealth = await axios.get(`${backendURL}/health`);
      console.log('✅ Backend health check:', backendHealth.status);
      console.log('📊 Backend data:', backendHealth.data);
    } catch (error) {
      console.log('❌ Backend health check failed:', error.response?.status || error.message);
    }
    
    console.log('\n3️⃣ Testing Backend Version...');
    try {
      const backendVersion = await axios.get(`${backendURL}/version`);
      console.log('✅ Backend version check:', backendVersion.status);
      console.log('📊 Backend version:', backendVersion.data);
    } catch (error) {
      console.log('❌ Backend version check failed:', error.response?.status || error.message);
    }
    
    console.log('\n4️⃣ Testing Login Endpoint...');
    try {
      const loginResponse = await axios.post(`${backendURL}/login`, {
        username: 'test',
        password: 'test123'
      });
      console.log('✅ Login endpoint working:', loginResponse.status);
      console.log('📊 Login response:', loginResponse.data);
    } catch (error) {
      console.log('❌ Login endpoint failed:', error.response?.status || error.message);
      if (error.response?.data) {
        console.log('📊 Error details:', error.response.data);
      }
    }
    
    console.log('\n5️⃣ Testing CORS from Frontend Origin...');
    try {
      const corsTest = await axios.post(`${backendURL}/login`, {
        username: 'test',
        password: 'test123'
      }, {
        headers: {
          'Origin': frontendURL,
          'Content-Type': 'application/json'
        }
      });
      console.log('✅ CORS test successful:', corsTest.status);
      console.log('📊 CORS headers:', corsTest.headers);
    } catch (error) {
      console.log('❌ CORS test failed:', error.response?.status || error.message);
      if (error.response?.headers) {
        console.log('📊 Response headers:', error.response.headers);
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  console.log('\n🎯 Frontend-Backend Integration Test Completed!');
  console.log('\n📋 Summary:');
  console.log('- Frontend:', frontendURL);
  console.log('- Backend:', backendURL);
  console.log('- Status: Check results above');
}

testFrontendBackendIntegration();
