# Blog Management System - Setup Instructions

## Admin Access
- **URL**: `http://localhost:3000/admin/login`
- **Password**: `gyanrichadmin@123`

## Features Implemented

### 1. Admin Authentication
- Secure login page at `/admin/login`
- Password-protected access to admin panel
- Session management with cookies
- Logout functionality

### 2. Blog Management (Admin)
- Create new blog posts with a predefined format
- Edit existing blog posts
- Delete blog posts
- View all published and draft posts
- Rich HTML content support

### 3. Blog Display (Public)
- Blog listing page at `/blog`
- Individual blog detail pages at `/blog/[id]`
- Responsive blog cards with category, author, and date
- "Read More" functionality opens full blog in new page
- Social sharing (Twitter, LinkedIn)

### 4. Blog Post Format
When creating a blog post, you need to provide:
- **Title**: The main headline of your blog post
- **Excerpt**: A brief summary (shown on blog listing page)
- **Author**: Default is "Gyaan Rich" (can be changed)
- **Category**: Choose from Education, Career, Technology, Study Tips, Success, Mentorship, or General
- **Content**: Full blog content with HTML support

### HTML Content Tips
You can use HTML tags for formatting:
```html
<h2>Main Heading</h2>
<h3>Sub Heading</h3>
<p>Paragraph text goes here.</p>

<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>

<strong>Bold text</strong>
<em>Italic text</em>
```

## How to Use

### Step 1: Access Admin Panel
1. Navigate to `http://localhost:3000/admin/login`
2. Enter password: `gyanrichadmin@123`
3. Click "Login"

### Step 2: Create a Blog Post
1. Click on "Blog" in the admin sidebar
2. Click "New Post" button
3. Fill in all the required fields:
   - Title
   - Excerpt (short description)
   - Author (default: Gyaan Rich)
   - Category (select from dropdown)
   - Content (write your blog using HTML tags)
4. Click "Publish Post"

### Step 3: View Your Blog
1. Navigate to `http://localhost:3000/blog`
2. Your blog post will appear in the grid
3. Click "Read More" to view the full blog post

### Step 4: Edit or Delete Posts
1. Go to Admin > Blog
2. Find the post in the table
3. Click the edit icon to modify
4. Click the delete icon to remove

## API Endpoints

- `GET /api/blog` - Get all published blog posts
- `GET /api/blog?all=true` - Get all posts (including drafts, admin only)
- `GET /api/blog/[id]` - Get a specific blog post
- `POST /api/blog` - Create a new blog post
- `PUT /api/blog/[id]` - Update a blog post
- `DELETE /api/blog/[id]` - Delete a blog post
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout

## Database Structure

Blog posts are stored in MongoDB with the following schema:
```json
{
  "_id": "ObjectId",
  "title": "string",
  "excerpt": "string",
  "content": "string (HTML)",
  "author": "string",
  "category": "string",
  "published": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Security Notes
- Admin routes are protected by middleware
- Only authenticated users can access `/admin/*` routes (except login)
- Authentication is stored in HTTP-only cookies
- Password is verified server-side

## Next Steps
1. Make sure MongoDB is running and MONGODB_URI is set in your environment variables
2. Start the development server: `npm run dev`
3. Access the admin panel and create your first blog post!
