NEVA COMPLETE WEBSITE — GitHub Pages edition
============================================

This ZIP contains a COMPLETE Neva frontend (not a 2-file patch).
It is based on the last complete Neva Aero Social Basics files available in this chat,
with the original compact dock, seven animated bubbles including Friends & Chat,
Aero wallpaper, Watch, Clips, Library, My Space, Upload and social screens.
It also includes your supplied Neva home-screen audio and an optional music player.

PUBLISH ON GITHUB PAGES
-----------------------
1. Backup your current Neva repository first: Code > Download ZIP.
2. Extract this ZIP on your computer.
3. Open the 'neva-complete' folder. index.html, styles.css and script.js are immediately inside.
4. GitHub -> your existing repository (mcpug773/Neva) -> Add file -> Upload files.
5. Upload the CONTENTS of neva-complete, not another nested folder and not the ZIP.
   Replace matching files and Commit changes. For directories (icons, database),
   preserve their paths. If browser upload does not preserve folders, use GitHub Desktop.
6. GitHub -> Settings -> Pages: main branch, /(root).
7. Site address: https://mcpug773.github.io/Neva/
   Do not create a new repository for each update.

SUPABASE CONNECTION (IMPORTANT)
------------------------------
This package deliberately DOES NOT contain your real publishable key.
To use real public video uploads and existing accounts, copy YOUR WORKING config.js
from your current LIVE Neva source folder into 'neva-complete' BEFORE uploading.
You may alternatively edit config.js to contain the Supabase project URL and a PUBLIC
sb_publishable_ key. NEVER put a secret key or service_role key in a website.

Your known bucket spelling from earlier versions is nevo-vidoes (not neva-videos).
Don't rename or delete it without updating Supabase policies and the upload code.
Your live uploaded videos and account data remain in Supabase, not in this ZIP.

If the Social tables/functions are already present, do not rerun SQL blindly.
If setting up from zero, see database/ for the existing schema scripts; review them
before use. Anonymous Sign-Ins must be enabled in Supabase to post using a guest username.

WHAT WORKS WITHOUT SUPABASE
---------------------------
Home screen; seven bubble animations; dock; curated external videos; basic Watch
and Clips browsing; sample video links; home music after first tap; local Library.
Posting, public profile statistics, friend requests and private messages need a
working Supabase connection and appropriate database policies/functions.

LIMITATIONS
-----------
- This is a best-effort assembled complete site from a saved earlier Neva version;
  I could not fetch your current GitHub repository and therefore cannot promise that
  every recent personal change has been preserved. Keep your GitHub backup.
- Username-only guest sessions are tied to a device/browser and are not secure
  cross-device accounts. Do not rely on them for recovering a profile.
- YouTube/TikTok embeds may be restricted by the original platform.
- Audio won't autoplay with sound on first page load until the user taps.
- You supplied the audio. Check that you have permission to publish that music
  before distributing Neva publicly or submitting it to an app store.
- The .well-known/assetlinks.json file for Google Play is NOT included, as it
  must match your Android signing certificate and domain separately.
