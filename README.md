# 📱 Anotajuegos
![Demo](https://github.com/SantiagoRibot96/Anotajuegos/blob/main/screenshots/demo.mp4)


Anotajuegos is a mobile app that allows you to keep score for classic games such as Truco, Generala and Mil Millas. It also includes a chess clock.

This app was developed using React Native and Expo. It is my first mobile application, and the goal of this project was to learn the language and workflow of mobile app development.

---
# 🚀 Demo

Anotajuegos is currently available only for Android devices through the following APK:
<APK_DOWNLOAD_LINK>

---
# 🧠 Characteristics

- Keep score for **Truco**, **Generala**, and **Mil Millas**
- Built-in **Chess Clock** with several time modes (1|1, 2|1, 3|5, and more)
- Support for **multiple players**
- **Simple and optimized interface** designed for quick use during gameplay

---
# 📷 Screenshots

Here are some examples of real in-app behavior.

| Screen | Description |
|---|---|
| ![](screenshots/Ajedrez2.png) | Allows you to choose the game mode (+2, +5) and time by tapping on the clock. Pressing the red **"Stop"** button starts the game. Long-pressing it stops and resets the clock. |
| ![](screenshots/Ajedrez3.png) | When the clock is below **10 seconds**, milliseconds become visible. |
| ![](screenshots/Generala1.png) | Classic Generala scoreboard. Tapping once adds the value. If it is a number it automatically multiplies it. For other score values you can select **"servida"** which adds +5 points. |
| ![](screenshots/Genelara2.png) | Long-press to disable a score value, and long-press again to enable it. |
| ![](screenshots/MilMillas2.png) | By tapping on score values you can add or subtract points. After each round you must press **"Finish round"**. |
| ![](screenshots/MilMillas3.png) | If a player reaches **5000 points**, the game automatically ends and declares a winner. |
| ![](screenshots/Truco2.png) | Classic Truco scoreboard. Tapping the score adds a point. Tapping **"Nosotros"** or **"Ellos"** subtracts one point. Long-press resets the game. |
| ![](screenshots/Truco1.png) | An alert appears when a player reaches **30 points**. |

---
# 🛠️ Techlogies

- React Native
- Expo
- TypeScript / JavaScript
- Context API for state management between components

---
# ⚙️ Instalation
- Clone this repository:
```
git clone <https://github.com/SantiagoRibot96/Anotajuegos.git>

cd anotajuegos
```
- Install dependencies:
```
npm install
```
- Run development server:
```
npx expo start
```
Then open the app using **Expo Go**.

- To generate a production build:
```
eas build -p android
```
This uses Expo Application Services (EAS) to compile the Android application.
