/* eslint-disable sort-keys */
const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'Dev Trackory' : 'Trackory',
    slug: 'trackory',
    version: '0.1.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'trackory',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#25292e',
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
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: IS_DEV ? 'com.xires.trackory.dev' : 'com.xires.trackory',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
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
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'b146b5d6-3423-48cf-becb-faafc6d41ba8',
      },
    },
  },
};
