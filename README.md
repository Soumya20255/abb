# Admin Customer Portal

A Node.js application with admin and customer portals for managing products and categories.

## Features

### Admin Portal
- Dashboard with statistics
- Category Management (CRUD with soft delete)
- Product Management (CRUD with image upload, price, and soft delete)
- Flash messages for user feedback
- Beautiful SB Admin 2 theme with DataTables
- Real-time image preview
- Form validation with Joi

### Customer Portal
- Homepage with all products
- Filter by category
- Search by keyword (name/description)
- Product detail page with price
- Responsive design

## Technologies Used
- Node.js & Express
- MongoDB & Mongoose
- EJS templating engine
- Multer for file uploads
- Joi for validation
- Express Session & Connect Flash
- Bootstrap 4 & SB Admin 2 theme
- Font Awesome icons (CDN)
- DataTables for data management

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (copy from `.env.example`)
4. Configure MongoDB connection in `.env`
5. Start the application:
   ```bash
   npm run dev
   ```
6. Open browser at `http://localhost:3000`

## Environment Variables
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
SESSION_SECRET=your_session_secret
```

## Project Structure
- `src/` - Source code
  - `models/` - Database models (Category, Product)
  - `controllers/` - Business logic (admin & customer)
  - `routes/` - Route definitions
  - `middlewares/` - Custom middleware (multer, validators)
  - `views/` - EJS templates
  - `config/` - Configuration files
  - `services/` - Utility services
- `public/` - Static files (CSS, JS, images)
- `uploads/` - Uploaded product images

## Routes
- `/` - Customer homepage
- `/product/:slug` - Product detail page
- `/admin` - Admin dashboard
- `/admin/categories` - Category management
- `/admin/products` - Product management

## Product Features
- ✅ Name (auto-generates slug)
- ✅ Category (select dropdown)
- ✅ Description (textarea)
- ✅ Price (USD with validation)
- ✅ Image upload (with preview)
- ✅ Soft delete functionality

## Category Features
- ✅ Name (auto-generates slug)
- ✅ Soft delete functionality
- ✅ Product association

## UI Enhancements
- Professional SB Admin 2 dashboard
- DataTables with search, sort, and pagination
- Font Awesome icons throughout
- Responsive sidebar navigation
- Animated cards and buttons
- Image preview on upload
- Beautiful gradient backgrounds
- Empty state illustrations

## Database Schema

### Product
```javascript
{
  name: String (required),
  slug: String (auto-generated),
  category: ObjectId (ref: Category),
  description: String,
  price: Number (min: 0),
  image: String,
  isDeleted: Boolean,
  timestamps: true
}
```

### Category
```javascript
{
  name: String (required, unique),
  slug: String (auto-generated),
  isDeleted: Boolean,
  timestamps: true
}
```

## Notes
- All prices are in USD
- Images are stored in `/uploads` directory
- Soft delete preserves data integrity
- Form validation on both client and server side
- Flash messages for user feedback
- Session-based state management
