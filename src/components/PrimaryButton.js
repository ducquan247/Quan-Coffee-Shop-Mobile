import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/theme';

export default function PrimaryButton({ label, onPress, style, textStyle }) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    justifyContent: 'center',
    minHeight: 60,
    paddingHorizontal: 20
  },
  label: {
    color: COLORS.surface,
    fontSize: 24,
    fontWeight: '700'
  }
});
