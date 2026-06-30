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
  - File picker to remember the completed document (attached in the email)
- **Opens the applicant's email app on Submit** — the form builds a ready-to-send
  message (all answers pre-filled, addressed to your Gmail). No backend, no signup,
  no activation. The applicant attaches their document and presses Send.
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

## 📨 How submissions work

No backend, no signup, no activation. When the applicant clicks **Submit**,
`js/main.js` gathers every answer, builds an email addressed to
`businesshub.comke@gmail.com`, and opens the applicant's own email app (Gmail,
Mail, Outlook, etc.) with the subject and body pre-filled. The applicant then
**attaches their completed document** and presses **Send** — the email arrives
from their own address, straight to your inbox.

If no email app opens, a fallback panel appears with an **Open in Gmail** button,
an **Open default email app** link, and a **Copy my details** button.

> **Note on attachments:** browsers cannot auto-attach a file to an email for
> security reasons, so the applicant attaches the document themselves in the
> message that opens (the form reminds them, and includes the file name).

To change the destination email, edit the `RECIPIENT` value at the top of the
form logic in [`js/main.js`](js/main.js).

---

## 📝 Replacing the downloadable document

See [`documents/README-replace-with-your-own.txt`](documents/README-replace-with-your-own.txt).
Keep the same file names and re-deploy.
