NEVA WINDOWS 7 WALLPAPER + MUSIC UPDATE (2 November 2026)

WHAT CHANGED
- Profile > Personalise Neva: 3 wallpapers, upload your own, 4 window colours.
- Settings saved locally on the current device/browser (not shared between friends).
- A view is recorded when a person clicks to open a video, rather than after 2 seconds watching.
- Autoplaying/scrolling Clips do not automatically generate views. The existing Supabase neva_record_view function controls whether another click can count for the same user.
- Home-screen music from the supplied file plays on Home, Profile, Chat and Library, after a user tap; it stops for videos/Clips and other dialogs. Sound button on dock; moderate default 45% and adjustable 10–60%.
- A modest Windows 7-style glass/taskbar polish, original bubble navigation preserved.

HOW TO UPDATE GITHUB PAGES
1. Back up or download your current GitHub repository first.
2. In your GitHub Neva repository, upload the CONTENTS of this folder to the repository root, replacing matching files. Do not create a nested folder.
3. IMPORTANT: This ZIP deliberately does NOT include config.js. KEEP YOUR ALREADY-WORKING config.js, which contains your public Supabase project settings. Do not delete it. Never upload secret/service-role keys.
4. Commit changes. Settings > Pages must deploy from main / (root).
5. Open https://mcpug773.github.io/Neva/ and test My Space > Personalise, music, and playback.
6. When changing wallpaper or music prefs, changes are saved on that device only.

IMPORTANT: This version retains the earlier login system. Username/password creation still needs its secure server function and will not start working just because you upload this folder to GitHub Pages. Existing guest identities on the same device can still work with Supabase when config.js is correctly set up.

If your live GitHub files have changed since the Neva Aero Social Basics version, compare files before replacing them, to avoid reverting other newer features. The ZIP is a complete updated copy of the last full baseline available to us, NOT a verified copy of your currently deployed GitHub revision.

Copyright note: If you share Neva publicly, ensure you have rights to use the supplied theme recording.
