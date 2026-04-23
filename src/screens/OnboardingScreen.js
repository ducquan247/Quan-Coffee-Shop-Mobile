import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../constants/theme';

const onboardingImage = require('../../assets/onboarding.png');

export default function OnboardingScreen({ navigation }) {
  return (
    <ImageBackground source={onboardingImage} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.spacer} />

        <View style={styles.content}>
          <Text style={styles.title}>Fall in Love with Coffee in Blissful Delight!</Text>
          <Text style={styles.subtitle}>
            Welcome to our cozy coffee corner, where every cup is a delightful
            for you.
          </Text>

          <PrimaryButton
            label="Get Started"
            onPress={() => navigation.replace('MainTabs')}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)'
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between'
  },
  spacer: {
    flex: 1
  },
  content: {
    backgroundColor: 'rgba(10, 10, 10, 0.82)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28
  },
  title: {
    color: COLORS.surface,
    fontSize: 42,
    fontWeight: '800',
    lineHeight: 52,
    textAlign: 'center'
  },
  subtitle: {
    color: '#C8C8C8',
    fontSize: 19,
    lineHeight: 30,
    marginTop: 18,
    textAlign: 'center'
  },
  button: {
    borderRadius: 24,
    marginTop: 34
  },
  buttonText: {
    fontSize: 22
  }
});
