# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



User Management System – Frontend

This is the frontend part of the User Management System built using React.
It provides UI screens to view, create, edit, delete, and view details of users.

The frontend communicates with the backend via REST APIs.


✨ Features

User list in table format

Create & update users using modal form

View user details page

Delete users

Client-side validations

Responsive design (desktop & mobile)

Clean and simple UI


🧰 Tech Stack Used

React (Vite)

React Router DOM

Tailwind CSS

JavaScript

Fetch API

Lucide Icons


📍 Geo-Location Handling (Frontend Logic)

In real applications, users do not manually enter latitude and longitude.

So in this project:

User enters city name

Frontend fetches latitude & longitude automatically

Geo data is sent to backend while creating/updating a user

This improves usability and reflects real-world application behavior.

⚙️ Setup Instructions (Frontend)
1️⃣ Clone Repository
git clone <frontend-repo-url>
cd frontend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables

Create a .env file:

VITE_API_URL=http://localhost:4000/api/user

4️⃣ Run the App
npm run dev


App runs at:

http://localhost:5173

📱 Responsive Design

Desktop → Table-based layout

Mobile → Optimized spacing & alignment

No animations used (kept simple)

🧠 What I Learned

React CRUD operations

Form validation

API integration

Handling real-world geo-location use cases

Responsive UI using Tailwind CSS