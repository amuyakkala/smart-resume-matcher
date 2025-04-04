# smart-resume-matcher
# 🔍 Smart Resume Matcher – Chrome Extension

**Smart Resume Matcher** is a Chrome extension that helps job seekers instantly match their resumes to job descriptions on websites like LinkedIn. It analyzes uploaded resume PDFs, compares them to the job description from the current tab, and highlights the best-matching resume.

---

### 🧩 Problem I Was Trying to Solve

While applying to jobs, I had multiple versions of my resume and wasn’t always sure which one was the best fit for a specific job description. Manually comparing them took time and felt inefficient.

So I built **Smart Resume Matcher** — a Chrome extension that lets you upload your resumes and automatically tells you which one matches the job you’re viewing. It analyzes the job description and compares it to your resumes based on skills and keyword relevance, helping you apply faster and smarter.

---

## 💡 What Makes It Different

Most job-matching tools ask you to upload a single resume and compare it with one job at a time — that’s it.

**Smart Resume Matcher** is different because it lets you:
- Upload and store **multiple resumes**
- Paste any **job description manually**, or extract it from websites like LinkedIn
- Instantly compare it against **all your uploaded resumes**
- See which resume is the best match — no re-uploading, no repetition

It’s designed to make it faster and easier to choose the right resume for each application, right from your browser.

---

## 🚀 Features

- 📄 Upload multiple PDF resumes
- 🧠 Extracts and analyzes job descriptions from job listings (e.g., LinkedIn)
- ✅ Matches resumes based on keyword and skill overlap
- 🔍 Shows best-matching resume along with a matching score
- 📊 Displays matching and missing keywords for each resume
- 💾 Stores uploaded resumes locally for reuse
- 🗑 Easily delete or replace resumes

---

## 📁 Project Structure

- `manifest.json` – Chrome extension manifest (v3)
- `background.js` – Handles background logic and listeners
- `panel.html` – Extension side panel UI
- `panel.js` – Logic for resume matching and UI updates
- `pdf.min.js` & `pdf.worker.min.js` – PDF.js library to parse PDF resumes
- `style.css` – Custom styling for the extension panel

---

## 🛠 Installation (For Developers)

1. Clone or download this repository.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer Mode** (top right).
4. Click **“Load unpacked”** and select the `np/` folder.
5. The extension will now be visible in your browser toolbar.

---

## 📌 Usage

1. Open a job listing page (e.g., on LinkedIn).
2. Click the Smart Resume Matcher icon in your browser.
3. Upload one or more PDF resumes.
4. The extension will:
   - Extract the job description from the page
   - Analyze and score your resumes
   - Highlight the best match and key differences

---

## 🧠 Tech Stack

- JavaScript (Vanilla)
- Chrome Extension Manifest v3
- PDF.js
- HTML + CSS

---

## 📦 Future Improvements

- Add smarter AI-based matching (using NLP or LLMs)
- Support for cover letter comparison
- Option to sync resumes and results to the cloud

---

## 👨‍💻 Author

**Amulya Yakkala**  
[LinkedIn](https://www.linkedin.com/in/amulyayakkala/)  
[GitHub](https://github.com/amuyakkala)
"""
