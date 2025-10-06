# HTML Quiz Bot — VDO Test - 08

This repository contains a simple static **HTML/CSS/JS** interactive quiz (VDO Test style) that you can host on **Render / Netlify / Vercel** as a static site.

## Files
- `index.html` — main page (quiz UI)
- `style.css` — styles
- `script.js` — quiz logic (questions, timer, navigation, scoring)
- `README.md` — this file
- `app.json` — basic Render static-site meta

## How to use
1. Create a new GitHub repository (e.g., `quiz-bot`) and push these files to it.
2. On Render (or Netlify/Vercel) create a **Static Site** and connect your GitHub repo.
3. Deploy — there is no build step; it's a static site and will serve `index.html`.

## Customization
- Edit the `questions` array in `script.js` to add/remove questions or change correct answers.
- Adjust `examInfo.test_duration` to change time (in minutes).

## License
Free to use and modify.
