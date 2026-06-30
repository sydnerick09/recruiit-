# Business Hub — Agent Recruitment Website

A professional, responsive recruitment website for **Business Hub**. It recruits
agents in **any country** to bring premium clients, with monthly pay starting from
**$300 USD**. Applicants download a document, complete it, and submit it — along
with their details — straight to your Gmail.

> **Live application email:** `businesshub.comke@gmail.com`

---

## ✨ What's included

- **One-page professional site** (`index.html`) — hero, about, how-it-works,
  benefits/pay, document download, application form, FAQ, footer.
- **Application form** with every requested field:
  - Full name, age, email, phone, **country of origin** (full dropdown), address
  - Previous profession (or “No”), marketing/other experience
  - **How did you find us?**, online-business/agent experience
  - Good with data?, where they learned computer skills
  - **File upload** — attach the completed document (edit on device, or print → fill → scan → upload)
- **Submits directly to Gmail** via [FormSubmit](https://formsubmit.co) — no server
  needed. A thank-you page (`thank-you.html`) is shown after submitting.
- **Downloadable documents** in `/documents` — a real **PDF** and editable **Word**
  file the applicant fills in and sends back.
- **Document preview** placeholder in `/assets` you can swap for your own.

---

## 📁 Project structure

```
recruit/
├── index.html                 # Main website
├── thank-you.html             # Shown after a successful submission
├── css/styles.css             # Styling (navy + gold theme)
├── js/main.js                 # Country list, mobile menu, form helper
├── assets/
│   ├── favicon.svg
│   └── document-photo.svg     # Document preview (replaceable)
├── documents/
│   ├── Business-Hub-Application.pdf
│   ├── Business-Hub-Application-Form.docx
│   └── README-replace-with-your-own.txt
├── vercel.json                # Vercel config (clean URLs + security headers)
└── README.md
```

---

## 🚀 Deploy on Vercel

This is a static site — no build step.

**Option A — Vercel CLI**
```bash
vercel            # preview deploy
vercel --prod     # production deploy
```

**Option B — GitHub + Vercel dashboard**
1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Other** · Build command: *(none)* · Output dir: `.`
4. Click **Deploy**. Every future `git push` redeploys automatically.

---

## 📨 How submissions work (important — one-time step)

The form posts to `https://formsubmit.co/businesshub.comke@gmail.com`.

The **first** time anyone submits the form, FormSubmit emails a one-time
**activation link** to `businesshub.comke@gmail.com`. Open that email once and
click the link to confirm ownership. After that, every application — including the
attached document — arrives in that inbox automatically.

To change the destination email, edit the `action="..."` URL in `index.html`
(and the `_next` thank-you page if you rename it).

---

## 📝 Replacing the downloadable document

See [`documents/README-replace-with-your-own.txt`](documents/README-replace-with-your-own.txt).
Keep the same file names and re-deploy.
