# smart-resume-matcher
# 🔍 Smart Resume Matcher – Chrome Extension

**Smart Resume Matcher** is a Chrome extension that helps job seekers instantly match their resumes to job descriptions on websites like LinkedIn. It analyzes uploaded resume PDFs, compares them to the job description from the active tab, and highlights the best-matching resume.

---

## 🚀 Features

- 📄 Upload multiple PDF resumes
- 🧠 Extracts and analyzes job descriptions from job listings (e.g., LinkedIn)
- ✅ Matches resumes based on keyword and skill overlap
- 🔍 Shows best-matching resume along with matching score
- 📊 View matching and missing keywords for each resume
- 💾 Stores uploaded resumes locally for reuse
- 🗑 Easily delete or replace resumes

---

## 📁 Project Structure

- `manifest.json` – Chrome extension manifest (v3)
- `background.js` – Handles background logic and listeners
- `panel.html` – Extension side panel UI
- `panel.js` – Logic for rendering matching resumes and UI interactions
- `pdf.min.js` & `pdf.worker.min.js` – PDF.js library for reading resume content
- `style.css` – Extension panel styling

---

## 🛠 Installation (For Developers)

1. Clone or download this repository.
2. Go to `chrome://extensions/` in your browser.
3. Enable **Developer Mode** (top right).
4. Click **“Load unpacked”** and select the `np/` folder.
5. The extension will now be available in your browser toolbar.

---

## 📌 Usage

1. Click the extension icon on a job listing page (e.g., LinkedIn).
2. Upload your PDF resumes.
3. The extension will extract the job description from the page.
4. It will analyze all resumes and show:
   - The best matching one
   - Matching and missing skills
   - Option to download or replace

---

## 🧠 Tech Stack

- JavaScript (Vanilla)
- Chrome Extension Manifest v3
- PDF.js (for reading resumes)
- HTML/CSS

---

## 📦 Future Improvements

- Integrate AI/LLM for smarter context matching
- Add support for cover letter matching
- Cloud sync for resumes and scores

---

## 👨‍💻 Author

**Amulya Yakkala**  
[LinkedIn](https://www.linkedin.com/in/amulyayakkala/)  
[GitHub](https://github.com/amuyakkala)

---

## 📝 License

MIT License
