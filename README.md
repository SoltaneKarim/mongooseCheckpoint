# My MERN App - ACEF

## Overview
This is my MERN stack application, fully developed and tested locally. The app uses MongoDB Atlas for the database.

## Local Setup
1. Clone the repo
2. Run `npm install` in both `client` and `server` folders
3. Set environment variables (like `MONGO_URI`) in `.env`
4. Start backend: `node index.js`
5. Start frontend: `npm start` in `client` folder

## Deployment
Deployment on Azure Web App was intended, but the Azure for Students subscription blocks deploying in available regions. The app is ready for deployment in a supported environment.
3️⃣ Push your code
bash
Copy code
git init
git add .
git commit -m "Ready for checkpoint submission"
git branch -M main
git remote add origin https://github.com/aceflaatiri-dev/my-mern-app.git
git push -u origin main
