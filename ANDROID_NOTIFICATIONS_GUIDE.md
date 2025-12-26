# How to Enable Notifications on Android for Zoro Rider App

## Quick Steps for Android Users

### Method 1: Automatic (Recommended)
1. **Open the rider page** in **Chrome browser** on your Android device
   - URL: `http://YOUR_SERVER_IP:3000/rider.html`
   - **Important**: Use Chrome browser (not Firefox, Opera, etc.)

2. **Login** with your rider credentials
   - The app will automatically request notification permission
   - Tap **"Allow"** when prompted

3. **Install as PWA** (Progressive Web App) for best experience:
   - Tap the **3-dot menu** (⋮) in Chrome
   - Select **"Add to Home screen"** or **"Install app"**
   - This installs the app on your home screen

4. **Notifications are now enabled!** ✅
   - You'll receive push notifications when new orders are available

### Method 2: Manual Enable (If notifications were blocked)

If you previously denied notifications, follow these steps:

1. **Open Chrome Settings**:
   - Tap the **3-dot menu** (⋮) in Chrome
   - Go to **Settings** → **Site Settings** → **Notifications**

2. **Find Zoro Rider**:
   - Look for your server URL (e.g., `http://192.168.2.11:3000`)
   - Or search for "Zoro" in the list

3. **Enable Notifications**:
   - Tap on the site
   - Change from **"Block"** to **"Allow"**

4. **Refresh the rider page** and login again

### Method 3: Using the In-App Button

1. **Login** to the rider app
2. If notifications are not enabled, you'll see a **yellow notification banner** at the top
3. Tap the **"Enable Notifications"** button
4. Tap **"Allow"** when the browser prompts you

## Troubleshooting

### Notifications Not Working?

1. **Check Browser**:
   - ✅ Use **Chrome** browser (required for Android push notifications)
   - ❌ Firefox, Opera, or other browsers may not support push notifications

2. **Check Permissions**:
   - Go to Chrome Settings → Site Settings → Notifications
   - Make sure notifications are **"Allowed"** for your server URL

3. **Check if App is Installed**:
   - For best results, install the app to home screen
   - Open from home screen icon (not browser tab)

4. **Check Service Worker**:
   - Open Chrome DevTools (if available)
   - Go to Application → Service Workers
   - Make sure service worker is **"activated"**

5. **Check Internet Connection**:
   - Push notifications require internet connection
   - Make sure your device is connected to WiFi or mobile data

6. **Re-subscribe**:
   - Logout and login again
   - This will re-subscribe to push notifications

### Android System Settings

If notifications still don't work, check Android system settings:

1. **App Notifications**:
   - Go to Android Settings → Apps → Chrome
   - Tap **"Notifications"**
   - Make sure notifications are **enabled**

2. **Battery Optimization**:
   - Go to Android Settings → Battery → Battery Optimization
   - Find Chrome and set to **"Not optimized"**
   - This ensures notifications work even when screen is off

3. **Do Not Disturb**:
   - Make sure **Do Not Disturb** mode is off
   - Or add Chrome to allowed apps in Do Not Disturb settings

## Features

Once enabled, you'll receive:
- 🔔 **Push notifications** when new orders are available
- 📱 **Notifications even when app is closed** (if installed as PWA)
- 🎯 **Direct link** to view the new order when you tap the notification
- 🔄 **Automatic updates** when order status changes

## Technical Requirements

- **Android 5.0+** (Lollipop or higher)
- **Chrome browser** (latest version recommended)
- **Internet connection** (WiFi or mobile data)
- **HTTPS or localhost** (for service worker to work)
  - Note: For local development, use `http://localhost` or `http://192.168.x.x`
  - For production, HTTPS is required

## Testing Notifications

To test if notifications are working:

1. Login as a rider
2. Make sure you're marked as **"Available"**
3. Have an admin create and confirm a new order
4. You should receive a push notification immediately

## Support

If you continue to have issues:
1. Check the browser console for errors (Chrome DevTools)
2. Verify VAPID keys are configured on the server
3. Check server logs for push notification errors
4. Try logging out and logging back in


