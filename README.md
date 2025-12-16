# Solar Jetman Password Generator

A client-side web application for generating passwords for the NES game Solar Jetman: Hunt for the Golden Warpship.

![Solar Jetman Password Generator](https://github.com/user-attachments/assets/5c265819-ed04-4453-8b50-93f5a9b9c376)

## 🎮 About

This tool generates valid passwords for Solar Jetman, allowing players to start at any level with custom game states including:
- Level selection (1-64, including debug levels)
- Number of lives (0-15)
- Score (0-999999)
- Pod type (Standard, Nippon Sports Jetpod, Italian Racing Jetpod)
- Equipment (Shields, Double Strength Thrusters)
- Map type (None, Mapping Device, Super Mapping Device)

## 🚀 Live Demo

Visit the live version: **[https://ap0ught.github.io/solarjetmanpasswordgenerator/](https://ap0ught.github.io/solarjetmanpasswordgenerator/)**

## 💻 How It Works

This is a pure client-side application that runs entirely in the browser with **no server-side components or Java dependencies**. The password generation algorithm has been faithfully ported from the original Java implementation to JavaScript.

The app:
- Runs completely in your browser
- Requires no installation or build process
- Works offline once loaded
- Generates passwords using the same algorithm as the original Java version

## 🏃 Running Locally

### Option 1: Open Directly (simplest)
1. Clone or download this repository
2. Open `docs/index.html` in any modern web browser
3. Start generating passwords!

### Option 2: Using a Local Web Server
```bash
# Using Python 3
cd docs
python3 -m http.server 8080

# Using Node.js
cd docs
npx http-server -p 8080

# Then open http://localhost:8080 in your browser
```

### Option 3: Using GitHub Pages
The app is designed to work with GitHub Pages:
1. Go to your repository Settings
2. Navigate to "Pages" section
3. Select source: "Deploy from a branch"
4. Choose branch: `main` or your preferred branch
5. Choose folder: `/docs`
6. Save and wait a few minutes
7. Access at: `https://[username].github.io/solarjetmanpasswordgenerator/`

## 📋 Usage

1. **Select Game Parameters**: Choose your desired level, lives, score, pod type, and equipment
2. **Click Generate**: The password will be generated instantly
3. **Enter in Game**: Use the generated 12-character password in Solar Jetman

### Password Format
Generated passwords are 12 characters long using these letters: B, D, G, H, K, L, M, N, P, Q, R, T, V, W, X, Z

Example: `LLBNHKGDBHBB`

## 🏗️ Technical Details

### Files Structure
```
docs/
├── index.html           # Main HTML page
├── styles.css          # Responsive CSS styling
├── password-generator.js  # Core password generation logic
└── app.js              # UI event handlers and form logic
```

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Migration from Java

This project was originally a Java Swing application using Apache Commons Lang. The static web version:
- **Removed**: Java/JVM dependencies, NetBeans project files, Apache Commons Lang library
- **Replaced**: Java Swing UI with HTML/CSS/JavaScript
- **Preserved**: Original password generation algorithm and game logic
- **Improved**: Cross-platform accessibility, no installation required, mobile-friendly

### Key Differences
- **Original**: Desktop Java application requiring JRE
- **Current**: Browser-based application, works everywhere
- **Algorithm**: Identical results to the original Java version

## 🧪 Testing

Open `docs/test.html` in a browser to run basic validation tests, or manually verify:

**Test Case 1**: Default values (Level 1, 0 lives, 0 score, no equipment)
- Expected: `BBBBBBBBBBBB`

**Test Case 2**: Level 1, 5 lives, score 12345, standard pod, no equipment
- Expected: `LLBNHKGDBHBB`

## 🤝 Contributing

Contributions are welcome! Please see [COPILOT.md](COPILOT.md) for coding patterns and GitHub Copilot tips.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📖 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture and design decisions
- [COPILOT.md](COPILOT.md) - GitHub Copilot prompts and patterns for contributors

## 📄 License

MIT License - Copyright (c) 2019-2025 Shawn M. Crawford

See [LICENSE](LICENSE) file for full details.

## 🙏 Credits

- Original Java implementation: Shawn M. Crawford
- JavaScript port and static site conversion: 2025
- Solar Jetman game: © Rare Ltd. / Nintendo

---

**Note**: This is an unofficial fan-made tool. Solar Jetman: Hunt for the Golden Warpship is © Rare Ltd. / Nintendo.
