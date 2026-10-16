NEVA 2000s / USERNAME UPDATE – 15 October 2026

WHAT CHANGED
• Replaced the nonworking Netlify username/password welcome screen with username-only guest entry.
• Added a seventh PS Vita-style bubble: Friends & Chat (with your supplied blue people icon).
• Uses your supplied 104749 image as the fallback thumbnail for ALL video cards and Clips when no thumbnail exists, or a remote image fails.
• Small 2000s font/glass polish. Windows-style profile, videos, uploads, custom avatars and home-screen music remain.
• Service worker cache version incremented so installed copies can retrieve new assets.

TO PUBLISH ON GITHUB PAGES
1. Open your existing GitHub repository mcpug773/Neva. DO NOT create another repository.
2. Upload all of the files INSIDE this folder into the top level of the repository (the same level as index.html). GitHub may ask to replace existing files; that's expected.
3. Use Commit changes. GitHub Pages (main / root) will rebuild your same address:
   https://mcpug773.github.io/Neva/
4. Refresh; if the installed app still shows old files, fully close and reopen it or clear its cache.
5. Check that the updated friends icon, default thumbnail, and username welcome work.

ACCOUNT LIMITATIONS
• Username-only uses Supabase Anonymous Sign-Ins, not a secure password account.
• You must have working PUBLIC Supabase config.js and Anonymous Sign-Ins enabled.
• Neva's existing username-claim RPC / social database setup still needs to be installed for unique names, friends and chats.
• Identity is tied to browser storage. Clearing browser data or changing devices may lose the account and access to its uploads/friends.
• Do not promise account recovery or cross-device login with username-only profiles.

IMPORTANT
• This version includes your existing public Supabase project URL and publishable key from the working website. NEVER put the Supabase service-role or secret key on GitHub.
• Home music is included from your supplied recording; obtain permission if distributing it publicly and you don't own the rights.
• No database schema changes are required specifically for these cosmetic changes.
• This does not publish to GitHub or your Android app automatically.
