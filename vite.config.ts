import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

// The "View resume" buttons only render when the PDF really exists, so the
// site never links to a missing file. Drop Lavanya_R_Resume.pdf into /public
// and restart `npm run dev` / re-run `npm run build`.
const hasResume = existsSync(resolve(process.cwd(), 'public/Lavanya_R_Resume.pdf'))

export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
  },
})
