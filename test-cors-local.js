const axios = require('axios');

// Test CORS configuration locally
async function testCORS() {
    const baseURL = 'http://localhost:5002';
    
    console.log('🧪 Testing CORS configuration locally...\n');
    
    try {
        // Test 1: OPTIONS preflight request to /login
        console.log('1️⃣ Testing OPTIONS preflight to /login...');
        const optionsResponse = await axios.options(`${baseURL}/login`, {
            headers: {
                'Origin': 'https://food-security.net',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        
        console.log('✅ OPTIONS response status:', optionsResponse.status);
        console.log('✅ CORS headers:', {
            'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
            'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods'],
            'Access-Control-Allow-Headers': optionsResponse.headers['access-control-allow-headers']
        });
        
    } catch (error) {
        console.log('❌ OPTIONS test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    }
    
    try {
        // Test 2: POST request to /login with invalid credentials
        console.log('\n2️⃣ Testing POST to /login with invalid credentials...');
        const loginResponse = await axios.post(`${baseURL}/login`, {
            username: 'test',
            password: 'wrong'
        }, {
            headers: {
                'Origin': 'https://food-security.net',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Login response status:', loginResponse.status);
        console.log('✅ CORS headers:', {
            'Access-Control-Allow-Origin': loginResponse.headers['access-control-allow-origin']
        });
        
    } catch (error) {
        if (error.response) {
            console.log('✅ Expected error response status:', error.response.status);
            console.log('✅ CORS headers in error response:', {
                'Access-Control-Allow-Origin': error.response.headers['access-control-allow-origin']
            });
        } else {
            console.log('❌ Network error:', error.message);
        }
    }
    
    try {
        // Test 3: Test CORS debug endpoint
        console.log('\n3️⃣ Testing CORS debug endpoint...');
        const debugResponse = await axios.get(`${baseURL}/cors-debug`, {
            headers: {
                'Origin': 'https://food-security.net'
            }
        });
        
        console.log('✅ Debug endpoint status:', debugResponse.status);
        console.log('✅ Debug response:', debugResponse.data);
        
    } catch (error) {
        console.log('❌ Debug endpoint test failed:', error.message);
        if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
        }
    }
    
    try {
        // Test 4: Test health endpoint
        console.log('\n4️⃣ Testing health endpoint...');
        const healthResponse = await axios.get(`${baseURL}/health`, {
            headers: {
                'Origin': 'https://food-security.net'
            }
        });
        
        console.log('✅ Health endpoint status:', healthResponse.status);
        console.log('✅ Health response:', healthResponse.data);
        
    } catch (error) {
        console.log('❌ Health endpoint test failed:', error.message);
    }
    
    console.log('\n🎯 Local CORS testing completed!');
}

// Run the test
testCORS().catch(console.error);
