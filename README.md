# TOM by MEDASKCA™ - Theatre Operations Manager

A modern, intelligent theatre operations management system for NHS trusts. Built with Next.js 15, React 19, and Firebase.

## Features

- **Dashboard View**: Real-time theatre allocations and operations overview
- **Theatre Schedule**: Comprehensive surgical case scheduling and management
- **Staff Roster**: Staff management with competencies and availability tracking
- **Team Assignment**: Allocate staff to theatre teams
- **Supply Catalogue**: Inventory and supplies management
- **Theatre Readiness**: Monitor theatre readiness status
- **Analytics**: Performance metrics and theatre efficiency analytics
- **TOM AI Assistant**: AI-powered operations assistant (coming soon)
- **Mobile-First Design**: Responsive design with mobile accordion views
- **Blue & Teal Theme**: Modern, professional gradient design

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **Database**: Firebase/Firestore
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Firebase project (optional for demo mode)

### Installation

1. Navigate to the project directory
```bash
cd theatre-operations-manager
```

2. Install dependencies
```bash
npm install
```

3. Configure Firebase (Optional)

Copy the example environment file:
```bash
copy .env.local.example .env.local
```

Update `.env.local` with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Running the Application

Development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
theatre-operations-manager/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main application page with navigation
│   └── globals.css         # Global styles with blue/teal theme
├── components/
│   ├── BottomNav.tsx       # Mobile bottom navigation
│   ├── SubMenuModal.tsx    # Mobile menu modal
│   └── views/              # Main view components
├── features/
│   └── roster/
│       └── components/     # Staff roster components
├── lib/
│   └── firebase.ts         # Firebase configuration
├── types/
│   └── index.ts            # TypeScript type definitions
└── README.md
```

## Firebase Collections

The application expects the following Firestore collections:

- **staff**: Staff member records with competencies
- **cases**: Surgical cases with scheduling information
- **theatreAllocations**: Theatre allocation records by date
- **theatre_efficiency**: Performance and efficiency metrics

## Theme Colors

- **Primary Blue**: #2563eb (Blue 600)
- **Primary Teal**: #14b8a6 (Teal 500)
- **Primary Cyan**: #06b6d4 (Cyan 500)
- **Gradient**: Blue → Teal → Cyan

## Demo Mode

The application works in demo mode without Firebase configuration. Views will show empty states with messages prompting you to connect your database.

## License

Proprietary - MEDASKCA™

---

**TOM by MEDASKCA™** - Intelligent Theatre Operations Management for the NHS
