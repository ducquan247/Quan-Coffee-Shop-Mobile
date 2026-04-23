import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CoffeeCard from '../components/CoffeeCard';
import { COLORS } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites, products, selectProduct } = useAppContext();
  const favoriteProducts = products.filter((item) => favorites.includes(item.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved coffee picks.</Text>

        <View style={styles.grid}>
          {favoriteProducts.map((product) => (
            <CoffeeCard
              isFavorite
              key={product.id}
              onPress={() =>
                (navigation.getParent() || navigation).navigate('Detail', {
                  productId: product.id
                })
              }
              onQuickAdd={() => {
                selectProduct(product.id);
                (navigation.getParent() || navigation).navigate('Order', {
                  productId: product.id,
                  size: 'M'
                });
              }}
              product={product}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
    flex: 1
  },
  content: {
    padding: 24,
    paddingBottom: 120
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 24
  }
});
