pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
    let db;

    const TECH_SKILLS = [
      "python", "java", "c++", "c#", "javascript", "typescript", "html", "css", "react",
      "node.js", "next.js", "angular", "vue", "svelte", "express", "spring boot", "django",
      "flask", "dotnet", ".net", "fastapi", "kotlin", "go", "ruby", "rails",
      "sql", "postgresql", "mysql", "mongodb", "redis", "oracle", "sqlite",
      "aws", "gcp", "azure", "docker", "kubernetes", "terraform", "ansible", "jenkins",
      "git", "github", "gitlab", "bitbucket", "jira", "figma", "graphql", "rest", "grpc",
      "linux", "bash", "shell", "powershell", "ci/cd", "unit testing", "integration testing"
    ];

    window.onload = () => {
      const request = indexedDB.open("ResumeMatcherDB", 1);
      request.onerror = (event) => console.error("❌ IndexedDB error:", event.target.errorCode);
      request.onupgradeneeded = (event) => {
        db = event.target.result;
        db.createObjectStore("resumes", { keyPath: "name" });
      };
      request.onsuccess = (event) => {
        db = event.target.result;
        document.getElementById("upload-btn").addEventListener("click", handleUpload);
        document.getElementById("match-btn").addEventListener("click", matchResumesToJD);
        document.getElementById("delete-all-btn").addEventListener("click", deleteAllResumes);
        renderStoredResumes();
      };
    };

    async function parsePDF(file) {
      const data = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ');
      }
      return { name: file.name, content: text || "No text extracted from this resume." };
    }

    async function storeResume(resume) {
      return new Promise((resolve, reject) => {
        const tx = db.transaction("resumes", "readwrite");
        const store = tx.objectStore("resumes");
        const req = store.put(resume);
        req.onsuccess = () => resolve();
        req.onerror = (e) => reject(e);
      });
    }

    async function handleUpload() {
      const files = document.getElementById("file-input").files;
      if (!files.length) return alert("Upload at least one PDF.");
      for (const file of files) {
        try {
          const parsed = await parsePDF(file);
          await storeResume(parsed);
        } catch (e) {
          console.error("❌ Error parsing/storing PDF:", file.name, e);
        }
      }
      renderStoredResumes();
    }

    function deleteAllResumes() {
      const tx = db.transaction("resumes", "readwrite");
      const store = tx.objectStore("resumes");
      store.clear().onsuccess = () => renderStoredResumes();
    }

    function deleteResumeByName(name) {
      const tx = db.transaction("resumes", "readwrite");
      const store = tx.objectStore("resumes");
      store.delete(name).onsuccess = () => renderStoredResumes();
    }

    function renderStoredResumes() {
      const list = document.getElementById("resume-list");
      list.innerHTML = '';
      const tx = db.transaction("resumes", "readonly");
      const store = tx.objectStore("resumes");
      store.getAll().onsuccess = (e) => {
        e.target.result.forEach(resume => {
          const li = document.createElement("li");
          li.textContent = resume.name;
          const del = document.createElement("button");
          del.textContent = "❌";
          del.onclick = () => deleteResumeByName(resume.name);
          li.appendChild(del);
          list.appendChild(li);
        });
      };
    }

    function extractSkillsFromJD(jdText) {
      const words = jdText.toLowerCase().split(/\W+/);
      return TECH_SKILLS.filter(skill => words.includes(skill));
    }

    function getSkillMatch(resumeText, skills) {
      const words = new Set(resumeText.toLowerCase().split(/\W+/));
      const matched = skills.filter(skill => words.has(skill));
      return { score: matched.length, keywords: matched };
    }

    function matchResumesToJD() {
      const jdText = document.getElementById("jd-input").value.trim();
      if (!jdText) return alert("Paste a job description first.");
      const skills = extractSkillsFromJD(jdText);
      const tx = db.transaction("resumes", "readonly");
      const store = tx.objectStore("resumes");
      store.getAll().onsuccess = (e) => {
        const results = e.target.result.map(r => {
          const match = getSkillMatch(r.content, skills);
          return {
            name: r.name,
            content: r.content,
            score: match.score,
            keywords: match.keywords
          };
        });

        const max = Math.max(...results.map(r => r.score), 1);
        const norm = results.map(r => ({ ...r, normScore: Math.round((r.score / max) * 100) }))
                            .sort((a, b) => b.normScore - a.normScore);

        const list = document.getElementById("match-results");
        list.innerHTML = '';
        norm.forEach(r => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${r.name}</strong> → Score: ${r.normScore}<br><small>Matched: ${r.keywords.join(', ')}</small>`;
          const view = document.createElement("button");
          view.textContent = "View";
          view.onclick = () => showResume(r.content);
          const dl = document.createElement("button");
          dl.textContent = "Download";
          dl.onclick = () => downloadResume(r.name, r.content);
          li.appendChild(view);
          li.appendChild(dl);
          list.appendChild(li);
        });
      };
    }

    function showResume(text) {
      const viewer = document.getElementById("resume-viewer");
      const section = document.getElementById("viewer-section");
      viewer.textContent = text || "No content found.";
      section.style.display = "block";
      section.scrollIntoView({ behavior: "smooth" });
    }

    function downloadResume(filename, content) {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename.replace('.pdf', '.txt');
      a.click();
      URL.revokeObjectURL(url);
    }