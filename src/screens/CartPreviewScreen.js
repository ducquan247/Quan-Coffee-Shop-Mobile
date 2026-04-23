import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, SHADOW } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

export default function CartPreviewScreen({ navigation }) {
  const { deliveryFee, quantity, selectedProduct, selectedSize, total } =
    useAppContext();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.title}>My Cart</Text>
        <Text style={styles.subtitle}>Quick access to your latest order.</Text>

        <View style={styles.card}>
          <Image source={selectedProduct.image} style={styles.image} />

          <View style={styles.info}>
            <Text style={styles.name}>{selectedProduct.name}</Text>
            <Text style={styles.meta}>
              {selectedProduct.subtitle} • Size {selectedSize}
            </Text>
            <Text style={styles.meta}>Qty {quantity}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ${(selectedProduct.price * quantity).toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <PrimaryButton
          label="Checkout"
          onPress={() => (navigation.getParent() || navigation).navigate('Order')}
          style={styles.button}
          textStyle={styles.buttonText}
        />

        <Pressable
          onPress={() => (navigation.getParent() || navigation).navigate('Delivery')}
          style={styles.deliveryLink}
        >
          <Feather color={COLORS.primary} name="truck" size={18} />
          <Text style={styles.deliveryLinkText}>Track current delivery</Text>
        </Pressable>
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
    flex: 1,
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
    padding: 18,
    ...SHADOW
  },
  image: {
    borderRadius: 22,
    height: 110,
    width: 110
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16
  },
  name: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: '700'
  },
  meta: {
    color: COLORS.textMuted,
    fontSize: 17,
    marginTop: 8
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 28,
    marginTop: 24,
    padding: 20,
    ...SHADOW
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14
  },
  summaryLabel: {
    color: COLORS.textMuted,
    fontSize: 18
  },
  summaryValue: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700'
  },
  totalLabel: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '800'
  },
  totalValue: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800'
  },
  button: {
    marginTop: 28
  },
  buttonText: {
    fontSize: 20
  },
  deliveryLink: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18
  },
  deliveryLinkText: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 8
  }
});
