# Azure App Service Deployment Guide

## 🚀 Production Deployment Adımları

### 1. Azure App Service Environment Variables

Azure App Service'te aşağıdaki environment variables'ları ayarlayın:

#### Database Configuration
```
DB_USER=your_azure_db_user
DB_PASSWORD=your_azure_db_password
DB_SERVER=your_azure_server.database.windows.net
DB_NAME=your_azure_database_name
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_CERT=false
```

#### Connection Timeouts
```
DB_CONNECT_TIMEOUT=30000
DB_REQUEST_TIMEOUT=30000
DB_CANCEL_TIMEOUT=5000
```

#### Node.js Configuration
```
NODE_ENV=production
PORT=8080
```

### 2. Azure SQL Database Setup

1. **Azure SQL Database oluşturun**
2. **Firewall rules ayarlayın** (Azure App Service IP'lerini ekleyin)
3. **Connection string'i alın**

### 3. Database Tables

Aşağıdaki SQL script'lerini çalıştırın:

#### Users Table
```sql
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);
```

#### Submissions Table
```sql
CREATE TABLE Submissions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    country VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    year VARCHAR(4) NOT NULL,
    month VARCHAR(20) NOT NULL,
    responses NVARCHAR(MAX),
    comments NVARCHAR(MAX),
    questionComments NVARCHAR(MAX),
    performanceScore FLOAT,
    financingNeed BIGINT,
    financingMobilized FLOAT,
    actionPlanPerQuestion NVARCHAR(MAX),
    savedActionPlans NVARCHAR(MAX),
    submitted BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
```

#### Test Data
```sql
INSERT INTO Users (username, password, country, role) VALUES
('_bf_master_', 'password', 'Test Country', 'master'),
('section1_user', 'password', 'Test Country', 'section1'),
('section2_user', 'password', 'Test Country', 'section2'),
('section3_user', 'password', 'Test Country', 'section3'),
('section4_user', 'password', 'Test Country', 'section4');
```

### 4. Azure App Service Configuration

#### Application Settings
- **Node.js version**: 18.x
- **Startup command**: `node startup.js`
- **Always On**: Enabled
- **HTTPS Only**: Enabled

#### CORS Settings
Azure Portal > App Service > API > CORS
```
Allowed Origins:
- https://food-security.net
- https://food-security-front.azurewebsites.net
- http://localhost:3000
- http://localhost:3001
```

### 5. Deployment Steps

1. **GitHub'a push yapın**
2. **Azure App Service otomatik deploy edecek**
3. **Environment variables'ları ayarlayın**
4. **Database'i oluşturun**
5. **Test edin**

### 6. Testing

#### Health Check
```bash
curl https://your-app-service.azurewebsites.net/health
```

#### CORS Test
```bash
curl -X OPTIONS \
  -H "Origin: https://food-security.net" \
  -H "Access-Control-Request-Method: POST" \
  https://your-app-service.azurewebsites.net/login
```

#### Login Test
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: https://food-security.net" \
  -d '{"username":"_bf_master_","password":"password"}' \
  https://your-app-service.azurewebsites.net/login
```

### 7. Troubleshooting

#### Common Issues
1. **Database Connection**: SSL sertifika sorunları
2. **CORS Errors**: Origin ayarları
3. **Environment Variables**: Yanlış değerler
4. **Node.js Version**: Uyumsuzluk

#### Logs
Azure Portal > App Service > Logs > Log stream

### 8. Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Database firewall configured
- [ ] CORS properly configured
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] SQL injection protection
- [ ] Rate limiting (optional)

### 9. Performance Optimization

- [ ] Database connection pooling
- [ ] Response caching
- [ ] Static file serving
- [ ] Compression enabled
- [ ] CDN integration (optional)

## ✅ Deployment Checklist

- [ ] Backend deployed to Azure
- [ ] Database created and configured
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Health check working
- [ ] Login endpoint working
- [ ] Frontend deployed
- [ ] Integration tests passing
- [ ] Production monitoring enabled
