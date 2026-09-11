# Balmitra Marketplace

Balmitra is a modern, robust, and scalable multi-vendor e-commerce platform dedicated to kids' fashion, toys, and infant care, heavily inspired by FirstCry and Hopscotch.

This project is divided into two distinct services:
1. **Frontend**: Next.js 14+ (App Router), Tailwind CSS, TypeScript, and Redux/Context state management.
2. **Backend**: Node.js, Express.js, TypeScript, PostgreSQL (via Prisma ORM), and Razorpay Integration.

---

## 🚀 Features at a Glance

### 🛍️ Storefront (Customer Facing)
- **Dynamic Homepage**: Driven entirely by the Admin Panel. Features modular sections: Hero Banners, Trending Shelves, Flash Sales, and Testimonials.
- **Product Catalog**: Advanced search, filtering by Age, Gender, Categories, Subcategories, and active stock tracking.
- **Cart & Checkout**: Persistent cart state (synced with logged-in users), Razorpay payment gateway integration (COD & Online Payment), dynamic shipping calculation.
- **User Dashboard (My Account)**: Secure login (OTP/Email), order history, active order tracking (Timeline UI), profile management, and Wishlist.
- **Dynamic Offer Engine**: Coupon codes (percentage and flat-rate) with usage limits and expiration logic.

### 🛡️ Admin Dashboard (Super Admin & Managers)
- **Overview & Analytics**: Live sales dashboard, total users, latest orders, revenue tracking.
- **Homepage Builder**: Manage Banners, Promotional Strips, Character Zones, and dynamically assign which products go into "Trending" or "Featured" shelves.
- **Catalog Management**: Full CRUD for Categories, Subcategories, and Products. Includes Cloudinary image uploading, variant/size management, and stock toggling.
- **Order Management**: Fulfill orders, track shipping status, process returns/cancellations.
- **Customer & Leads CRM**: Manage registered users, process "Become a Vendor" applications, and "Franchise" enquiries.
- **Coupons**: Generate promo codes dynamically.

---

## 🛠️ Technology Stack
* **Frontend**: Next.js (App Router), React 18, Tailwind CSS, Shadcn/Lucide Icons, Framer Motion
* **Backend**: Node.js, Express.js, Prisma ORM, PostgreSQL (hosted on Supabase / AWS)
* **Authentication**: JWT (JSON Web Tokens), bcrypt
* **Storage**: Cloudinary (Image Hosting)
* **Payments**: Razorpay Gateway
* **Mailing**: Brevo (Sendinblue) SMTP

---

## 📦 Local Development Setup

### 1. Prerequisites
Ensure you have the following installed on your local machine:
- Node.js (v18 or higher)
- npm or yarn

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd balmitra-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Ensure the `.env` file exists and contains valid `DATABASE_URL` (with `&pgbouncer=true` if using Supabase pooling), `JWT_SECRET`, `RAZORPAY_KEY`, and `CLOUDINARY` credentials.
4. Run Prisma Migrations (if database is empty):
   ```bash
   npx prisma migrate dev
   ```
5. Seed Database with Real Products (Optional but recommended):
   ```bash
   npx ts-node scripts/seed-real-data.ts
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd balmitra-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Ensure the `.env.local` file exists with `NEXT_PUBLIC_API_URL=http://localhost:5000/api` and `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:3000`*

---

## 🔐 Admin Panel Guide

To access the admin panel, navigate to **`http://localhost:3000/admin/login`**.

**Default Credentials:**
- **Email:** shahkaif004@balmitra.com  (or admin@balmitra.com)
- **Password:** Admin@123

### Key Admin Workflows
1. **Updating the Homepage:** Go to `Overview > Homepage Manager`. Here you can upload new Hero banners. You can also assign existing products to shelves like "Featured" or "New Arrivals" directly from the Product Management table.
2. **Adding a Product:** Go to `Catalog > Products > Add Product`. You must assign it a Subcategory (e.g., "T-Shirts") which inherently maps it to a Main Category (e.g., "Boys Fashion").
3. **Processing Orders:** Go to `Commerce > Orders`. Click on any incoming order to change its status from "PENDING" to "SHIPPED" and finally "DELIVERED". This automatically reflects on the customer's timeline tracker on the storefront.

---

## 🚀 Deployment Instructions

### Deploying the Backend (e.g., Render / Railway / AWS)
1. Set the **Build Command** to: `npm install && npx prisma generate && npm run build`
2. Set the **Start Command** to: `npm start`
3. Add ALL environment variables from your `.env` file to the host's environment settings.
4. *Important:* Ensure your `DATABASE_URL` uses the connection pooling URL if your host (like Supabase) requires it.

### Deploying the Frontend (Vercel)
1. Import the `balmitra-frontend` folder into Vercel.
2. Set the **Framework Preset** to Next.js.
3. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed backend URL.
4. Click Deploy! Vercel handles the optimization and static caching automatically.

---

## 🧹 Maintenance & Size Management
- The `balmitra-frontend/.next/cache` directory can grow very large during development. I have already cleared it for you, freeing up ~1.5 GB. 
- You can safely add `.next/cache/` to your `.gitignore` file.
- If you need to hand off the raw codebase without dependencies (to save space), simply delete the `node_modules` folders in both the backend and frontend directories before zipping the project.

---
*Developed with Next.js 14 and Express.*
