# Property Marketplace

A modern, responsive property marketplace website built with HTML, CSS, and JavaScript.

## Features

- 🏠 Browse property listings with search and filter functionality
- ➕ Add new properties with image upload support
- 📱 Fully responsive design for all devices
- 🔍 Real-time search and filtering
- 📧 Contact property owners directly
- 💾 Local storage fallback for offline functionality

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- Firebase (optional for database)
- Local Storage (fallback)

## Getting Started

### Local Development

1. Clone this repository
2. Open `index.html` in your browser or serve with a local server:
   ```bash
   npx serve .
   ```
3. Navigate to `http://localhost:3000`

### Production Setup

For production use with real database:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Replace the Firebase configuration in `js/firebase-config.js` with your project credentials
4. Update Firestore security rules as needed

## Deployment

This project is deployed using GitHub Pages. Any changes pushed to the main branch will automatically update the live site.

## Project Structure

```
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Custom styles and animations
├── js/
│   ├── app.js              # Main application logic
│   └── firebase-config.js  # Firebase configuration
└── assets/                 # Static assets (if any)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Live Demo

Visit the live demo: [Property Marketplace](https://yourusername.github.io/property-marketplace)

---

Built with ❤️ using modern web technologies
