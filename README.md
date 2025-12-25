# Chat-app

**Chat-app** is a full-stack Real-Time Language Exchange and Communication application built with **React**, **React Query**, **Node.js**, **Express**, and **Stream SDK**.  
It supports instant messaging, video calls, friend requests, and delivers a clean, responsive user experience for real-time communication.

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Backend Setup](#backend-setup)  
   - [Frontend Setup](#frontend-setup)  
5. [Environment Variables](#environment-variables)  
6. [Usage](#usage)  
7. [Contribution](#contribution)  
8. [License](#license)  
9. [Contact](#contact)

---

## Features

- Real-Time Chat with Instant Messaging  
- Friend Requests & Connections  
- Video Calling Support  
- Clean and Responsive UI  
- Efficient Data Fetching with React Query  
- Stream SDK for Real-Time Messaging and Video Infrastructure

---

## Tech Stack

| Layer        | Technologies |
|--------------|--------------|
| Frontend     | React, React Query |
| Backend      | Node.js, Express |
| Real-Time    | Stream SDK |
| Database     | (MongoDB) |
| Video Calls  | Stream’s Video APIs |
| State Mgmt   | React Query |

---

## Project Structure

Chat-app/<br/>
├── backend/ # Express API & server<br/>
│ ├── controllers/ # Business logic<br/>
│ ├── models/ # Database models<br/>
│ ├── routes/ # API endpoints<br/>
│ ├── middleware/ # Auth & helpers<br/>
│ ├── utils/ # Utility functions<br/>
│ ├── server.js # Backend entrypoint<br/>
│ └── package.json<br/>
├── frontend/ # React application<br/>
│ ├── public/<br/>
│ ├── src/<br/>
│ │ ├── components/ # UI components<br/>
│ │ ├── pages/ # Application views<br/>
│ │ ├── services/ # API & Stream client config<br/>
│ │ ├── App.js # Main app<br/>
│ │ └── index.js # Root<br/>
│ └── package.json<br/>
├── .gitignore<br/>
└── README.md<br/>



---

## Getting Started

Use these steps to run the project locally.

---

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v16+ recommended)  
- **npm** or **yarn**  
- A database service (e.g., **MongoDB Atlas** or local MongoDB)  
- **Stream Account & API Keys** (for messaging + video infrastructure)  

---

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend


install dependencies

npm install

Create a .env in backend with environment variables (see below).

Start the backend server:

npm run dev

Frontend Setup

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Create a .env in frontend (if applicable) with environment variables.

Start the React dev server:

npm start


Usage

Register a new user or log in

Add or accept friend requests

Open a chat with a connected friend

Send instant messages

Initiate video calls (Stream SDK powered)


Contact

Muhammad Saad ibn Maqsood
GitHub: https://github.com/MuhammadSaadibnMaqsood
