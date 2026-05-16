# Yellow Book Telephone Directory System

A full-stack business telephone directory built for university presentation. Manage business listings, categories, search, and a modern dashboard.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite, Tailwind CSS, Axios, React Router DOM, React Hot Toast |
| Backend | ASP.NET Core Web API (.NET 10), Entity Framework Core, SQL Server |
| Tools | Swagger, Postman |

> **Note:** This machine scaffolded with **.NET 10** (compatible with .NET 8 patterns). To target .NET 8 explicitly, install the [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) and change `TargetFramework` in `YellowBook.API.csproj`.

## Project Structure

```
YellowBookTelephoneDirectory/
├── backend/
│   └── YellowBook.API/
│       ├── Controllers/       # REST API endpoints
│       ├── Data/              # DbContext
│       ├── DTOs/              # Request/response models
│       ├── Migrations/        # EF Core migrations
│       ├── Models/            # Entity models
│       ├── Repositories/      # Repository pattern
│       └── Services/          # Business logic
├── frontend/
│   └── src/
│       ├── api/               # Axios services
│       ├── components/        # Reusable UI components
│       ├── pages/               # Route pages
│       └── utils/               # Validation helpers
├── database/
│   └── YellowBookDB.sql       # Manual SQL setup script
├── postman/
│   └── YellowBook.postman_collection.json
└── README.md
```

## Features

- Add, view, update, delete businesses
- Search businesses by name, phone, email, address, category
- Category management
- Dashboard with statistics
- Form validation (frontend + backend)
- Swagger API documentation
- Responsive professional UI

## Database Design

**Database name:** `YellowBookDB`

### Categories
| Column | Type |
|--------|------|
| Id | int (PK) |
| Name | nvarchar(100), unique |

### Businesses
| Column | Type |
|--------|------|
| Id | int (PK) |
| Name | nvarchar(150) |
| Phone | nvarchar(30) |
| Email | nvarchar(150) |
| Address | nvarchar(300) |
| Description | nvarchar(1000), nullable |
| CategoryId | int (FK → Categories) |
| CreatedAt | datetime2 |

**Relationship:** One Category → Many Businesses

---

## Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [.NET SDK](https://dotnet.microsoft.com/download) (8 or 10)
- [SQL Server](https://www.microsoft.com/sql-server) or SQL Server LocalDB
- [Postman](https://www.postman.com/) (optional)

---

## Backend Setup

### 1. Configure connection string

Edit `backend/YellowBook.API/appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=YellowBookDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
}
```

For full SQL Server Express:

```json
"DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=YellowBookDB;Trusted_Connection=True;TrustServerCertificate=True;"
```

### 2. Install packages (already in .csproj)

```bash
cd backend/YellowBook.API
dotnet restore
```

Packages included:
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Microsoft.EntityFrameworkCore.Design
- Swashbuckle.AspNetCore

### 3. Entity Framework migrations

```powershell
cd backend/YellowBook.API
dotnet tool install --global dotnet-ef
dotnet ef migrations add InitialCreate
dotnet ef database update
```

**Alternative:** Run `database/YellowBookDB.sql` in SQL Server Management Studio.

### 4. Run the API

```bash
cd backend/YellowBook.API
dotnet run
```

- API: http://localhost:5261
- Swagger UI: http://localhost:5261 (root in Development)

---

## Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:5261/api
```

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:5173

### 4. Production build

```bash
npm run build
npm run preview
```

---

## API Endpoints

### Businesses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/businesses` | List all businesses |
| GET | `/api/businesses/{id}` | Get business by ID |
| GET | `/api/businesses/search?name=hotel` | Search businesses |
| POST | `/api/businesses` | Create business |
| PUT | `/api/businesses/{id}` | Update business |
| DELETE | `/api/businesses/{id}` | Delete business |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List categories |
| POST | `/api/categories` | Create category |

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Dashboard statistics |

---

## Sample JSON Requests

### POST /api/businesses

```json
{
  "name": "City Hotel",
  "phone": "+1-555-9999",
  "email": "stay@cityhotel.com",
  "address": "88 Park Avenue",
  "description": "Budget friendly hotel",
  "categoryId": 2
}
```

### PUT /api/businesses/1

```json
{
  "name": "City Hotel Updated",
  "phone": "+1-555-9999",
  "email": "info@cityhotel.com",
  "address": "88 Park Avenue, Suite 10",
  "description": "Renovated rooms",
  "categoryId": 2
}
```

### POST /api/categories

```json
{
  "name": "Technology"
}
```

---

## Validation Rules

| Field | Rules |
|-------|-------|
| Name | Required, 2–150 characters |
| Phone | Required, valid phone format |
| Email | Required, valid email format |
| Address | Required, min 5 characters |
| CategoryId | Required, must exist |

Validation errors return **400 Bad Request** with detailed messages.

---

## Frontend Routes

| Route | Page |
|-------|------|
| `/` | Dashboard |
| `/businesses` | Business List |
| `/add-business` | Add Business |
| `/edit-business/:id` | Edit Business |
| `/search` | Search Businesses |
| `/categories` | Categories |
| `*` | 404 Not Found |

---

## Postman Testing

1. Import `postman/YellowBook.postman_collection.json`
2. Set variable `baseUrl` = `http://localhost:5261/api`
3. Run requests for GET, POST, PUT, DELETE

---

## Architecture Highlights

- **Repository Pattern** — data access abstraction
- **Service Layer** — business logic separated from controllers
- **DTOs** — API contracts decoupled from entities
- **Dependency Injection** — configured in `Program.cs`
- **Async/Await** — throughout backend
- **CORS** — enabled for React dev server
- **Clean folder structure** — ready for presentation

---

## Presentation Demo Flow

1. Start SQL Server and run migrations
2. Start backend (`dotnet run`) → show Swagger
3. Start frontend (`npm run dev`)
4. Demo Dashboard statistics
5. Add a new business with validation
6. Search for a business
7. Edit and delete a listing
8. Manage categories
9. Show Postman API calls

---

## License

Educational / University Project
