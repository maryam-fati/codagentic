# Codeagentic Frontend

A modern, interactive web application built with React and Vite, featuring dynamic animations, particle effects, and a comprehensive admin panel.

## 🚀 Features

- **Interactive UI Components**
  - Custom mouse trail effects
  - Particle animations
  - Sound wave visualizations
  - Smooth scrolling
  - Network visualizations

- **Admin Panel**
  - Blog management
  - Services management
  - Founders management
  - Reviews management
  - Industry management
  - Settings configuration

- **Public Pages**
  - Home/Hero section
  - About us
  - Services showcase
  - Blog section
  - Contact form
  - Client testimonials

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 6
- **Animation Libraries:**
  - GSAP
  - Framer Motion
  - TsParticles
  - Pixi.js
  - Babylon.js
- **Styling:** TailwindCSS 4
- **Rich Text Editor:** Jodit React
- **Routing:** React Router DOM 7
- **HTTP Client:** Axios
- **Carousel:** Swiper, React Slick
- **Date Handling:** date-fns

## 📦 Project Structure

```
src/
├── Components/           # React components
│   ├── Blog/            # Blog related components
│   ├── Panel/           # Admin panel components
│   │   ├── Blogs/      # Blog management
│   │   ├── Founders/   # Founders management
│   │   ├── Indust/     # Industry management
│   │   ├── Review/     # Reviews management
│   │   └── Services/   # Services management
│   └── ...             # Other components
├── assets/              # Static assets
│   ├── audio/          # Audio files
│   └── images/         # Image files
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Key Components

### Public Components

- `Hero.jsx` - Landing page hero section
- `About.jsx` - About us section
- `Service.jsx` - Services showcase
- `Contact.jsx` - Contact form
- `Blogs.jsx` - Blog listing
- `Clients.jsx` - Client testimonials

### Interactive Components

- `MouseTrail.jsx` - Custom mouse trail effects
- `Particles.jsx` - Particle system animations
- `SoundWave.jsx` - Audio visualization
- `NetworkVisual.jsx` - Network effect visualizations

### Admin Panel Components

- `Panel.jsx` - Admin dashboard layout
- `Dash.jsx` - Main dashboard view
- Blog Management (`Panel/Blogs/`)
  - `AddB.jsx` - Add new blog
  - `EditB.jsx` - Edit existing blog
  - `Listblog.jsx` - Blog listing
- Services Management (`Panel/Services/`)
  - `AddS.jsx` - Add new service
  - `EditS.jsx` - Edit existing service
- And more management modules...

## 🔐 Authentication

The application includes protected routes (`Protectedroutes.jsx`) for the admin panel, ensuring secure access to management features.

## 🎨 Styling

- Utilizes TailwindCSS for responsive design
- Custom scroll behavior via `CustomScrollbar.jsx`
- Smooth scroll implementation with `SmoothScrollProvider.jsx`

## 🌐 Deployment

The project includes a `vercel.json` configuration file for deployment on Vercel.

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
