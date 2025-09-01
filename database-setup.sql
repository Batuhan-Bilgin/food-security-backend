-- Food Security Backend Database Setup
-- Azure SQL Database / SQL Server

-- Create Users table
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    country VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);

-- Create Submissions table
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

-- Create indexes for better performance
CREATE INDEX IX_Submissions_Country_Year_Month ON Submissions(country, year, month);
CREATE INDEX IX_Submissions_Role ON Submissions(role);
CREATE INDEX IX_Users_Username ON Users(username);

-- Insert test data
INSERT INTO Users (username, password, country, role) VALUES
('_bf_master_', 'password', 'Test Country', 'master'),
('section1_user', 'password', 'Test Country', 'section1'),
('section2_user', 'password', 'Test Country', 'section2'),
('section3_user', 'password', 'Test Country', 'section3'),
('section4_user', 'password', 'Test Country', 'section4');

-- Insert sample submission data
INSERT INTO Submissions (country, role, year, month, responses, comments, submitted) VALUES
('Test Country', 'section1', '2024', 'November', '{"q1": 3, "q2": 4}', 'Sample comments', 1),
('Test Country', 'section2', '2024', 'November', '{"q3": 2, "q4": 5}', 'Sample comments', 1);

-- Verify data
SELECT * FROM Users;
SELECT * FROM Submissions;
