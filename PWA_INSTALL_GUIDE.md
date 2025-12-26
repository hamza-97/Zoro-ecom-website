# How to Install Zoro Rider PWA on Your Device

This guide will help you install the Zoro Rider Progressive Web App (PWA) on Android, iOS, and desktop devices.

## 📱 Android (Chrome)

### Method 1: Automatic Install Prompt
1. **Open the rider page** in Chrome on your Android device
   - URL: `http://YOUR_SERVER_IP:3000/rider.html`
   - Example: `http://192.168.2.11:3000/rider.html`

2. **Wait for the install banner**
   - A banner will appear at the bottom saying "Install Zoro Rider App"
   - Tap **"Install"** button

3. **Confirm installation**
   - Chrome will show a confirmation dialog
   - Tap **"Install"** to confirm
   - The app will be added to your home screen

### Method 2: Manual Install (Chrome Menu)
1. **Open the rider page** in Chrome

2. **Tap the 3-dot menu** (⋮) in the top-right corner

3. **Select "Add to Home screen"** or **"Install app"**
   - The exact wording depends on your Chrome version
   - Look for options like:
     - "Add to Home screen"
     - "Install app"
     - "Add to Home screen" (with a + icon)

4. **Customize the app name** (optional)
   - Chrome may let you edit the app name
   - Default: "Zoro Rider"

5. **Tap "Add"** or **"Install"**
   - The app icon will appear on your home screen

### Method 3: Chrome Address Bar
1. **Open the rider page** in Chrome

2. **Look for the install icon** in the address bar
   - It appears as a **download/install icon** (↓ or +)
   - Usually shows after the page loads

3. **Tap the install icon**
   - Follow the prompts to install

## 🍎 iOS (Safari)

### Step-by-Step:
1. **Open Safari** on your iPhone/iPad (not Chrome or other browsers)

2. **Navigate to the rider page**
   - URL: `http://YOUR_SERVER_IP:3000/rider.html`

3. **Tap the Share button** (square with arrow pointing up)
   - Located at the bottom of the screen (iPhone) or top (iPad)

4. **Scroll down and tap "Add to Home Screen"**
   - You may need to scroll through the share options

5. **Customize the app name** (optional)
   - Tap the name field to edit
   - Default: "Zoro Rider"

6. **Tap "Add"** in the top-right corner
   - The app icon will appear on your home screen

### Note for iOS:
- **Must use Safari** - Chrome on iOS doesn't support PWA installation
- The app will open in a standalone window (no browser UI)
- Notifications work better when installed as PWA

## 💻 Desktop (Windows/Mac/Linux)

### Chrome/Edge:
1. **Open the rider page** in Chrome or Edge

2. **Look for the install icon** in the address bar
   - Chrome: Install icon (usually a + or download icon)
   - Edge: App available icon

3. **Click the install icon**
   - Or go to Menu (⋮) → "Install Zoro Rider App"

4. **Click "Install"** in the popup
   - The app will open in its own window

### Firefox:
1. **Open the rider page** in Firefox

2. **Click the menu** (☰) → **"Install Site as App"**

3. **Confirm installation**
   - The app will be added to your applications

## ✅ Verify Installation

After installation, you should see:
- **App icon** on your home screen (mobile) or desktop
- **App opens in standalone mode** (no browser address bar)
- **Works offline** (basic functionality)
- **Better notification support**

## 🔧 Troubleshooting

### Install Option Not Appearing?

**On Android:**
1. **Check Chrome version** - Update to latest Chrome
2. **Clear browser cache** - Settings → Privacy → Clear browsing data
3. **Try incognito mode** - Sometimes helps reset install prompts
4. **Check if already installed** - Look for the app icon on home screen
5. **HTTPS required** - For production, site must use HTTPS (localhost/127.0.0.1 works for development)

**On iOS:**
1. **Must use Safari** - Chrome/Firefox don't support PWA on iOS
2. **iOS 11.3+ required** - Older iOS versions don't support PWAs
3. **Check if already installed** - Look for the app icon on home screen

**On Desktop:**
1. **Update browser** - Use latest Chrome/Edge/Firefox
2. **Check browser settings** - Some browsers block install prompts
3. **Try different browser** - Chrome/Edge have best PWA support

### App Not Working After Installation?

1. **Check service worker** - Open DevTools → Application → Service Workers
2. **Clear cache** - Settings → Clear browsing data → Cached images and files
3. **Reinstall** - Uninstall and reinstall the app
4. **Check console** - Look for errors in browser console

### Notifications Not Working?

1. **Grant notification permissions** - Settings → Site Settings → Notifications
2. **Install as PWA** - Notifications work better when installed
3. **Check browser settings** - Make sure notifications aren't blocked system-wide
4. **Restart the app** - Close and reopen the installed app

## 🎯 Quick Reference

| Platform | Browser | Method |
|----------|---------|--------|
| Android | Chrome | Menu (⋮) → Add to Home screen |
| iOS | Safari | Share (□↑) → Add to Home Screen |
| Windows | Chrome/Edge | Address bar install icon |
| Mac | Chrome/Edge | Address bar install icon |
| Linux | Chrome/Edge | Address bar install icon |

## 📝 Notes

- **First time install**: The install prompt may appear automatically after a few seconds
- **Already installed**: If the app is already installed, the prompt won't show
- **Offline support**: Basic functionality works offline after first load
- **Updates**: The app updates automatically when you open it (if new version available)

## 🆘 Still Having Issues?

1. **Check browser console** for errors
2. **Verify manifest.json** is accessible
3. **Check service worker** registration
4. **Try different device/browser** to isolate the issue
5. **Check network** - Make sure server is accessible

For more help, check the browser console (F12 or right-click → Inspect) for any error messages.


