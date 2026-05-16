-- Yellow Book Telephone Directory - Database Setup Script
-- Database: YellowBookDB

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'YellowBookDB')
BEGIN
    CREATE DATABASE YellowBookDB;
END
GO

USE YellowBookDB;
GO

IF OBJECT_ID(N'dbo.Businesses', N'U') IS NOT NULL
    ALTER TABLE dbo.Businesses DROP CONSTRAINT FK_Businesses_Categories_CategoryId;
GO

IF OBJECT_ID(N'dbo.Businesses', N'U') IS NOT NULL DROP TABLE dbo.Businesses;
IF OBJECT_ID(N'dbo.Categories', N'U') IS NOT NULL DROP TABLE dbo.Categories;
GO

CREATE TABLE dbo.Categories (
    Id   INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL
);
GO

CREATE UNIQUE INDEX IX_Categories_Name ON dbo.Categories (Name);
GO

CREATE TABLE dbo.Users (
    Id           INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Username     NVARCHAR(50) NOT NULL,
    PasswordHash NVARCHAR(200) NOT NULL,
    CreatedAt    DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);
GO

CREATE UNIQUE INDEX IX_Users_Username ON dbo.Users (Username);
GO

CREATE TABLE dbo.Businesses (
    Id          INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Name        NVARCHAR(150) NOT NULL,
    Phone       NVARCHAR(30) NOT NULL,
    Email       NVARCHAR(150) NOT NULL,
    Address     NVARCHAR(300) NOT NULL,
    Description NVARCHAR(1000) NULL,
    CategoryId  INT NOT NULL,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Businesses_Categories_CategoryId
        FOREIGN KEY (CategoryId) REFERENCES dbo.Categories(Id)
);
GO

SET IDENTITY_INSERT dbo.Categories ON;
INSERT INTO dbo.Categories (Id, Name) VALUES
(1, N'Restaurants'),
(2, N'Hotels'),
(3, N'Healthcare'),
(4, N'Retail'),
(5, N'Services');
SET IDENTITY_INSERT dbo.Categories OFF;
GO

SET IDENTITY_INSERT dbo.Businesses ON;
INSERT INTO dbo.Businesses (Id, Name, Phone, Email, Address, Description, CategoryId, CreatedAt) VALUES
(1, N'Grand Plaza Hotel', N'+1-555-0101', N'info@grandplaza.com', N'100 Main Street, Downtown', N'Luxury hotel with conference facilities.', 2, '2025-01-15T10:00:00'),
(2, N'Sunrise Medical Center', N'+1-555-0202', N'contact@sunrisemed.com', N'250 Health Avenue', N'Full-service medical clinic.', 3, '2025-02-20T14:30:00'),
(3, N'Golden Fork Restaurant', N'+1-555-0303', N'hello@goldenfork.com', N'42 Culinary Lane', N'Fine dining and catering.', 1, '2025-03-10T18:00:00');
SET IDENTITY_INSERT dbo.Businesses OFF;
GO

PRINT 'YellowBookDB setup completed successfully.';
GO
