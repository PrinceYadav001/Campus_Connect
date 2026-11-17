# Campus Connect

<img width="1919" height="971" alt="Campus Connect Preview" src="https://github.com/user-attachments/assets/7f2fff42-04f3-4ff6-880e-5a52d87054e1" />

## Live Demo

<p align="center">
  <a href="https://campus-connect-jp4w.onrender.com/" target="_blank">
    <img src="https://img.shields.io/badge/Visit-Live%20Site-blue?style=for-the-badge&logo=google-chrome" />
  </a>
</p>

**Explore the platform:**  
https://campus-connect-jp4w.onrender.com/

> Where campus minds connect, collaborate, and conquer.

## Overview

Campus Connect is a full-stack community platform designed to help students connect, collaborate, and share knowledge. It provides a collaborative environment where students can discuss technical challenges, share solutions, and recognize meaningful contributions.

The platform enables students to:

- Post problems and technical challenges.
- Share solutions and knowledge.
- Collaborate with peers.
- Gain recognition through community contributions.

This project is a rebranded and enhanced version of a problem-solving platform, built using modern web technologies.

## Tech Stack

- **Frontend:** EJS, Bootstrap 5, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Passport.js
- **File Uploads:** Multer, Cloudinary
- **Session Storage:** MongoStore

## Features

- **User Authentication:** Secure user registration and login functionality.
- **Problem Management:** Create, publish, and browse problems.
- **Solution Sharing:** Add solutions and share knowledge with the community.
- **Upvoting System:** Upvote useful solutions to highlight valuable contributions.
- **Leaderboard:** Recognize active users based on their contributions.
- **User Profiles:** Personalized profiles featuring skills, GitHub, and LinkedIn links.
- **Modern UI:** Clean interface featuring glassmorphism design.
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices.

## Project Structure

```text
Campus_Connect/
│── controllers/
│── models/
│── routes/
│── views/
│── public/
│── utils/
│── init/
│── app.js
│── package.json
│── .env
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/PrinceYadav001/Campus_Connect.git
cd Campus_Connect
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
MONGO_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
SESSION_SECRET=your_secret
```

### 4. Run the Application

```bash
node app.js
```

The application will be available at:

```text
http://localhost:3000
```

## Testing Workflow

Follow these steps to explore the platform's core functionality:

1. Register a new user account.
2. Create and publish a problem.
3. Add a solution to an existing problem.
4. Upvote useful solutions.
5. Explore the leaderboard.
6. Visit user profiles and review contribution statistics.

## Future Improvements

- Real-time chat functionality.
- Notification system.
- AI-powered problem suggestions.
- Dark and light theme toggle.

## Author

**Prince Yadav**

- **Role:** MERN Stack Developer
- **Education:** B.Tech in Computer Science and Engineering (2027)

## GitHub Repository

[Campus Connect – GitHub Repository](https://github.com/PrinceYadav001/Campus_Connect)

## Support

If you find this project useful, consider giving the repository a star on GitHub. Your support and feedback are appreciated!
