# RespiraAI — Two UI Screens

This is a React + Vite frontend for the two requested screens:
1. Welcome / account-type selection
2. Patient Clinical Assessment

## Run locally
1. Install Node.js if it is not already installed.
2. Open this folder in VS Code.
3. Open Terminal in the project folder and run:
   npm install
   npm run dev
4. Open the localhost URL printed by Vite.

## Notes
- This is a frontend-only implementation. No backend, medical AI, real X-ray upload, or doctor services are connected.
- The assessment form saves entered values to sessionStorage for this browser session.
- The sidebar includes placeholder navigation for the other team members' sections.
- To integrate into the team's existing project, share `src/App.jsx` and `src/style.css` with the team and adapt routing as needed.
