# User Management Application

A modern, responsive CRUD (Create, Read, Update, Delete) application built with React for managing users. This application demonstrates full-stack frontend development with API integration, routing, state management, and local data persistence.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)
![React Router](https://img.shields.io/badge/React_Router-7.9.5-CA4245?logo=react-router)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Local Storage Persistence](#local-storage-persistence)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality
- **Fetch Users**: Display all users from JSONPlaceholder API in a responsive table
- **Create User**: Add new users with a comprehensive form
- **Update User**: Edit existing user information with pre-filled forms
- **Delete User**: Remove users with confirmation modal
- **View User Details**: Navigate to detailed user information page

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Loading spinner during API requests
- **Error Handling**: User-friendly error messages for failed operations
- **Data Persistence**: Changes persist across page refreshes using localStorage
- **Smooth Interactions**: Transitions and animations for better UX
- **Form Validation**: Client-side validation for user inputs

### Technical Features
- **React Router**: Multi-page navigation with route parameters
- **React Hooks**: useState and useEffect for state management
- **Code Comments**: Well-documented codebase for easy understanding
- **Modern CSS**: Responsive styling with CSS Grid and Flexbox
- **API Integration**: RESTful API calls with proper error handling

## Technologies Used

- **React 18.3.1** - UI library
- **React Router DOM 7.9.5** - Client-side routing
- **Vite 6.0.5** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with responsive design
- **JSONPlaceholder API** - Fake REST API for testing
- **localStorage** - Browser storage for data persistence

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/raghub-github/user-management-app.git
cd user-management-app
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Step 3: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Usage

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Application Workflow

1. **View Users**: The home page displays all users in a table format
2. **Create User**: Click "+ Create New User" button to add a new user
3. **Edit User**: Click "Edit" button on any user row to modify user information
4. **Delete User**: Click "Delete" button to remove a user (confirmation required)
5. **View Details**: Click "View" button to see detailed user information

### Form Fields

**Required Fields:**
- Name
- Email
- Phone

**Optional Fields:**
- Username
- Website
- Company Name
- Address (Street, Suite, City, Zipcode)

## Project Structure

```
react_vite/
├── public/
│   ├── _redirects          # Netlify SPA routing configuration
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.jsx    # Loading indicator component
│   │   ├── LoadingSpinner.css
│   │   ├── UserList.jsx          # Main user list with CRUD operations
│   │   ├── UserList.css
│   │   ├── UserForm.jsx          # Create/Edit user form
│   │   ├── UserForm.css
│   │   ├── UserDetail.jsx        # User detail view page
│   │   └── UserDetail.css
│   ├── services/
│   │   └── api.js                # API service functions
│   ├── App.jsx                   # Main app component with routing
│   ├── App.css                   # App-level styles
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json                   # Vercel deployment configuration
└── vite.config.js
```

## API Integration

### JSONPlaceholder API

This application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - a fake REST API for testing and prototyping.

**Base URL:** `https://jsonplaceholder.typicode.com`

### API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Fetch all users |
| GET | `/users/:id` | Fetch single user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update existing user |
| DELETE | `/users/:id` | Delete user |

### API Service Functions

Located in `src/services/api.js`:

- `fetchUsers()` - Get all users
- `fetchUser(userId)` - Get single user
- `createUser(userData)` - Create new user
- `updateUser(userId, userData)` - Update user
- `deleteUser(userId)` - Delete user

**Note:** JSONPlaceholder is a fake API and doesn't actually persist data. Changes are simulated and returned in the response.

## Local Storage Persistence

Since JSONPlaceholder doesn't persist data, the application uses **localStorage** to save changes locally in the browser.

### How It Works

1. **On Create/Update/Delete**: Changes are saved to localStorage
2. **On Page Load**: 
   - Loads saved data from localStorage
   - Fetches fresh data from API
   - Merges both (local changes take priority)
3. **Data Persistence**: All changes persist across page refreshes

### Storage Key

- **Key:** `users`
- **Format:** JSON array of user objects

### Clear Local Data

To reset to original API data, open browser console and run:

```javascript
localStorage.removeItem('users');
location.reload();
```

## Deployment

### Deploy to Vercel

#### Option 1: Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up/Login with GitHub
4. Click "Add New Project"
5. Import your GitHub repository
6. Vercel auto-detects Vite settings
7. Click "Deploy"

#### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Deploy to Netlify

#### Option 1: Via Netlify Dashboard

1. Push your code to GitHub
2. Go to [netlify.com](https://www.netlify.com)
3. Sign up/Login with GitHub
4. Click "Add new site" → "Import an existing project"
5. Select your repository
6. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click "Deploy site"

#### Option 2: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

#### Option 3: Drag & Drop

```bash
# Build the project
npm run build

# Go to https://app.netlify.com/drop
# Drag and drop the 'dist' folder
```

### Build Configuration

The `vercel.json` and `public/_redirects` files are already configured for proper SPA routing on both platforms.

## Screenshots

### User List View
- Displays all users in a responsive table
- Shows ID, Name, Email, and Phone
- Action buttons for View, Edit, and Delete operations

### Create/Edit User Form
- Comprehensive form with validation
- Pre-filled data when editing
- Responsive layout for all screen sizes

### User Detail Page
- Detailed user information
- Personal info, address, and company details
- Navigation back to user list

## Key Features Explained

### Responsive Design

The application uses CSS Grid and Flexbox with media queries for:
- **Desktop:** Full table layout with all columns visible
- **Tablet:** Optimized table with adjusted spacing
- **Mobile:** Stacked layout with full-width buttons

### Error Handling

- Try-catch blocks in all API calls
- User-friendly error messages
- Fallback to cached data if API fails
- Visual error indicators with dismiss option

### Loading States

- Loading spinner during API requests
- Disabled form inputs during submission
- Visual feedback for all async operations

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code Style

- Use functional components with React Hooks
- Follow ESLint rules (run `npm run lint`)
- Add comments for complex logic
- Use meaningful variable and function names

## Known Issues

- JSONPlaceholder API doesn't persist data (handled with localStorage)
- New users get IDs starting from 100 to avoid conflicts
- LocalStorage is browser-specific (data doesn't sync across devices)

## Future Enhancements

- [ ] Search and filter functionality
- [ ] Pagination for large user lists
- [ ] User authentication
- [ ] Backend integration with real database
- [ ] Export users to CSV/JSON
- [ ] Bulk operations (delete multiple users)
- [ ] Dark mode toggle
- [ ] User avatars/profile pictures

## License

This project is open source and available under the [MIT License](LICENSE).

##  Author

**Raghu B**

- GitHub: [@raghub-github](https://github.com/raghub-github)
- Project Link: [https://github.com/raghub-github/user-management-app](https://github.com/raghub-github/user-management-app)

## Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing a free fake REST API
- [React](https://react.dev/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool
- [React Router](https://reactrouter.com/) for client-side routing

---

**Made with ❤️ using React and Vite**
