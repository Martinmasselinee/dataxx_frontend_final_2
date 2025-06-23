# Dataxx Frontend - Project Structure

## 🏗️ Architecture Overview

This project follows strict architectural rules for clean organization and easy backend integration.

### Technology Stack
- **React** + **TypeScript** + **Tailwind CSS**
- **Vite** for build tooling and development server
- **Node.js** runtime environment

### Directory Structure

```
src/
├── pages/              # One page = One file rule
│   └── SplashScreen.tsx   # Empty splashscreen (ready for content)
├── components/         # Reusable components only
│   └── ReusableComponents.tsx  # Centralized reusable components
├── data/              # All mock data centralized
│   └── mock_data.ts      # ALL mock data goes here
├── assets/            # Static assets
├── App.tsx            # Main app component
├── App.css            # Minimal app styles
├── index.css          # Tailwind directives + base styles
└── main.tsx           # App entry point
```

## 🚨 Critical Rules

### 🖥️ Platform Targeting
- **Desktop-Only Application**: Never code for mobile responsiveness
- **Computer Responsive**: Always ensure responsiveness across different desktop screen sizes
- **No Mobile Support**: App will only be available on computer/desktop platforms

### 🎨 Design Standards
- **Typography**: Always use Space Grotesk font throughout the entire website
- **Consistency**: Maintain consistent typography across all components and pages

### File Organization
1. **One page = One file** - Each new page gets its own file in `src/pages/`
2. **No centralized big files** - Never code everything in one large file
3. **Separate components** - Reusable components go in `src/components/ReusableComponents.tsx`
4. **Centralized mock data** - ALL mock data in `src/data/mock_data.ts`

### Component Development Process
1. Create components in specific page files first
2. **Always ask**: "Should this component be reusable or one-shot?"
3. If reusable → Move to `ReusableComponents.tsx`
4. If one-shot → Keep in page file

### Backend Integration
- Code is designed to be plug-and-play
- Mock data structure matches expected API format
- Clear separation between frontend logic and data sources
- No backend functionality built (another developer handles this)

## 🎯 Current Status

- ✅ Project architecture set up
- ✅ Tailwind CSS configured
- ✅ Splashscreen with background image
- ✅ React Router navigation system
- ✅ Splashscreen automatic redirection logic
- ✅ LocalStorage page tracking
- ✅ Mock data file prepared
- ✅ Reusable components file ready
- ⏳ Ready for splashscreen animation development

## 🎬 Splashscreen System

### How It Works
1. **Always Shows**: Splashscreen appears on every app refresh/load
2. **Duration**: Configurable duration (currently 3 seconds)
3. **Animated Logo Sequence**:
   - **Step 1**: Dataxx logo grows from size 0 to 20vh centrally at exact screen center
   - **Step 2**: Dataxx logo slides 15vw to the left
   - **Step 3**: LOSC logo appears 15vw to the right with "×" spinning 360° at center
   - Perfect horizontal alignment with mirrored positioning around center
   - All scaling animations expand from center point outward
   - X separator features cool 360-degree rotation effect
4. **Smart Redirection**:
   - **First-time users**: Redirects to `/signin` after animation
   - **Returning users**: Redirects to their last visited page
5. **Page Tracking**: Uses localStorage to remember user's navigation

### Configuration
- Duration and routes configurable in `src/data/mock_data.ts`
- Animation timing configurable in `splashscreen.animation` settings
- Background image: `/public/background_picture.png`
- Logo assets: `/public/dataxx_logo.png`, `/public/home_club_logo.png`
- Routes: `/signin`, `/dashboard` (test pages created)

### Testing
1. Visit http://localhost:5173 - see splashscreen → redirects to signin
2. Navigate to dashboard, refresh - see splashscreen → returns to dashboard
3. Clear localStorage to reset first-time user behavior

## 🚀 Development Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview build locally
```

## 📝 Next Steps

1. Request specific components to be built
2. Add mock data as components are developed
3. Follow component development process for each new feature
4. Maintain clean architecture for backend integration 