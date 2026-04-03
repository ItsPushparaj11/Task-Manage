# Task Manager App

A full-stack task management application built with React and Node.js/Express, featuring user authentication and MongoDB database integration.

## Features

- **User Authentication**: Sign up and login with email and password
- **Task Management**: Create, read, and delete tasks
- **Responsive UI**: Clean and intuitive user interface with proper styling
- **Error Handling**: Comprehensive error messages for better user experience
- **Security**: Password hashing with bcryptjs and JWT token authentication

## Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hooks** - State management (useState, useEffect)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **BCryptjs** - Password hashing
- **JWT** - JSON Web Tokens for authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
taskmanage/
├── backend/
│   ├── models/
│   │   ├── Task.js
│   │   ├── user.js
│   │   └── routes/
│   │       ├── auth.js
│   │       └── tasks.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   └── client/
│       ├── src/
│       │   ├── App.js
│       │   ├── App.css
│       │   ├── Login.js
│       │   ├── Signup.js
│       │   ├── Dashboard.js
│       │   └── index.js
│       ├── public/
│       └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB connection string

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend client directory:
```bash
cd frontend/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Sign Up**: Navigate to the signup page to create a new account
2. **Login**: Log in with your email and password
3. **Create Tasks**: Enter a task title and click "Add" to create a new task
4. **Delete Tasks**: Click "Delete" button next to a task to remove it
5. **Logout**: Click the "Logout" button to exit your account

## API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login and receive JWT token

### Task Routes
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Database Schema

### User Schema
```javascript
{
  email: String,
  password: String
}
```

### Task Schema
```javascript
{
  title: String,
  description: String,
  completed: Boolean,
  userId: String
}
```

## Security Features

- Password hashing using bcryptjs
- JWT-based authentication
- Environment variables for sensitive data
- CORS enabled for frontend-backend communication

## Future Enhancements

- User profile management
- Task descriptions and due dates
- Task completion status toggle
- Task filtering and sorting
- Email notifications
- Dark mode theme

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Render Deployment (Backend + Frontend)

1. Push your repo to GitHub if not already.
2. Add/verify `render.yaml` in repo root.
3. In Render dashboard, click **New** > **Web Service** and select the `taskmanage` repo.
4. Backend service will be created from `backend` root with:
   - Build: `npm install`
   - Start: `npm start`
   - Env vars: `MONGO_URI`, `JWT_SECRET` (set in Render Environment settings)
5. Create a **Static Site** service from `frontend/client`:
   - Build: `npm install && npm run build`
   - Publish directory: `build`
   - Env var: `REACT_APP_API_URL=https://<backend-service>.onrender.com`
6. Wait for auto-deploy; verify log `MongoDB Connected` and `Server running on port`.

### Render env var notes
- `MONGO_URI` = production Atlas connection string
- `JWT_SECRET` = secure random
- `REACT_APP_API_URL` = backend URL from Render (e.g., `https://taskmanage-backend.onrender.com`)

## Contact

For any questions or support, please open an issue on GitHub.

---

**Built with ❤️ by Pushpa Raj Dhamala and Harsh Chavan **
