import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import CoffeeCard from '../components/CoffeeCard';
import { COLORS } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen({ navigation }) {
  const { categories, favorites, location, products, promo, selectProduct } =
    useAppContext();
  const [activeCategory, setActiveCategory] = useState('All Coffee');
  const [query, setQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All Coffee' || product.category === activeCategory;
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  const openDetail = (productId) => {
    const rootNavigation = navigation.getParent() || navigation;
    rootNavigation.navigate('Detail', { productId });
  };

  const quickOrder = (productId) => {
    selectProduct(productId);
    const rootNavigation = navigation.getParent() || navigation;
    rootNavigation.navigate('Order', { productId, size: 'M' });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.locationLabel}>Location</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationValue}>{location.city}</Text>
            <Ionicons color={COLORS.surface} name="chevron-down" size={18} />
          </View>

          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <Feather color="#A2A2A2" name="search" size={22} />
              <TextInput
                onChangeText={setQuery}
                placeholder="Search coffee"
                placeholderTextColor="#A2A2A2"
                style={styles.input}
                value={query}
              />
            </View>

            <Pressable style={styles.filterButton}>
              <View style={styles.filterIcon}>
                <View style={styles.filterLineTop} />
                <View style={styles.filterLineMiddle} />
                <View style={styles.filterLineBottom} />
                <View style={styles.filterKnobTop} />
                <View style={styles.filterKnobBottom} />
              </View>
            </Pressable>
          </View>

          <View style={styles.promoCard}>
            <View style={styles.promoContent}>
              <Text style={styles.promoBadge}>{promo.badge}</Text>
              <Text style={styles.promoTitle}>Buy one get one FREE</Text>
            </View>

            <Image source={promo.image} style={styles.promoImage} />
          </View>
        </View>

        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={styles.categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <Pressable
                  key={category}
                  onPress={() => setActiveCategory(category)}
                  style={[
                    styles.categoryChip,
                    active && styles.categoryChipActive
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      active && styles.categoryTextActive
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.grid}>
            {filteredProducts.map((product) => (
              <CoffeeCard
                isFavorite={favorites.includes(product.id)}
                key={product.id}
                onPress={() => openDetail(product.id)}
                onQuickAdd={() => quickOrder(product.id)}
                product={product}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.dark,
    flex: 1
  },
  scrollContent: {
    backgroundColor: COLORS.background,
    paddingBottom: 120
  },
  header: {
    backgroundColor: COLORS.darkSurface,
    paddingBottom: 34,
    paddingHorizontal: 24,
    paddingTop: 14
  },
  locationLabel: {
    color: '#B7B7B7',
    fontSize: 16
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8
  },
  locationValue: {
    color: COLORS.surface,
    fontSize: 26,
    fontWeight: '700',
    marginRight: 8
  },
  searchRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 28
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18
  },
  input: {
    color: COLORS.surface,
    flex: 1,
    fontSize: 18,
    minHeight: 58
  },
  filterButton: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    height: 54,
    justifyContent: 'center',
    width: 54
  },
  filterIcon: {
    height: 22,
    position: 'relative',
    width: 22
  },
  filterLineTop: {
    backgroundColor: COLORS.surface,
    borderRadius: 999,
    height: 2.4,
    left: 3,
    position: 'absolute',
    right: 6,
    top: 3.5
  },
  filterLineMiddle: {
    backgroundColor: COLORS.surface,
    borderRadius: 999,
    height: 2.4,
    left: 3,
    position: 'absolute',
    right: 3,
    top: 10
  },
  filterLineBottom: {
    backgroundColor: COLORS.surface,
    borderRadius: 999,
    height: 2.4,
    left: 6,
    position: 'absolute',
    right: 3,
    top: 16.5
  },
  filterKnobTop: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.surface,
    borderRadius: 999,
    borderWidth: 2,
    height: 8,
    position: 'absolute',
    right: 1,
    top: 0.8,
    width: 8
  },
  filterKnobBottom: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.surface,
    borderRadius: 999,
    borderWidth: 2,
    height: 8,
    left: 1,
    position: 'absolute',
    top: 13.3,
    width: 8
  },
  promoCard: {
    alignItems: 'center',
    backgroundColor: '#A4795B',
    borderRadius: 28,
    flexDirection: 'row',
    marginTop: 28,
    overflow: 'hidden',
    paddingLeft: 20
  },
  promoContent: {
    flex: 1,
    paddingVertical: 20
  },
  promoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F25F4C',
    borderRadius: 14,
    color: COLORS.surface,
    fontSize: 18,
    fontWeight: '700',
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 8
  },
  promoTitle: {
    backgroundColor: 'rgba(17, 17, 17, 0.88)',
    color: COLORS.surface,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 40,
    marginTop: 18,
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  promoImage: {
    alignSelf: 'flex-end',
    height: 170,
    resizeMode: 'cover',
    width: 170
  },
  body: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -14,
    minHeight: 800,
    paddingHorizontal: 24,
    paddingTop: 24
  },
  categoriesScroll: {
    flexGrow: 0
  },
  categories: {
    alignItems: 'center',
    gap: 10,
    paddingBottom: 20,
    paddingRight: 24
  },
  categoryChip: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    minWidth: 96,
    paddingHorizontal: 16,
    paddingVertical: 0
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary
  },
  categoryText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  categoryTextActive: {
    color: COLORS.surface
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});
