# WotujSie - WOT Training Management System

A modern Progressive Web Application designed specifically for **Wojska Obrony Terytorialnej (WOT)** - Poland's Territorial Defense Forces. This application helps soldiers manage their training schedules, track certifications, access first aid procedures, and maintain combat readiness with real-time notifications and dynamic mobilization status.

## 🎯 Key Features

- **📊 Dashboard (Główna)** - Overview of mobilization status, current incidents, available training exercises, and certification status
- **📅 Training Calendar (Kalendarz)** - Schedule management for field exercises, urban combat simulations, and other military training
- **💪 Daily Training (Trening)** - Personal fitness and combat readiness tracking with daily tasks and weekly plans
- **📚 Knowledge Base (Wiedza)** - First aid procedures, medical protocols, and combat medicine reference materials
- **👤 Account Management (Konto)** - Service information, certifications, contact details, and settings
- **🔔 Smart Notifications** - Priority-based notification system with automatic mobilization status updates
- **⚡ Admin Dashboard** - Management interface for assigning trainings, sending notifications, and monitoring soldiers

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- SWR for data fetching and caching
- Axios for HTTP requests
- PWA capabilities with Vite PWA plugin

### Backend
- Node.js with Express
- TypeScript
- CORS and security middleware
- RESTful API design
- Mock data for development
- Real-time notification system
- Dynamic mobilization status management

### Admin Dashboard
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for API communication
- Real-time data synchronization

## 🎖️ Military-Specific Features

- **Dynamic Mobilization Status** - Real-time status updates (WYSOKI/ŚREDNI/NISKI) based on notification priority
- **Smart Notification System** - Priority-based alerts (urgent/high/normal/low) with automatic status switching
- **Training Exercise Management** - Field exercises, urban combat simulations, tactical driving, cyber security
- **Certification Tracking** - First aid, weapons safety, NBC defense, radio communications
- **Incident Alerts** - Critical situation notifications with nearest HQ information
- **Combat Medicine Reference** - Step-by-step first aid procedures for battlefield situations
- **HQ Location Intelligence** - Dynamic headquarters information based on notification priority and location
- **Admin Command Center** - Real-time soldier management, training assignment, and notification broadcasting

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

   This will start:
   - Frontend (http://localhost:3000)
   - Backend API (http://localhost:3333)
   - Admin Dashboard (http://localhost:3001)

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

**Admin Dashboard only:**
```bash
cd admin
yarn install
yarn run dev
```

## 🧪 Testing the Notification System

### Quick Test Setup
1. **Start all services:**
   ```bash
   yarn run dev
   ```

2. **Open applications:**
   - Client: http://localhost:3000
   - Admin: http://localhost:3001

3. **Send a test notification:**
   - Go to Admin Dashboard → Notifications
   - Select priority (urgent/high/normal/low)
   - Enter title and message
   - Select user(s) to notify
   - Click "Send Notification"

4. **Observe changes:**
   - Check client dashboard for notification
   - Verify mobilization status changes
   - Test different priorities to see HQ data changes

### Testing Different Scenarios
- **Urgent Priority** → Sets status to WYSOKI, shows in UnifiedAlert
- **High Priority** → Sets status to WYSOKI, shows in UnifiedAlert  
- **Normal Priority** → Sets status to ŚREDNI, shows in notifications
- **Low Priority** → Sets status to NISKI, shows in notifications

## 📁 Project Structure

```
wotujsie/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── sections/   # Page-specific sections
│   │   │   └── ui/         # Base UI components
│   │   ├── pages/         # Main application screens
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   ├── data/          # Mock data and training content
│   │   ├── lib/           # Utility functions
│   │   └── main.tsx       # Application entry point
│   ├── public/            # Static assets and PWA icons
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── data/          # Mock data and system state
│   │   └── index.ts       # Server entry point
│   └── package.json
├── admin/                 # Admin dashboard
│   ├── src/
│   │   ├── components/    # Admin UI components
│   │   ├── pages/         # Admin screens
│   │   ├── services/      # Admin API services
│   │   └── main.tsx       # Admin entry point
│   └── package.json
└── package.json           # Root package.json
```

## 🔧 Available Scripts

### Root Level
- `yarn run dev` - Start frontend, backend, and admin dashboard
- `yarn run build` - Build all applications
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

### Admin Dashboard (admin/)
- `yarn run dev` - Start development server
- `yarn run build` - Build for production
- `yarn run preview` - Preview production build
- `yarn run lint` - Run ESLint

## 🌐 API Endpoints

### Training Management
- `GET /api/trainings` - Get all training exercises
- `GET /api/trainings/:id` - Get specific training details
- `POST /api/trainings/register` - Register for training
- `POST /api/trainings/cancel` - Cancel training registration
- `GET /api/trainings/calendar` - Get training calendar
- `GET /api/trainings/grouped` - Get trainings grouped by month

### User Management
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/tasks` - Get user tasks
- `PUT /api/users/:id/tasks/:taskId/toggle` - Toggle task completion
- `GET /api/users/:id/notifications` - Get user notifications
- `PUT /api/users/:id/notifications/:notificationId/read` - Mark notification as read

### Dashboard & System
- `GET /api/dashboard/:userId` - Get dashboard data with notifications and mobilization status
- `GET /api/system/status` - Get system status
- `GET /api/notifications` - Get all notifications

### Admin Management
- `GET /api/admin/users` - Get all users for admin
- `POST /api/admin/assign-training` - Assign training to user
- `POST /api/admin/send-notification` - Send notification to users
- `GET /api/admin/notifications` - Get notification history
- `GET /api/admin/mobilization-status` - Get current mobilization status
- `PUT /api/admin/mobilization-status` - Update mobilization status

### Certifications & Procedures
- `GET /api/certificates` - Get user certificates
- `GET /api/certificates/progress` - Get certificate progress
- `GET /api/procedures` - Get medical procedures
- `GET /api/procedures/search` - Search procedures

## 🎨 UI Components

The application includes a comprehensive set of military-focused UI components:

### Core Components
- **TrainingCard** - Training exercise display with registration status
- **CertificateCard** - Certification tracking with expiration alerts
- **UnifiedAlert** - Critical incident notifications with dynamic HQ information
- **TaskCard** - Daily training task management
- **ProcedureCard** - First aid procedure reference
- **MonthlyTrainingGroup** - Calendar view for training schedules

### Notification System
- **NotificationAlert** - Priority-based notification display with closable functionality
- **Priority Indicators** - Visual priority levels (urgent/high/normal/low)
- **Dynamic Styling** - Color-coded backgrounds based on notification priority
- **Smart Filtering** - Automatic filtering based on mobilization status

### Admin Components
- **User Management** - Soldier roster and status tracking
- **Notification Center** - Broadcast notifications to soldiers
- **Training Assignment** - Assign specific trainings to users
- **Status Control** - Manual mobilization status management

## 📱 PWA Features

- **Installable** - Add to home screen on mobile devices
- **Offline Support** - Critical information available without internet
- **Mobile-Optimized** - Perfect for field use on smartphones and tablets
- **Fast Loading** - Optimized for quick access during operations
- **App-like Experience** - Native app feel in the browser

## 🎯 Target Users

- **WOT Soldiers** - Primary users managing their training and readiness
- **Unit Commanders** - Monitoring training schedules and soldier progress via admin dashboard
- **Medical Personnel** - Accessing combat medicine procedures
- **Training Coordinators** - Managing exercise schedules and requirements
- **System Administrators** - Managing notifications, mobilization status, and user assignments

## 🔔 Smart Notification System

### Priority-Based Alerts
- **🚨 Urgent** - Critical alerts that set mobilization status to WYSOKI
- **⚠️ High** - Important notifications that set mobilization status to WYSOKI
- **ℹ️ Normal** - Standard notifications that set mobilization status to ŚREDNI
- **🟢 Low** - Informational notifications that set mobilization status to NISKI

### Dynamic Features
- **Automatic Status Switching** - Mobilization status changes based on notification priority
- **Smart Display Logic** - High/urgent notifications shown in UnifiedAlert for WYSOKI status
- **Closable Notifications** - Users can dismiss individual notifications
- **HQ Intelligence** - Different headquarters information based on notification priority
- **Real-time Updates** - Instant notification delivery and status changes

## ⚡ Admin Dashboard Features

### User Management
- **Soldier Roster** - View all registered soldiers
- **Training Assignment** - Assign specific trainings to individual soldiers
- **Status Monitoring** - Track soldier progress and availability

### Notification Broadcasting
- **Priority Selection** - Choose notification priority level
- **Target Selection** - Send to specific soldiers or all users
- **Real-time Delivery** - Instant notification broadcasting
- **History Tracking** - View all sent notifications

### System Control
- **Mobilization Status** - Manual override of system-wide status
- **Status History** - Track status changes and reasons
- **System Monitoring** - Real-time system health and statistics

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

### Admin Dashboard
The admin dashboard can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

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