NEVA — GITHUB UPDATE: QUIET MUSIC + WINDOWS AERO FRIENDS

WHAT CHANGED
- Home soundtrack attempts to play when Neva opens. It is much quieter (18% volume), loops and has the existing on/off button.
- Browser autoplay rules can block sound before the first tap. Press Browse without signing in, Enter Neva, or the music button to unlock it. This is a browser restriction, not a Neva error.
- Neva's soundtrack pauses as soon as you play a video, go into Watch/Clips, open upload, or switch away from Home. It resumes automatically on Home if not manually turned off.
- People & Chat is now laid out as a Windows Explorer-style window, matching My Space with a toolbar, sidebar, window controls and glossy panes.
- Original video upload, likes, follows, messages, user IDs and Supabase database code have not been intentionally changed.

HOW TO UPDATE ON GITHUB PAGES
1. Keep a backup of your currently working GitHub repository first.
2. Open your existing GitHub repository mcpug773/Neva (do not create another repository).
3. Upload the CONTENTS of this extracted folder into the repository ROOT (index.html must be at the root) and overwrite same-name files.
4. Commit changes; GitHub Pages redeploys from the main branch.
5. Refresh the site https://mcpug773.github.io/Neva/ . Installed apps can need a close/reopen before the updated service worker takes over.
6. Test Home music, watch a video to confirm it pauses, then open People & chat to see the new Windows-style layout.

CAVEATS
- Audible autoplay before the first user gesture is blocked by many browsers, particularly on phones. The app handles the restriction gracefully.
- The supplied MP3 is bundled. Use publicly only if you have permission/rights to distribute this recording.
- GitHub Pages cannot execute Netlify server functions. The username/password login flow from the existing version is NOT fixed by this design update; guest sign-in remains a separate flow.
- config.js holds a public Supabase publishable key (fine for client-side use). NEVER publish service_role or secret API keys.
- The custom profile picture in this version is saved in this device's browser, not synced between devices.
- No existing account data or videos in Supabase are changed by this download.
