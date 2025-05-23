# Mini Store - E-commerce App

Mini Store is a full-featured e-commerce web application built using React and Firebase. It provides a complete user experience with authentication, real-time product management, and a dynamic shopping cart system.

### Live Demo
Access the project here: [https://logan-mini-store.netlify.app](https://logan-mini-store.netlify.app)

## Features

- User authentication (sign up, login, protected routes)
- Add, view, and delete products (with images and descriptions)
- Firebase Storage for image uploads
- Real-time cart management using Cloud Firestore
- Add to cart and move items between cart and store
- Alert modals for success/error feedback
- Loading spinner during data fetches
- Responsive design with mobile support
- Persistent logout button for mobile users

## Technologies Used

- React
- React Router
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- JavaScript (ES6+)
- HTML5 & CSS3
- Modular Components
- Real-time Data Syncing

## Getting Started

### Prerequisites

- Node.js and npm installed
- Firebase project with Authentication, Firestore, and Storage enabled

### Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/mini-store.git
   ```

2. Navigate into the project folder:
   ```
   cd mini-store
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `firebase.js` file and configure your Firebase credentials.

5. Run the development server:
   ```
   npm start
   ```

## Firebase Security Rules

### Firestore Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }
    match /carts/{userId}/items/{itemId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /product-images/{userId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Author

Gabriel Logan  
Deployed with Netlify at: [https://logan-mini-store.netlify.app](https://logan-mini-store.netlify.app)
