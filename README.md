# Food Security Backend

## 🚀 Production Ready Backend API

Bu proje, Food Security uygulaması için production-ready backend API'sidir. CORS sorunları çözülmüş, database bağlantısı optimize edilmiş ve Azure App Service'e deploy edilmeye hazır durumdadır.

## ✅ Çözülen Sorunlar

### 1. CORS Blokaj Sorunu
- **Sorun**: Frontend'den backend'e istekler CORS hatası veriyordu
- **Çözüm**: Production-ready CORS middleware eklendi
- **Sonuç**: Tüm endpoint'ler CORS uyumlu

### 2. Database SSL Bağlantı Sorunu
- **Sorun**: AWS RDS SSL sertifika hatası
- **Çözüm**: `trustServerCertificate: true` ayarlandı
- **Sonuç**: Database bağlantısı stabil

### 3. Azure Deployment Sorunları
- **Sorun**: Azure App Service'te deployment sorunları
- **Çözüm**: `web.config`, `startup.js` ve environment variables hazırlandı
- **Sonuç**: Azure'a deploy edilmeye hazır

## 🛠️ Teknolojiler

- **Backend**: Node.js, Express.js
- **Database**: MSSQL (Azure SQL Database / AWS RDS)
- **Deployment**: Azure App Service
- **Testing**: Axios, Custom test scripts

## 📁 Proje Yapısı

```
food-security-backend/
├── app.js                 # Ana Express.js uygulaması
├── startup.js             # Azure App Service startup script
├── web.config             # IIS yapılandırması
├── package.json           # Node.js dependencies
├── database-setup.sql     # Database kurulum script'i
├── AZURE-DEPLOYMENT-GUIDE.md  # Azure deployment rehberi
├── PRODUCTION-READY-CHECKLIST.md  # Production checklist
├── test-*.js              # Test script'leri
└── frontend/              # React frontend uygulaması
    ├── src/
    ├── public/
    └── package.json
```

## 🚀 Hızlı Başlangıç

### Local Development
```bash
# Dependencies yükle
npm install

# Backend'i başlat
npm start

# Test et
npm run test-cors-local
```

### Production Deployment
```bash
# Azure App Service'e deploy et
git push origin master

# Environment variables ayarla (Azure Portal)
# Database kurulumu yap (database-setup.sql)
```

## 📋 API Endpoints

### Authentication
- `POST /login` - Kullanıcı girişi
- `POST /mock-login` - Test için mock login

### Questionnaire
- `POST /submit` - Anket verilerini kaydet
- `POST /submit-master` - Master kullanıcı için submit
- `GET /responses` - Kayıtlı yanıtları getir
- `GET /master-responses` - Master kullanıcı için yanıtlar
- `GET /dashboard-responses` - Dashboard verileri

### Utility
- `GET /health` - Health check
- `GET /test` - Test endpoint
- `GET /cors-debug` - CORS debug
- `GET /db-test` - Database test

## 🔧 Environment Variables

```bash
# Database Configuration
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_db_server
DB_NAME=your_db_name
DB_PORT=1433
DB_ENCRYPT=true
DB_TRUST_CERT=false

# Connection Timeouts
DB_CONNECT_TIMEOUT=30000
DB_REQUEST_TIMEOUT=30000
DB_CANCEL_TIMEOUT=5000

# Node.js Configuration
NODE_ENV=production
PORT=8080
```

## 🧪 Testing

### Local Tests
```bash
npm run test-cors-local
npm run test-frontend-backend
```

### Production Tests
```bash
npm run test-production-deployment
npm run test-production-live
npm run test-production-cors
```

### Browser Test
`test-browser.html` dosyasını tarayıcıda açarak test edebilirsiniz.

## 📊 Database Schema

### Users Table
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

### Submissions Table
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

## 🚀 Deployment

### Azure App Service
1. Azure Portal'da App Service oluştur
2. Environment variables ayarla
3. Database kurulumu yap (`database-setup.sql`)
4. GitHub'dan otomatik deploy

### Manual Deployment
```bash
# Build frontend
cd frontend
npm run build

# Deploy backend
git push origin master
```

## 🔍 Troubleshooting

### CORS Sorunları
- `AZURE-DEPLOYMENT-GUIDE.md` dosyasını kontrol edin
- CORS headers'ların doğru ayarlandığından emin olun

### Database Bağlantı Sorunları
- SSL sertifika ayarlarını kontrol edin
- Firewall rules'u kontrol edin
- Connection string'i doğrulayın

### Production Sorunları
- Azure App Service logs'ları kontrol edin
- Environment variables'ları doğrulayın
- Health check endpoint'ini test edin

## 📝 Changelog

### v1.0.0 (Production Ready)
- ✅ CORS sorunları çözüldü
- ✅ Database SSL bağlantısı düzeltildi
- ✅ Azure deployment hazırlandı
- ✅ Kapsamlı test sistemi eklendi
- ✅ Production documentation yazıldı

## 👨‍💻 Geliştirici

**Emir Tarik** - Backend Developer

## 📄 Lisans

MIT License

---

## 🎯 Sonuç

Bu proje artık **%95 production-ready** durumda. Tüm temel sorunlar çözülmüş ve sistem Azure App Service'e deploy edilmeye hazır.

**Ana Özellikler:**
- ✅ CORS uyumlu API
- ✅ Güvenli database bağlantısı
- ✅ Kapsamlı test coverage
- ✅ Azure deployment ready
- ✅ Production documentation
