# Frontend Consultant Landing Page

An elegant and minimalist landing page built with Next.js, TypeScript, and Tailwind CSS for a Computer Science Engineer with dual Master's degrees in Frontend Design.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4
- **Static Site Generation (SSG)**: Fully static export for optimal performance and SEO
- **Dark Elegant Theme**: Minimalist design with dark colors and gradient accents
- **Responsive Design**: Mobile-first approach that works on all devices
- **SEO Optimized**: Comprehensive metadata for search engines
- **Ready for Hostinger**: Static HTML output compatible with premium hosting

## 📦 What's Inside

The landing page includes:

- **Hero Section**: Professional introduction with clear call-to-action
- **Expertise Section**: Showcasing Computer Science and Frontend Design qualifications
- **Consulting Services**: Four main service offerings:
  - Technical Consulting
  - Design Systems
  - UI/UX Design
  - Development Services
- **Contact Section**: Easy ways to get in touch via email, LinkedIn, and GitHub
- **Footer**: Professional footer with copyright and tech stack information

## 🛠️ Installation & Development

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📤 Building for Production

### Generate Static Export

```bash
# Build static site
npm run build
```

This creates an `out/` directory with all static files ready for deployment.

## 🌐 Deployment to Hostinger Premium Hosting

### Option 1: Via File Manager

1. Build the static site: `npm run build`
2. Locate the `out/` directory in your project
3. Log into your Hostinger control panel
4. Navigate to File Manager
5. Upload all contents from the `out/` directory to your `public_html` folder
6. Your site is now live!

### Option 2: Via FTP

1. Build the static site: `npm run build`
2. Connect to your hosting via FTP (use FileZilla or similar)
3. Navigate to `public_html` directory
4. Upload all contents from the `out/` directory
5. Done!

## 🎨 Customization

### Update Content

Edit `/app/page.tsx` to customize:
- Hero section text
- Services offered
- Contact information
- Links to your social profiles

### Modify Colors

Edit `/app/globals.css` to change the color scheme:

```css
:root {
  --background: #0a0a0a;      /* Main background */
  --foreground: #ededed;       /* Text color */
  --accent: #6366f1;           /* Primary accent */
  --card-bg: #1a1a1a;          /* Card backgrounds */
}
```

### SEO Metadata

Edit `/app/layout.tsx` to update:
- Page title
- Meta description
- Keywords
- Open Graph tags

## 📁 Project Structure

```
dailymp/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Main landing page component
├── out/                     # Static build output (after npm run build)
├── public/                  # Static assets (if needed)
├── next.config.ts           # Next.js configuration for static export
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production and generate static export
- `npm run start` - Start production server (not needed for static hosting)
- `npm run lint` - Run ESLint for code quality

## 🎯 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom React components
- **Build**: Static Site Generation (SSG)

## 📝 License

ISC

## 🤝 Contributing

This is a personal landing page project. Feel free to fork and customize for your own use!

## 📧 Contact

For any questions or consulting inquiries, please reach out via:
- Email: contact@example.com
- LinkedIn: [Your Profile]
- GitHub: [Your Profile]

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
