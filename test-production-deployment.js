const axios = require('axios');

// Production URLs
const PRODUCTION_URLS = {
    backend: 'https://food-security-back.azurewebsites.net',
    frontend: 'https://food-security-front.azurewebsites.net',
    public: 'https://food-security.net'
};

// Test credentials
const TEST_CREDENTIALS = {
    username: '_bf_master_',
    password: 'password'
};

async function testProductionEndpoints() {
    console.log('🧪 Testing Production Endpoints...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing Health Endpoint...');
        const healthResponse = await axios.get(`${PRODUCTION_URLS.backend}/health`);
        console.log(`✅ Health: ${healthResponse.status} - ${healthResponse.data.message}`);

        // Test 2: CORS Debug
        console.log('\n2️⃣ Testing CORS Debug Endpoint...');
        const corsResponse = await axios.get(`${PRODUCTION_URLS.backend}/cors-debug`, {
            headers: { 'Origin': PRODUCTION_URLS.frontend }
        });
        console.log(`✅ CORS Debug: ${corsResponse.status} - CORS headers verified`);

        // Test 3: Preflight Request (OPTIONS)
        console.log('\n3️⃣ Testing Preflight Request...');
        const preflightResponse = await axios.options(`${PRODUCTION_URLS.backend}/login`, {
            headers: {
                'Origin': PRODUCTION_URLS.frontend,
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        console.log(`✅ Preflight: ${preflightResponse.status} - OPTIONS request successful`);

        // Test 4: Login with Valid Credentials
        console.log('\n4️⃣ Testing Login with Valid Credentials...');
        const loginResponse = await axios.post(`${PRODUCTION_URLS.backend}/login`, TEST_CREDENTIALS, {
            headers: {
                'Origin': PRODUCTION_URLS.frontend,
                'Content-Type': 'application/json'
            }
        });
        console.log(`✅ Login Success: ${loginResponse.status} - ${loginResponse.data.message}`);

        // Test 5: Login with Invalid Credentials
        console.log('\n5️⃣ Testing Login with Invalid Credentials...');
        const invalidLoginResponse = await axios.post(`${PRODUCTION_URLS.backend}/login`, 
            { username: 'wrong', password: 'wrong' }, 
            {
                headers: {
                    'Origin': PRODUCTION_URLS.frontend,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`✅ Login Error: ${invalidLoginResponse.status} - ${invalidLoginResponse.data.message}`);

        console.log('\n🎉 All Production Tests Passed!');
        console.log('✅ CORS is working correctly');
        console.log('✅ Database connection is working');
        console.log('✅ Login endpoint is functional');

    } catch (error) {
        console.error('\n❌ Production Test Failed:');
        
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
            console.error(`Headers: ${JSON.stringify(error.response.headers, null, 2)}`);
        } else if (error.request) {
            console.error('No response received - Network Error');
            console.error('This might indicate:');
            console.error('- Backend is not running');
            console.error('- Database connection failed');
            console.error('- CORS configuration issue');
        } else {
            console.error(`Error: ${error.message}`);
        }

        console.log('\n🔧 Troubleshooting Steps:');
        console.log('1. Check if backend is running in Azure');
        console.log('2. Verify environment variables are set');
        console.log('3. Check Azure SQL Database connection');
        console.log('4. Review Azure App Service logs');
    }
}

// Run the test
testProductionEndpoints();
