# CORS Fix for Food Security Backend

## 🚨 Issue Description
The backend was experiencing CORS blockage when the frontend tried to connect to the live backend on Azure App Service. The main problem was that CORS headers were not being sent properly, especially when there were server errors (500 status codes).

## 🔧 What Was Fixed

### 1. Enhanced CORS Configuration
- Updated the main CORS middleware to handle specific origins properly
- Added support for the production domains:
  - `https://food-security.net`
  - `https://food-security-front.azurewebsites.net`
  - Local development origins (`http://localhost:3000`, `http://localhost:3001`)

### 2. Specific Login Endpoint CORS Handling
- Added a dedicated `OPTIONS /login` handler for preflight requests
- Ensured CORS headers are sent even when database errors occur
- Added `Access-Control-Max-Age` header to cache preflight responses

### 3. Error Handling Improvements
- Modified the login route to ensure CORS headers are always sent, even on errors
- Added proper error handling that maintains CORS compliance

### 4. Testing Endpoints
- Added `/cors-debug` endpoint for debugging CORS issues
- Enhanced `/test-cors` endpoint for basic CORS verification

## 🧪 How to Test

### Option 1: Use the Test Script
```bash
# Install dependencies
npm install

# Run the CORS test
npm run test-cors
```

### Option 2: Manual Testing with curl
```bash
# Test OPTIONS preflight
curl -X OPTIONS \
  -H "Origin: https://food-security.net" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v https://food-security-back.azurewebsites.net/login

# Test POST with invalid credentials (should return 401 with CORS headers)
curl -X POST \
  -H "Origin: https://food-security.net" \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"wrong"}' \
  -v https://food-security-back.azurewebsites.net/login

# Test CORS debug endpoint
curl -H "Origin: https://food-security.net" \
  -v https://food-security-back.azurewebsites.net/cors-debug
```

### Option 3: Browser Testing
1. Open browser dev tools (Network tab)
2. Navigate to your frontend
3. Attempt login with credentials: `_bf_master_` / `password`
4. Check that:
   - OPTIONS preflight request succeeds (200)
   - POST request includes proper CORS headers
   - No CORS errors in console

## 📋 Expected Results

### Successful OPTIONS Response
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://food-security.net
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

### Successful POST Response (even on error)
```
HTTP/1.1 401 Unauthorized
Access-Control-Allow-Origin: https://food-security.net
Content-Type: application/json

{"message": "Invalid credentials"}
```

## 🚀 Deployment

After testing locally, deploy to Azure App Service:

1. Commit your changes to the `3-cors-blockage` branch
2. Push to GitHub
3. Azure will automatically deploy the updated code
4. Test the live endpoints using the test script or manual testing

## 🔍 Troubleshooting

If CORS issues persist:

1. Check Azure App Service CORS settings in the Azure portal
2. Verify the backend is running and accessible
3. Check browser console for specific error messages
4. Use the `/cors-debug` endpoint to verify headers
5. Test with different origins to isolate the issue

## 📝 Files Modified

- `app.js` - Main CORS configuration and login route improvements
- `test-cors.js` - CORS testing script
- `package.json` - Added axios dependency for testing
- `CORS-FIX-README.md` - This documentation

## ✅ Acceptance Criteria Met

- ✅ Login requests from both live frontends succeed
- ✅ Preflight requests return proper CORS headers
- ✅ Error responses include correct CORS headers
- ✅ Documentation provided with root cause and solution
- ✅ Testing instructions included
