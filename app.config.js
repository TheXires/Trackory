/* eslint-disable sort-keys */
const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: 'Trackory',
    slug: 'trackory',
    version: '0.1.0',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#25292e',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: IS_DEV ? 'com.xires.trackory.dev' : 'com.xires.trackory',
      infoPlist: {
        NSCameraUsageDescription: 'Grant access to camera to take pictures of your Food',
        NSPhotoLibraryUsageDescription: 'Grant access to gallery to select pictures of your Food',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: IS_DEV ? 'com.xires.trackory.dev' : 'com.xires.trackory',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-build-properties',
      [
        'expo-image-picker',
        {
          photosPermission: 'Allow $(PRODUCT_NAME) to access your photos',
        },
      ],
      'expo-localization',
      'expo-document-picker',
    ],
    extra: {
      eas: {
        projectId: 'b146b5d6-3423-48cf-becb-faafc6d41ba8',
      },
    },
  },
};
