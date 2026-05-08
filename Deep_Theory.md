# Day 37 - Frontend Task - 27/01/2026

# Deep Theory

# 1. Preparing Mobile App for Release

Preparing a mobile app for release means making the application production-ready so it can be published on platforms like Google Play Store and Apple App Store. This process includes testing, optimization, security checks, generating production builds, configuring app assets, and preparing deployment settings.

---

# Important Steps Before Release

## 1. Testing the Application

Before releasing the app:
- Test all screens and features
- Verify API integration
- Test navigation flow
- Check forms and validations
- Test authentication
- Verify responsive UI on multiple devices
- Test offline handling and slow network conditions

---

## 2. Remove Debugging Code

Production apps should not contain:
- Console logs
- Debug alerts
- Unused components
- Development APIs
- Testing libraries

Example:
```js
console.log("Debugging...");
```

---

## 3. Optimize Performance

Performance optimization improves user experience.

### Common Optimizations
- Compress images
- Minify JavaScript bundle
- Use lazy loading
- Reduce unnecessary re-renders
- Optimize animations
- Cache API data

---

## 4. Environment Variables

Use separate configurations for:
- Development
- Testing
- Production

Example:
```env
API_URL=https://production-api.com
```

---

## 5. Security Checks

Important security practices:
- Hide API keys
- Use HTTPS APIs
- Secure authentication tokens
- Validate user inputs
- Encrypt sensitive data

---

# 2. Android Release Build Steps

Android release build generates APK or AAB files for Play Store publishing.

---

# 1. Generate Keystore File

A keystore is required for signing Android apps.

Command:
```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

This creates:
```bash
my-upload-key.keystore
```

---

# 2. Move Keystore File

Place keystore file inside:
```bash
android/app/
```

---

# 3. Configure gradle.properties

File:
```bash
android/gradle.properties
```

Add:
```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

---

# 4. Configure build.gradle

File:
```bash
android/app/build.gradle
```

Add:
```gradle
signingConfigs {
    release {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
    }
}
```

Then:
```gradle
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        shrinkResources true
    }
}
```

---

# 5. Generate APK

Command:
```bash
cd android
./gradlew assembleRelease
```

APK output location:
```bash
android/app/build/outputs/apk/release/
```

---

# 6. Generate AAB (Recommended)

Google Play recommends AAB format.

Command:
```bash
cd android
./gradlew bundleRelease
```

AAB output location:
```bash
android/app/build/outputs/bundle/release/
```

---

# 7. Test Release Build

Install APK:
```bash
adb install app-release.apk
```

Check:
- Performance
- API calls
- Push notifications
- Authentication
- Offline storage

---

# 3. iOS Release Signing Overview

iOS applications require signing certificates and provisioning profiles before App Store deployment.

---

# Important Components

## 1. Apple Developer Account

Required for:
- App publishing
- Certificates
- TestFlight
- Push notifications

---

## 2. Bundle Identifier

Unique identifier for app.

Example:
```text
com.companyname.myapp
```

---

## 3. Signing Certificate

Apple verifies app authenticity using certificates.

Types:
- Development Certificate
- Distribution Certificate

---

## 4. Provisioning Profile

Provisioning profile connects:
- App ID
- Devices
- Certificates

Types:
- Development Profile
- Distribution Profile

---

# iOS Release Build Steps

## 1. Open Project in Xcode

```bash
ios/MyApp.xcworkspace
```

---

## 2. Select Apple Team

Go to:
```text
Signing & Capabilities
```

Select:
- Apple Developer Team

---

## 3. Configure Bundle Identifier

Example:
```text
com.mycompany.hospitalapp
```

---

## 4. Archive Application

In Xcode:
```text
Product → Archive
```

This creates production build.

---

## 5. Upload to App Store Connect

Use:
```text
Organizer → Distribute App
```

Upload to:
- TestFlight
- App Store

---

# 4. App Icons and Splash Screens

App icons and splash screens improve branding and professional appearance.

---

# App Icons

App icon appears on:
- Home screen
- Play Store
- App Store
- Notifications

---

# Android App Icons

Different icon sizes:
- mdpi
- hdpi
- xhdpi
- xxhdpi
- xxxhdpi

Location:
```bash
android/app/src/main/res/
```

---

# iOS App Icons

Managed through:
```text
Assets.xcassets
```

---

# Expo App Icon Configuration

Install:
```bash
expo install expo-app-loading
```

In:
```json
app.json
```

Add:
```json
{
  "expo": {
    "icon": "./assets/icon.png"
  }
}
```

---

# Splash Screens

Splash screen appears while app loads.

Contains:
- App logo
- Brand name
- Background color

---

# Expo Splash Screen Setup

Install:
```bash
expo install expo-splash-screen
```

Configuration:
```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

---

# Benefits of Splash Screen

- Better branding
- Professional appearance
- Smooth loading experience
- Improved first impression

---

# 5. OTA Updates with Expo or CodePush

OTA (Over-The-Air) updates allow developers to update JavaScript code without publishing a new app version to app stores.

---

# Benefits of OTA Updates

- Faster bug fixes
- Instant feature updates
- No app store approval needed
- Better user experience

---

# OTA Updates Using Expo

Expo provides built-in OTA update support.

---

# Publish Expo Update

Command:
```bash
expo publish
```

Modern Expo:
```bash
eas update
```

Users receive updates automatically.

---

# Runtime Version Configuration

Example:
```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

---

# OTA Update Flow in Expo

1. Developer publishes update
2. Expo stores update
3. App checks for update
4. User receives latest JS bundle

---

# OTA Updates Using CodePush

CodePush is provided by Microsoft App Center.

Supports:
- React Native
- Android
- iOS

---

# Install CodePush

```bash
npm install react-native-code-push
```

---

# CodePush Features

- Instant updates
- Rollback support
- Background downloads
- Version targeting

---

# Example Integration

```js
import codePush from "react-native-code-push";

export default codePush(App);
```

---

# OTA Update Limitations

OTA updates cannot modify:
- Native modules
- Native SDKs
- Android native code
- iOS native code

For such changes:
- New app store release is required

---

# Best Practices for Production Release

## 1. Enable Crash Reporting

Tools:
- Firebase Crashlytics
- Sentry

---

## 2. Monitor Performance

Track:
- App startup time
- API response time
- Memory usage
- Crash reports

---

## 3. Secure Sensitive Data

Use:
- Secure storage
- Encrypted APIs
- Secure authentication

---

## 4. Proper Versioning

Example:
```json
"version": "1.0.0"
```

Android:
```gradle
versionCode 1
```

iOS:
```text
Build Number
```

---
