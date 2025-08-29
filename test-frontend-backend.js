const axios = require('axios');

// Test frontend-backend integration
async function testIntegration() {
    const backendURL = 'http://localhost:5002';
    const frontendURL = 'http://localhost:3000';
    
    console.log('🧪 Testing Frontend-Backend Integration...\n');
    
    try {
        // Test 1: Backend health check
        console.log('1️⃣ Testing Backend Health...');
        const healthResponse = await axios.get(`${backendURL}/health`);
        console.log('✅ Backend health:', healthResponse.data);
        
    } catch (error) {
        console.log('❌ Backend health check failed:', error.message);
        return;
    }
    
    try {
        // Test 2: Test CORS with frontend origin
        console.log('\n2️⃣ Testing CORS with Frontend Origin...');
        const corsResponse = await axios.get(`${backendURL}/cors-debug`, {
            headers: {
                'Origin': frontendURL
            }
        });
        console.log('✅ CORS test successful:', corsResponse.data);
        
    } catch (error) {
        console.log('❌ CORS test failed:', error.message);
    }
    
    try {
        // Test 3: Test login with valid credentials (if available)
        console.log('\n3️⃣ Testing Login with Test Credentials...');
        const loginResponse = await axios.post(`${backendURL}/login`, {
            username: '_bf_master_',
            password: 'password'
        }, {
            headers: {
                'Origin': frontendURL,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Login successful:', loginResponse.data);
        
    } catch (error) {
        if (error.response) {
            console.log('✅ Login response (expected):', error.response.status, error.response.data);
            console.log('✅ CORS headers in login response:', {
                'Access-Control-Allow-Origin': error.response.headers['access-control-allow-origin']
            });
        } else {
            console.log('❌ Login test failed:', error.message);
        }
    }
    
    try {
        // Test 4: Test OPTIONS preflight for login
        console.log('\n4️⃣ Testing Login Preflight...');
        const optionsResponse = await axios.options(`${backendURL}/login`, {
            headers: {
                'Origin': frontendURL,
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        
        console.log('✅ Preflight successful:', optionsResponse.status);
        console.log('✅ Preflight CORS headers:', {
            'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
            'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods']
        });
        
    } catch (error) {
        console.log('❌ Preflight test failed:', error.message);
    }
    
    console.log('\n🎯 Integration testing completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Open browser and go to: http://localhost:3000');
    console.log('2. Try to login with credentials: _bf_master_ / password');
    console.log('3. Check browser console for any CORS errors');
    console.log('4. Verify that login redirects properly');
}

// Run the test
testIntegration().catch(console.error);
