# Smart EV

**Smart EV** is a mobile application designed to simplify the experience of finding and utilizing EV charging stations.
Built with React Native, TypeScript, and Expo, the app provides real-time availability, filtering options, and gamification
features to make EV charging not just efficient, but enjoyable.

---

## Features

- 🚗 **Real-Time Charging Station Finder**: Locate the nearest EV charging stations with real-time availability updates.
- 🔍 **Advanced Filtering**: Search for stations based on charger type, power output, or other preferences.
- 🎮 **Gamification**: Earn rewards and track progress for using multiple stations or specific chargers.
- 📈 **User Analytics**: Insights into your charging habits and achievements.

---

## Tech Stack

- **Frontend**: React Native with TypeScript
- **Backend**: [Supabase](https://supabase.com) (real-time database and user data tracking)
- **Platform**: Expo (for streamlined development and deployment)

---

## Installation

To run this app locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/smart-ev.git
   cd smart-ev
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   expo start
   ```

4. Open the app on your device:
   - Install the Expo Go app from the [Play Store](https://play.google.com) or [App Store](https://www.apple.com/app-store/).
   - Scan the QR code displayed in your terminal or Expo Developer Tools.

---

## Usage

1. **Sign Up/Login**: Create an account to track your progress and rewards.
2. **Find a Station**: Use the search and filtering options to find a suitable charging station.
3. **Start Charging**: View the real-time availability and start charging your EV.
4. **Earn Rewards**: Collect points and badges for charging activity and milestones.

---

## Project Structure

```plaintext
src/
├── components/    # Reusable UI components
├── screens/       # App screens
├── assets/        # Static assets (images, icons, etc.)
├── utils/         # Helper functions
├── services/      # API and database services
├── navigation/    # Navigation setup
└── styles/        # Global and reusable styles
```

---

## Roadmap

- ✅ Real-time station availability
- ✅ User accounts with rewards tracking
- 🚧 Integration with charging station APIs
- 🚧 Push notifications for station updates
- 🚧 Multilingual support

---

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to your fork and submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgments

- **React Native Community** for the amazing framework
- **Supabase** for their real-time database capabilities
- All EV enthusiasts driving the green revolution 🌍⚡
