"""Creates web-ready character cutouts from original-assets/lavanya-anime-original.png.
The original is never modified. Face, eyes and hair are untouched: only the
baked-in decorative marks (heart, orbit dot) are inpainted in the *background*,
then the frame is cropped (removing the baked-in nav/text) and edge-feathered
so the character melts into the site background."""
import cv2, numpy as np, os
from PIL import Image

SRC = "original-assets/lavanya-anime-original.png"
img = cv2.cvtColor(cv2.imread(SRC, cv2.IMREAD_COLOR), cv2.COLOR_BGR2RGB)

# 1) inpaint small decorative marks that sit in the background
mask = np.zeros(img.shape[:2], np.uint8)
for (x, y, r) in [(1208, 393, 30), (328, 608, 16), (1361, 449, 8), (1460, 497, 8)]:
    cv2.circle(mask, (x, y), r, 255, -1)
img = cv2.inpaint(img, mask, 9, cv2.INPAINT_TELEA)

# 2) crop away the HTML-like nav, script text and pill baked into the art
X0, Y0, X1, Y1 = 250, 70, 1450, 1024
crop = img[Y0:Y1, X0:X1]
h, w = crop.shape[:2]

# 3) feathered alpha so edges dissolve into the page background
def ramp(n, feather, both=True, start=True, end=True):
    a = np.ones(n, np.float32)
    t = np.linspace(0, 1, feather, dtype=np.float32)
    s = t * t * (3 - 2 * t)
    if start: a[:feather] = np.minimum(a[:feather], s)
    if end: a[-feather:] = np.minimum(a[-feather:], s[::-1])
    return a
ax = ramp(w, 170)
ay = ramp(h, 150, start=True, end=False) * 1.0
yb = np.ones(h, np.float32)
tb = np.linspace(0, 1, 230, dtype=np.float32); yb[-230:] = (tb * tb * (3 - 2 * tb))[::-1]
alpha = np.outer(ay * yb, ax)
alpha = cv2.GaussianBlur(alpha, (0, 0), 6)
rgba = np.dstack([crop, (alpha * 255).astype(np.uint8)])
out = Image.fromarray(rgba, "RGBA")
os.makedirs("public/img", exist_ok=True)
out.save("public/img/lavanya-character.webp", quality=90, method=6)
out.resize((w * 2 // 3, h * 2 // 3), Image.LANCZOS).save("public/img/lavanya-character-800.webp", quality=88, method=6)
# social preview (opaque, 1200x630 centred on face)
og = Image.open(SRC).convert("RGB").crop((336, 120, 1536 - 100, 120 + 700 * 1)).resize((1200, 630), Image.LANCZOS)
og.save("public/og-image.jpg", quality=88)
print("ok", out.size)
