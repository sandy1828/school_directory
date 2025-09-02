Sure! Mai teri Next.js + Supabase school directory project ke liye ek **professional README.md** bana deta hu, jisme deploy instructions, features, aur usage bhi include ho.

```markdown
# School Directory - Next.js + Supabase

A simple school directory web application built with **Next.js** and **Supabase**. Users can search for schools by name, city, board, type, and hostel facility. Admins can add new schools with images, and all data is stored in Supabase.

---

## Features

- Search schools by name
- Filter by:
  - City
  - Board (CBSE, ICSE, State)
  - Type (Public, Private)
  - Hostel availability
- School detail page with:
  - Image
  - Board, Type, Hostel
  - Address, Contact, Email, Website
  - Fees, Medium, Level
- Admin can add schools via API (with image upload)
- Responsive UI with modern cards and filters

---

## Tech Stack

- **Frontend:** Next.js, React, CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage for images
- **File Upload:** Formidable

---

## Folder Structure

```

.
├── pages
│   ├── api
│   │   └── schools
│   │       ├── index.js       # GET/POST schools
│   │       └── \[id].js        # GET single school
│   ├── school
│   │   └── \[id].jsx           # School detail page
│   └── showSchools.jsx        # List & filter schools
├── public
│   └── schoolImages           # Local images (for development only)
├── lib
│   └── supabase.js            # Supabase client
└── ...

````

---

## Setup

1. Clone the repo:

```bash
git clone https://github.com/username/school-directory.git
cd school-directory
````

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables:

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<YOUR_SUPABASE_SERVICE_ROLE_KEY>
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## API Endpoints

* **GET /api/schools** - Get all schools with optional filters (`search`, `city`, `board`, `type`, `hostel`)
* **POST /api/schools** - Add new school with image upload
* **GET /api/schools/\[id]** - Get single school details

---

## Deployment

1. Push the repo to GitHub.
2. Connect the GitHub repo to **Vercel**.
3. Add environment variables in Vercel dashboard.
4. Deploy.

> ⚠️ Note: Images uploaded via API will not be stored in `public/schoolImages` on Vercel. Use Supabase Storage for runtime image uploads.

---

## License

MIT © sandy-1828
```

---


