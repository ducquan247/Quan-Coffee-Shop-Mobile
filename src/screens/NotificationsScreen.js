import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Delivery and promotion updates.</Text>

        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Ionicons color={COLORS.primary} name="notifications-outline" size={28} />
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.cardTitle}>Your coffee is on the way</Text>
            <Text style={styles.cardText}>
              Live delivery updates and promotion reminders will appear here.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1
  },
  content: {
    padding: 24
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '800'
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 18,
    marginTop: 8
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    flexDirection: 'row',
    marginTop: 28,
    padding: 20,
    ...SHADOW
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: '#FFF4EC',
    borderRadius: 18,
    height: 54,
    justifyContent: 'center',
    width: 54
  },
  textWrap: {
    flex: 1,
    marginLeft: 16
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: '700'
  },
  cardText: {
    color: COLORS.textMuted,
    fontSize: 17,
    lineHeight: 28,
    marginTop: 8
  }
});
