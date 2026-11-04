NEVA ORIGINAL DOCK + WALLPAPER CHANGER + SHARP BUBBLE ICONS

This is a ONE-FILE PATCH. It does NOT replace your website or Supabase setup.

1. Open your GitHub Neva repository at github.com/mcpug773/Neva
2. In the SAME folder as your working index.html, upload the NEW neva-ui-update.js from this ZIP.
   If the older neva-ui-update.js already exists, choose to REPLACE it.
3. Edit index.html (pencil icon). Near </body>, replace the old script line with:

   <script src="./neva-ui-update.js?v=2" defer></script>

   IMPORTANT: Use only ONE line for neva-ui-update.js, and don't add it twice.
4. Commit the change. Open your GitHub Pages Neva and hard refresh.

RESULTS
- The previous injected dock layout is removed so the ORIGINAL dock and original navigation CSS come back.
- The small palette button in the top bar opens the wallpaper and colour changer.
- Choose the original wallpaper, Aero wallpaper, purple, green, sunset, or upload a photo.
- Bubble glyphs become fresh, resolution-independent SVGs; bubble animations remain.
- Uploaded wallpapers are saved only in THIS browser/device, not to other users' accounts.
- No login/video upload/social features are edited.

If your original dock was deleted from index.html (not merely restyled),
this patch cannot recreate the exact original markup. Restore it from an older
working index.html or send your current ZIP to get a targeted repair.

The bundled PREVIEW is only for local testing, not for GitHub upload.
