import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, SHADOW } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

export default function DetailScreen({ navigation, route }) {
  const {
    favorites,
    products,
    selectProduct,
    selectedSize,
    setSelectedSize,
    toggleFavorite
  } = useAppContext();
  const product =
    products.find((item) => item.id === route.params?.productId) || products[0];
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    selectProduct(product.id, selectedSize);
  }, [product.id]);

  const description = expanded
    ? product.description
    : `${product.description.slice(0, 110)}...`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Feather color={COLORS.text} name="chevron-left" size={24} />
          </Pressable>
          <Text style={styles.headerTitle}>Detail</Text>
          <Pressable
            onPress={() => toggleFavorite(product.id)}
            style={styles.iconButton}
          >
            <Ionicons
              color={favorites.includes(product.id) ? COLORS.primary : COLORS.text}
              name={favorites.includes(product.id) ? 'heart' : 'heart-outline'}
              size={24}
            />
          </Pressable>
        </View>

        <Image source={product.image} style={styles.heroImage} />

        <View style={styles.main}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.subtitle}>Ice/Hot</Text>
            </View>

            <View style={styles.featureRow}>
              <View style={styles.featureCard}>
                <MaterialCommunityIcons
                  color={COLORS.primary}
                  name="bike-fast"
                  size={24}
                />
              </View>
              <View style={styles.featureCard}>
                <MaterialCommunityIcons
                  color={COLORS.primary}
                  name="coffee"
                  size={24}
                />
              </View>
              <View style={styles.featureCard}>
                <MaterialCommunityIcons
                  color={COLORS.primary}
                  name="cup"
                  size={24}
                />
              </View>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingGroup}>
              <Ionicons color={COLORS.warning} name="star" size={24} />
              <Text style={styles.rating}>
                {product.rating} <Text style={styles.reviews}>({product.reviews})</Text>
              </Text>
            </View>
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {description}
            {!expanded ? (
              <Text onPress={() => setExpanded(true)} style={styles.readMore}>
                {' '}
                Read More
              </Text>
            ) : null}
          </Text>

          <Text style={[styles.sectionTitle, styles.sizeTitle]}>Size</Text>

          <View style={styles.sizeRow}>
            {product.sizes.map((size) => {
              const active = selectedSize === size;

              return (
                <Pressable
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[styles.sizeChip, active && styles.sizeChipActive]}
                >
                  <Text style={[styles.sizeText, active && styles.sizeTextActive]}>
                    {size}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>

        <PrimaryButton
          label="Buy Now"
          onPress={() => {
            selectProduct(product.id, selectedSize);
            navigation.navigate('Order', { productId: product.id, size: selectedSize });
          }}
          style={styles.buyButton}
          textStyle={styles.buyButtonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.surface,
    flex: 1
  },
  scrollContent: {
    paddingBottom: 160
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 10
  },
  iconButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700'
  },
  heroImage: {
    alignSelf: 'center',
    borderRadius: 28,
    height: 300,
    marginTop: 24,
    resizeMode: 'cover',
    width: '88%'
  },
  main: {
    paddingHorizontal: 24,
    paddingTop: 26
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700'
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 18,
    marginTop: 8
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12
  },
  featureCard: {
    alignItems: 'center',
    backgroundColor: '#F6F2EE',
    borderRadius: 18,
    height: 52,
    justifyContent: 'center',
    width: 52
  },
  ratingRow: {
    marginTop: 18
  },
  ratingGroup: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rating: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 8
  },
  reviews: {
    color: COLORS.textMuted,
    fontWeight: '500'
  },
  separator: {
    backgroundColor: COLORS.border,
    height: 1,
    marginVertical: 22
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700'
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 18,
    lineHeight: 31,
    marginTop: 18
  },
  readMore: {
    color: COLORS.primary,
    fontWeight: '700'
  },
  sizeTitle: {
    marginTop: 24
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 18
  },
  sizeChip: {
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: 16,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 14
  },
  sizeChipActive: {
    backgroundColor: '#FFF5EE',
    borderColor: COLORS.primary
  },
  sizeText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '600'
  },
  sizeTextActive: {
    color: COLORS.primary
  },
  footer: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 26,
    position: 'absolute',
    right: 0,
    ...SHADOW
  },
  priceLabel: {
    color: COLORS.textMuted,
    fontSize: 18
  },
  price: {
    color: COLORS.primary,
    fontSize: 36,
    fontWeight: '800',
    marginTop: 4
  },
  buyButton: {
    borderRadius: 20,
    flex: 1,
    marginLeft: 24
  },
  buyButtonText: {
    fontSize: 20
  }
});
