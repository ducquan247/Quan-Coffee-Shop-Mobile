import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';

export default function CoffeeCard({
  product,
  onPress,
  onQuickAdd,
  isFavorite
}) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View>
        <Image source={product.image} style={styles.image} />
        <View style={styles.ratingBadge}>
          <Ionicons color={COLORS.warning} name="star" size={14} />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={styles.title}>
            {product.name}
          </Text>
          {isFavorite ? (
            <Ionicons color={COLORS.primary} name="heart" size={18} />
          ) : null}
        </View>
        <Text style={styles.subtitle}>{product.subtitle}</Text>

        <View style={styles.footer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Pressable onPress={onQuickAdd} style={styles.addButton}>
            <Feather color={COLORS.surface} name="plus" size={20} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    marginBottom: 18,
    overflow: 'hidden',
    width: '48%',
    ...SHADOW
  },
  image: {
    height: 150,
    resizeMode: 'cover',
    width: '100%'
  },
  ratingBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(17, 17, 17, 0.55)',
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 24,
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'absolute',
    right: 0,
    top: 0
  },
  ratingText: {
    color: COLORS.surface,
    fontSize: 12,
    fontWeight: '700'
  },
  content: {
    padding: 14
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: COLORS.text,
    fontSize: 21,
    fontWeight: '700',
    maxWidth: '84%'
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 15,
    marginTop: 4
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  price: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: '800'
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    width: 48
  }
});
