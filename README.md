<div align="center">
<h1>🤝 LOOP - Community Item Sharing Platform</h1>

Share Items, Build Community, Live Sustainably
</div>

<div align="center">

[![last commit](https://img.shields.io/badge/last_commit-last_sunday-blue)]()
[![typescript](https://img.shields.io/badge/typescript-65.5%25-blue)]()
[![languages](https://img.shields.io/badge/languages-3-blue)]()

</div>


## Built with the tools and technologies:

<div align="center">

[![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)]()
[![JSON](https://img.shields.io/badge/-JSON-black?style=flat-square&logo=json)]()
[![Markdown](https://img.shields.io/badge/-Markdown-black?style=flat-square&logo=markdown)]()
[![Expo](https://img.shields.io/badge/-Expo-black?style=flat-square&logo=expo)]()

[![npm](https://img.shields.io/badge/-npm-red?style=flat-square&logo=npm)]()
[![Mongoose](https://img.shields.io/badge/-Mongoose-red?style=flat-square&logo=mongoose)]()
[![.ENV](https://img.shields.io/badge/-.ENV-yellow?style=flat-square&logo=dotenv)]()
[![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat-square&logo=javascript)]()
[![sharp](https://img.shields.io/badge/-sharp-green?style=flat-square&logo=sharp)]()

[![Nodemon](https://img.shields.io/badge/-Nodemon-green?style=flat-square&logo=nodemon)]()
[![React](https://img.shields.io/badge/-React-blue?style=flat-square&logo=react)]()
[![TypeScript](https://img.shields.io/badge/-TypeScript-blue?style=flat-square&logo=typescript)]()
[![bat](https://img.shields.io/badge/-bat-blue?style=flat-square&logo=bat)]()

[![Axios](https://img.shields.io/badge/-Axios-purple?style=flat-square&logo=axios)]()
[![styled-components](https://img.shields.io/badge/-styledcomponents-pink?style=flat-square&logo=styled-components)]()
[![Jest](https://img.shields.io/badge/-Jest-red?style=flat-square&logo=jest)]()


</div>


## Overview

Loop is a community-driven mobile platform that enables people to share items they no longer need with others in their local area. Built with React Native and Expo, this platform facilitates sustainable living by giving pre-loved items a new life through direct peer-to-peer connections. Users can publish items with their pickup address, making them visible to the community for easy coordination and pickup.

## ✨ Core Features

### 📍 For Publishers
- **Profile-Based Address System**: Set your pickup address once in your profile - all published items automatically use this location
- **🤖 AI-Powered Item Recognition**: Leverages Google Gemini AI for rapid and accurate identification of item details from uploaded images
- **🚀 Instant Publishing**: Items go live immediately after publishing with your profile address
- **📦 Multi-Item Support**: Publish multiple items at once, all linked to your single profile address
- **🔄 Easy Address Management**: Update your address anytime, and all your published items reflect the change
- **Rich Media Support**: Upload and manage multiple images per item
- **Smooth UX**: Animated scrolling and intuitive form navigation

### 🔍 For Browsers
- **Browse Available Items**: View all items shared by community members
- **📍 Location-Based Discovery**: See pickup locations (city and address) for each item
- **👤 Publisher Information**: View who's sharing each item
- **📊 Item Details**: See clear photos, descriptions, quantities, and conditions

### 👤 User Experience
- **⚡ Fast Registration**: Quick signup process without requiring address upfront
- **🌐 Hebrew & English Support**: Full RTL (right-to-left) support for Hebrew
- **📱 Mobile-First Design**: Optimized for iOS and Android devices
- **🎨 Modern UI**: Clean, intuitive interface with smooth animations
- **🔒 Secure Authentication**: JWT-based authentication with password hashing

## 📸 How It Works

### 1️⃣ Set Your Pickup Address (הוסף כתובת איסוף)
Add your address in your profile so people know where to pick up items from you.

### 2️⃣ Take Photos & Publish Items (צלם ופרסם פריטים)
Take clear photos of your items and publish them for the community to see.

### 3️⃣ Share & Connect (שתף והתחבר)
People can browse your items and arrange to pick them up from your location.


## Quick Start

The easiest way to start the app is to use the included batch file:

```bash
start-app.bat
```

This will start both the backend server and the Expo development server in separate windows.

## Manual Setup

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server with hot reloading:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. From the project root, install dependencies:

   ```bash
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npx expo start --clear
   ```

## Development Features

### Hot Reloading

- **Backend**: Uses nodemon to automatically restart when files change
- **Frontend**: Uses Expo's fast refresh to update the app without restarting

### Error Handling

- The app is configured to suppress development error overlays
- Custom error handling is implemented through the ErrorBoundary component
- API requests are handled through a custom useApi hook for consistent error management

## Authentication Flow

1. Any user can access the landing page without authentication
2. When a non-signed-in user tries to navigate to other sections (Donate, Schedule, Profile) or interact with buttons on the landing page, they are redirected to sign in first
3. The authentication state is persisted using AsyncStorage
4. The AuthContext provides authentication-related functionality throughout the app

## Tech Stack

- **Frontend**: React Native with Expo
- **UI Components**: Custom-styled with a warm color palette (e.g., earth tones and soft hues) to create an inviting atmosphere that aligns with themes of donation and giving
- **Navigation**: Expo Router for type-safe navigation
- **State Management**: React Context API and custom hooks
- **AI Integration**: Google GenAI API for image recognition
- **Media Handling**: Expo Image Picker for camera and gallery access
- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT tokens with bcrypt password hashing
- **Location Services**: Expo Location for GPS functionality

## Key Components

### Donation Flow
- **DonationDetails**: Main component for creating and editing donations with AI detection
- **DonationCart**: Manages the collection of items being donated
- **AI Identify**: Button that triggers AI analysis of uploaded images

### Scheduling Flow
- **ScheduleScreen**: Interface for scheduling pickup times and locations
- **LocationPicker**: Component for selecting between GPS and manual address entry
- **DateTimePicker**: Custom calendar and time selection interface

### Driver Interface
- **ActivePickups**: Shows drivers their assigned pickups for the day
- **DriverDashboard**: Central hub for driver activities and metrics

## Accessibility Features

- Screen reader support for critical UI elements
- Scalable text sizes for better readability
- High contrast color options
- Keyboard navigation support

## Troubleshooting

If you encounter connection issues:

1. Make sure both the backend and frontend servers are running
2. Verify that the API URL in `hooks/useApi.js` matches your local network IP
3. Check that CORS is properly configured in the backend
4. Restart both servers using the `start-app.bat` script

## Contributing

Please read our contributing guidelines before submitting pull requests to the project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
