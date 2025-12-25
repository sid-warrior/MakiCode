# DevType - Master Your Coding Speed 🚀

A premium typing speed application designed specifically for programmers. Practice typing with real-world code snippets and improve your WPM and accuracy with syntax, brackets, and special characters.

![DevType](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)

## ✨ Features

- **🎯 Real Code Snippets**: Practice with actual code in TypeScript, JavaScript, Python, Rust, Go, Java, and C++
- **⚡ Live Feedback**: Real-time character validation with color-coded feedback
- **🏆 Leaderboard**: Compete globally with other developers
- **📊 Personal Dashboard**: Track your progress, best WPM, and accuracy over time
- **🔐 Google OAuth**: Secure authentication with Google
- **🎨 Premium UI**: Glassmorphism design with smooth animations
- **⏱️ Multiple Durations**: Choose between 15, 30, or 60-second tests
- **🌐 Language Filtering**: Practice specific languages or mix them all

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js v5 (Google Provider)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Syntax Highlighting**: Prism.js
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Google Cloud Console account for OAuth

### Installation

1. **Clone the repository**
   ```bash
   cd devtype-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string_here

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

4. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   ```
   Add the output to `NEXTAUTH_SECRET` in `.env.local`

5. **Set up MongoDB**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string and add it to `MONGODB_URI`

6. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Client Secret to your `.env.local`

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
devtype-app/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth API routes
│   │   ├── leaderboard/         # Leaderboard API
│   │   └── scores/              # Scores API
│   ├── dashboard/               # User dashboard page
│   ├── leaderboard/             # Global leaderboard page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── TestConfig.tsx           # Test configuration
│   ├── TypingTest.tsx           # Main typing test
│   ├── TypingTestContainer.tsx  # Test container
│   ├── ResultsModal.tsx         # Results display
│   └── DashboardClient.tsx      # Dashboard client
├── lib/
│   ├── mongodb.ts               # MongoDB connection
│   └── snippets.ts              # Code snippets data
├── models/
│   ├── User.ts                  # User model
│   └── Score.ts                 # Score model
├── store/
│   └── typingStore.ts           # Zustand state management
├── types/
│   └── next-auth.d.ts           # NextAuth type definitions
└── auth.ts                      # NextAuth configuration
```

## 🎮 How to Use

1. **Sign in** with your Google account
2. **Select duration** (15s, 30s, or 60s)
3. **Choose a language** or select "All Languages"
4. **Click the typing area** to start
5. **Type the code** as accurately as possible
6. **View your results** when time runs out
7. **Save your score** to compete on the leaderboard

## 📊 Calculation Logic

### Words Per Minute (WPM)
```
WPM = (Total Characters Typed / 5) / Time in Minutes
```

### Accuracy Percentage
```
Accuracy = (Correct Keystrokes / Total Keystrokes) × 100
```

## 🎨 Design Features

- **Glassmorphism**: Modern frosted glass effect with backdrop blur
- **Gradient Text**: Beautiful gradient colors for headings
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive Design**: Works perfectly on all screen sizes
- **Dark Theme**: Easy on the eyes with a premium dark color scheme
- **Custom Scrollbar**: Styled scrollbar matching the theme

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Features in Detail

### Real-Time Feedback
- **Green**: Correct characters
- **Red**: Incorrect characters with background highlight
- **Gray**: Pending characters
- **Blinking cursor**: Shows current position

### Leaderboard
- Filter by programming language
- Top 50 global rankings
- Medal-style ranking for top 3
- Real-time updates

### Dashboard
- Personal statistics overview
- Recent test history
- Best WPM tracking
- Average accuracy calculation

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [Monkeytype](https://monkeytype.com/)
- Built with modern web technologies
- Designed for developers, by developers

---

**Made with ❤️ for the developer community**
