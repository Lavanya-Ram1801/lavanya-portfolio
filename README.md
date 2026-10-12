# Lavanya R — Portfolio

React + TypeScript + Vite portfolio with a semi-realistic anime hero, built around Lavanya's supplied character artwork.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build locally
```

Requires Node 18+ (Node 20/22 recommended).

## Add your resume (the buttons stay hidden until you do)

Put your PDF at **`public/Lavanya_R_Resume.pdf`** and restart `npm run dev` (or rebuild).
The "VIEW RESUME" buttons in the hero and contact sections appear automatically when the file exists,
so the site never links to a missing file.

## The character image

- Your original artwork is preserved, untouched, at `original-assets/lavanya-anime-original.png`.
- `scripts/process-image.py` makes the web versions in `public/img/`:
  it crops away the baked-in nav / script text / pill, removes a few small decorative marks from the
  *background only*, and feathers the edges so she blends into the page. Her face, eyes and hair are not modified.
- Re-run it with `npm run process-image` (needs Python 3 with `pillow`, `numpy`, `opencv-python`).
- `public/og-image.jpg` (social preview) is generated from the same file.

### About the eye tracking

The artwork is a single flattened illustration. Moving only the pupils would require redrawing the eyes
and would distort her face, so that is **not** done. Instead, on mouse devices the whole portrait
turns very slightly toward the cursor with layered parallax (glow, orbit lines, portrait). Touch devices get a calm idle float.
Everything respects `prefers-reduced-motion`.

If you later get layered artwork (separate eyes/pupils), `src/components/Character.tsx` is the place to add them.

## Editing content

| What | Where |
| --- | --- |
| Name, email, links, education, experience, certifications | `src/data/profile.ts` |
| Projects (text, tech, repo / live links) | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Colours (CSS custom properties) | `src/styles/tokens.css` |

**Project links:** only VeriFlow has a GitHub URL. When K-LINK AI or the Quiz get a repo or deployment,
add `repo:` / `live:` to that project in `projects.ts`; the buttons render automatically.

**Project previews** (`src/components/ProjectPreviews.tsx`) are illustrative HTML/CSS mock-ups, labelled as such on the page.
They are not screenshots and contain no real data or metrics. Swap in real screenshots whenever you like.

## SEO

Title, description, Open Graph / Twitter tags, theme colour and the LR favicon are in `index.html` and `public/favicon.svg`.
After deploying, change `og:image` to an absolute URL on your domain (e.g. `https://your-site.com/og-image.jpg`).

## Structure

```
src/
  components/   Navbar, Hero, Character, CustomCursor, About, Projects (+ProjectPreviews),
                Skills, Experience, Education, Certifications, Contact, Footer, ...
  data/         profile.ts, projects.ts, skills.ts
  hooks/        useReducedMotion, useActiveSection, useReveal
  styles/       tokens, base, hero, sections
```

No animation library is used: motion is CSS + IntersectionObserver + requestAnimationFrame, which keeps the bundle small.
