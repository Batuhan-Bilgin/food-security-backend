const axios = require('axios');

// Test live production backend CORS
async function testLiveProduction() {
    const productionBackend = 'https://food-security-back.azurewebsites.net';
    const productionFrontends = [
        'https://food-security.net',
        'https://food-security-front.azurewebsites.net'
    ];
    
    console.log('🧪 Testing LIVE Production Backend CORS...\n');
    console.log(`Backend URL: ${productionBackend}\n`);
    
    for (const frontend of productionFrontends) {
        console.log(`🌐 Testing from: ${frontend}`);
        
        try {
            // Test 1: Health check
            console.log('1️⃣ Testing health endpoint...');
            const healthResponse = await axios.get(`${productionBackend}/health`, {
                headers: { 'Origin': frontend }
            });
            console.log('✅ Health check:', healthResponse.status);
            console.log('✅ CORS headers:', {
                'Access-Control-Allow-Origin': healthResponse.headers['access-control-allow-origin']
            });
            
        } catch (error) {
            console.log('❌ Health check failed:', error.message);
        }
        
        try {
            // Test 2: OPTIONS preflight
            console.log('2️⃣ Testing OPTIONS preflight...');
            const optionsResponse = await axios.options(`${productionBackend}/login`, {
                headers: {
                    'Origin': frontend,
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type'
                }
            });
            
            console.log('✅ OPTIONS successful:', optionsResponse.status);
            console.log('✅ CORS headers:', {
                'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
                'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods']
            });
            
        } catch (error) {
            console.log('❌ OPTIONS failed:', error.message);
            if (error.response) {
                console.log('Response status:', error.response.status);
                console.log('Response headers:', error.response.headers);
            }
        }
        
        try {
            // Test 3: POST login (should fail with 401 but include CORS headers)
            console.log('3️⃣ Testing POST login...');
            const loginResponse = await axios.post(`${productionBackend}/login`, {
                username: 'test',
                password: 'wrong'
            }, {
                headers: {
                    'Origin': frontend,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('✅ POST successful:', loginResponse.status);
            
        } catch (error) {
            if (error.response) {
                console.log('✅ POST response (expected):', error.response.status);
                console.log('✅ CORS headers:', {
                    'Access-Control-Allow-Origin': error.response.headers['access-control-allow-origin']
                });
            } else {
                console.log('❌ POST failed:', error.message);
            }
        }
        
        console.log('---\n');
    }
    
    console.log('🎯 Live production testing completed!');
    console.log('\n📋 Next Steps:');
    console.log('1. Deploy these changes to Azure');
    console.log('2. Test again with the live frontend');
    console.log('3. Check browser console for CORS errors');
}

// Run the test
testLiveProduction().catch(console.error);
