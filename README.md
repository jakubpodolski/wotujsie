# WotujSie - WOT Training Management System

A modern Progressive Web Application designed specifically for **Wojska Obrony Terytorialnej (WOT)** - Poland's Territorial Defense Forces. This application helps soldiers manage their training schedules, track certifications, access first aid procedures, and maintain combat readiness.

## 🎯 Key Features

- **📊 Dashboard (Główna)** - Overview of mobilization status, current incidents, available training exercises, and certification status
- **📅 Training Calendar (Kalendarz)** - Schedule management for field exercises, urban combat simulations, and other military training
- **💪 Daily Training (Trening)** - Personal fitness and combat readiness tracking with daily tasks and weekly plans
- **📚 Knowledge Base (Wiedza)** - First aid procedures, medical protocols, and combat medicine reference materials
- **👤 Account Management (Konto)** - Service information, certifications, contact details, and settings

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- PWA capabilities with Vite PWA plugin

### Backend
- Node.js with Express
- TypeScript
- CORS and security middleware
- RESTful API design
- Mock data for development

## 🎖️ Military-Specific Features

- **Mobilization Status Tracking** - Real-time alerts and readiness levels
- **Training Exercise Management** - Field exercises, urban combat simulations
- **Certification Tracking** - First aid, weapons safety, NBC defense, radio communications
- **Incident Alerts** - Critical situation notifications with nearest station information
- **Combat Medicine Reference** - Step-by-step first aid procedures for battlefield situations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   yarn run install:all
   ```

2. **Start development servers:**
   ```bash
   yarn run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

### Individual Commands

**Frontend only:**
```bash
cd client
yarn install
yarn run dev
```

**Backend only:**
```bash
cd server
yarn install
yarn run dev
```

## 📁 Project Structure

```
wotujsie/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── sections/   # Page-specific sections
│   │   │   └── ui/         # Base UI components
│   │   ├── pages/         # Main application screens
│   │   ├── data/          # Mock data and training content
│   │   ├── lib/           # Utility functions
│   │   └── main.tsx       # Application entry point
│   ├── public/            # Static assets and PWA icons
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── data/          # Mock data
│   │   └── index.ts       # Server entry point
│   └── package.json
└── package.json           # Root package.json
```

## 🔧 Available Scripts

### Root Level
- `yarn run dev` - Start both frontend and backend
- `yarn run build` - Build both frontend and backend
- `yarn run install:all` - Install dependencies for all packages

### Frontend (client/)
- `yarn run dev` - Start development server
- `yarn run build` - Build for production
- `yarn run preview` - Preview production build
- `yarn run lint` - Run ESLint

### Backend (server/)
- `yarn run dev` - Start development server with hot reload
- `yarn run build` - Build TypeScript
- `yarn start` - Start production server
- `yarn run lint` - Run ESLint

## 🌐 API Endpoints

### Training Management
- `GET /api/trainings` - Get all training exercises
- `GET /api/trainings/:id` - Get specific training details
- `POST /api/trainings/register` - Register for training
- `GET /api/trainings/calendar` - Get training calendar

### Certifications
- `GET /api/certifications` - Get user certifications
- `GET /api/certifications/:id` - Get certification details
- `POST /api/certifications/update` - Update certification status

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/status` - Get mobilization status

## 🎨 UI Components

The application includes a comprehensive set of military-focused UI components:

- **TrainingCard** - Training exercise display with registration status
- **CertificateCard** - Certification tracking with expiration alerts
- **UnifiedAlert** - Critical incident notifications
- **TaskCard** - Daily training task management
- **ProcedureCard** - First aid procedure reference
- **MonthlyTrainingGroup** - Calendar view for training schedules

## 📱 PWA Features

- **Installable** - Add to home screen on mobile devices
- **Offline Support** - Critical information available without internet
- **Mobile-Optimized** - Perfect for field use on smartphones and tablets
- **Fast Loading** - Optimized for quick access during operations
- **App-like Experience** - Native app feel in the browser

## 🎯 Target Users

- **WOT Soldiers** - Primary users managing their training and readiness
- **Unit Commanders** - Monitoring training schedules and soldier progress
- **Medical Personnel** - Accessing combat medicine procedures
- **Training Coordinators** - Managing exercise schedules and requirements

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- Input validation
- Error handling middleware
- Military-grade data protection

## 🚀 Deployment

### Frontend
The frontend can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Backend
The backend can be deployed to:
- Heroku
- AWS EC2
- DigitalOcean
- Railway

## 📄 License

MIT License - feel free to use this project as a starting point for your own military applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you have any questions or need help getting started, please open an issue in the repository.

---

**Built for Poland's Territorial Defense Forces** 🇵🇱