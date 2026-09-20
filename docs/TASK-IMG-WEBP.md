# TASK-IMG-WEBP — Convert project screenshots to WebP

**Audience:** an AI coding agent. Scoped to be finishable and verifiable in one session.
**Prerequisite:** none. The OG image, favicon and `me.png` were already handled separately — **do not touch them**.

---

## 0. RULES

1. `sharp@0.34.3` is already installed. Use it. **Do not add any npm dependency.**
2. Do not change any component, stylesheet, or locale file. This task touches **image files** and **one data file**.
3. Every path in `lib/data/projects.ts` must keep matching a real file **case-sensitively**. Windows is case-insensitive and Vercel is not — a wrong-case path works locally and 404s in production. This repo has already shipped that bug four times.
4. Do not commit or push.
5. Finish with `npx tsc --noEmit`, `npm run lint` and `npm run build` all clean.

---

## 1. WHAT TO CONVERT

Everything under `public/projects/` — 18 files, ~4.8 MB.

```
public/projects/Caros/Caros-Macbook-Pro-16.png          1992 KB
public/projects/RealEstate/real-estate-MacbookPro16.png  844 KB
public/projects/e-commerce/ecommerce-MacbookPro.png      464 KB
public/projects/Caros/Caros-iPad-Pro-11.png              277 KB
public/projects/iPhone/Macbook-Pro-16.png                216 KB
public/projects/iPhone/iPhone-15-Pro.png                 174 KB
public/projects/Scripto/scripto.png                      126 KB
public/projects/RealEstate/realestate-ipadpro11.png      125 KB
public/projects/Caros/Caros-iPhone-15-Pro.png            110 KB
public/projects/iPhone/iPad-Pro-11.png                    98 KB
public/projects/Scripto/scripto-light-iPadpro11.png       98 KB
public/projects/e-commerce/ecommerce-categories-light-iphone.png  94 KB
public/projects/Scripto/scripto-iPadPro11.png             64 KB
public/projects/RealEstate/realestate-iphone.png          64 KB
public/projects/e-commerce/ecommerce-light-iPhone15Pro.png 47 KB
public/projects/e-commerce/ecommerce-light-iPadpro11.png   46 KB
public/projects/Scripto/scripto-iPhone.png                28 KB
public/projects/placeholder.jpg                           20 KB
```

### Do NOT touch

- `public/mockups/*.webp` — device frames used by `RealisticDeviceMockup`. Already WebP, and re-encoding risks their transparency.
- `public/me.png`, `public/og-image.png`, `public/logos/**` — already optimised.
- `public/YamenJoha-CV.pdf`.

---

## 2. STEPS

### 2.1 Convert

For each file above, write a `.webp` sibling **with the same basename and the same case**, then delete the original.

```js
// scripts/to-webp.mjs  (delete this file when the task is done)
import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname } from 'path';

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

for (const src of walk('public/projects')) {
  if (!/\.(png|jpe?g)$/i.test(src)) continue;
  const out = src.slice(0, -extname(src).length) + '.webp';
  const buf = await sharp(src).webp({ quality: 82, effort: 5 }).toBuffer();
  const { writeFileSync } = await import('fs');
  writeFileSync(out + '.tmp', buf);
  renameSync(out + '.tmp', out);   // sharp keeps the source open; write via .tmp
  unlinkSync(src);
  console.log(src, '->', out);
}
```

**Do not resize.** Keep every image's pixel dimensions exactly as they are. Only the container format changes.

If any single output ends up *larger* than its source, keep the original file instead and say so in the report.

### 2.2 Update the one data file

In `lib/data/projects.ts`, change every `desktopImage` / `mobileImage` / `tabletImage` value ending in `.png` or `.jpg` to `.webp`. **Only the extension changes** — the directory and the basename casing stay byte-identical.

There is also one fallback in `components/project/ProjectCard.tsx`:
`project.desktopImage ?? "/projects/placeholder.jpg"` → `.webp`. This is the **only** component change permitted by this task.

---

## 3. VERIFY — all four must pass

**3.1 Every referenced image exists, case-sensitively:**

```bash
python - <<'PY'
import io,re,os
s=io.open('lib/data/projects.ts',encoding='utf-8').read()
cur=None; bad=0
for line in s.splitlines():
    m=re.search(r'id: "([^"]+)"',line)
    if m: cur=m.group(1)
    m=re.search(r'(desktopImage|mobileImage|tabletImage): "(/projects/[^"]+)"',line)
    if m:
        d,f=os.path.split('public'+m.group(2))
        if f not in (os.listdir(d) if os.path.isdir(d) else []):
            print("MISSING",cur,m.group(1),m.group(2)); bad+=1
print("broken paths:",bad)
PY
```

Must print `broken paths: 0`.

**3.2 No stale references anywhere:**

```bash
grep -rn "/projects/.*\.\(png\|jpg\|jpeg\)" app components lib utils --include='*.ts' --include='*.tsx'
```

Must return nothing.

**3.3 No orphaned files** — nothing left under `public/projects/` that is not `.webp`.

**3.4 Build:** `npx tsc --noEmit`, `npm run lint`, `npm run build` all clean.

---

## 4. REPORT

Append a dated section to `docs/PROGRESS.md` with:
- before/after total size of `public/projects/`
- the per-file savings table
- any file kept as the original because WebP was larger
- confirmation that the verification in §3 passed

Then **stop**. Delete `scripts/to-webp.mjs`.
