import React, { useEffect } from 'react';
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
import { Feather, Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS, SHADOW } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

export default function OrderScreen({ navigation, route }) {
  const {
    deliveryFee,
    deliveryMode,
    decreaseQuantity,
    increaseQuantity,
    location,
    quantity,
    selectedProduct,
    selectedSize,
    selectProduct,
    setDeliveryMode,
    subtotal,
    total
  } = useAppContext();

  useEffect(() => {
    if (route.params?.productId) {
      selectProduct(route.params.productId, route.params?.size || selectedSize);
    }
  }, [route.params?.productId, route.params?.size]);

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
          <Text style={styles.headerTitle}>Order</Text>
          <View style={styles.iconPlaceholder} />
        </View>

        <View style={styles.segmented}>
          {['Deliver', 'Pick Up'].map((mode) => {
            const active = deliveryMode === mode;

            return (
              <Pressable
                key={mode}
                onPress={() => setDeliveryMode(mode)}
                style={[styles.segmentButton, active && styles.segmentButtonActive]}
              >
                <Text
                  style={[styles.segmentText, active && styles.segmentTextActive]}
                >
                  {mode}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <Text style={styles.addressTitle}>{location.addressTitle}</Text>
        <Text style={styles.addressDetail}>{location.addressDetail}</Text>

        <View style={styles.actionRow}>
          <Pressable style={styles.outlineButton}>
            <Feather color={COLORS.text} name="edit-2" size={18} />
            <Text style={styles.outlineButtonText}>Edit Address</Text>
          </Pressable>
          <Pressable style={styles.outlineButton}>
            <Feather color={COLORS.text} name="file-text" size={18} />
            <Text style={styles.outlineButtonText}>Add Note</Text>
          </Pressable>
        </View>

        <View style={styles.separator} />

        <View style={styles.itemRow}>
          <Image source={selectedProduct.image} style={styles.itemImage} />

          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{selectedProduct.name}</Text>
            <Text style={styles.itemSubtitle}>{selectedProduct.subtitle}</Text>
            <Text style={styles.itemSize}>Size: {selectedSize}</Text>
          </View>

          <View style={styles.quantityRow}>
            <Pressable onPress={decreaseQuantity} style={styles.quantityButton}>
              <Feather color={COLORS.textMuted} name="minus" size={18} />
            </Pressable>
            <Text style={styles.quantityText}>{quantity}</Text>
            <Pressable onPress={increaseQuantity} style={styles.quantityButton}>
              <Feather color={COLORS.text} name="plus" size={18} />
            </Pressable>
          </View>
        </View>

        <View style={styles.discountCard}>
          <Ionicons color={COLORS.primary} name="pricetag-outline" size={24} />
          <Text style={styles.discountText}>1 Discount is Applied</Text>
          <Feather color={COLORS.text} name="chevron-right" size={22} />
        </View>

        <Text style={styles.sectionTitle}>Payment Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Price</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <View style={styles.deliveryFeeRow}>
            <Text style={styles.deliveryStrike}>$2.0</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(1)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSheet}>
        <View style={styles.paymentRow}>
          <View style={styles.walletIcon}>
            <Feather color={COLORS.primary} name="credit-card" size={20} />
          </View>

          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Cash/Wallet</Text>
            <Text style={styles.paymentAmount}>${total.toFixed(2)}</Text>
          </View>

          <Feather color={COLORS.text} name="chevron-down" size={22} />
        </View>

        <PrimaryButton
          label="Order"
          onPress={() => navigation.navigate('Delivery')}
          style={styles.orderButton}
          textStyle={styles.orderButtonText}
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
    paddingBottom: 220,
    paddingHorizontal: 24,
    paddingTop: 12
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  iconPlaceholder: {
    width: 40
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700'
  },
  segmented: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 28,
    padding: 6
  },
  segmentButton: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    paddingVertical: 14
  },
  segmentButtonActive: {
    backgroundColor: COLORS.primary
  },
  segmentText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '600'
  },
  segmentTextActive: {
    color: COLORS.surface
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 28
  },
  addressTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 18
  },
  addressDetail: {
    color: COLORS.textMuted,
    fontSize: 18,
    lineHeight: 28,
    marginTop: 8
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18
  },
  outlineButton: {
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  outlineButtonText: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '500'
  },
  separator: {
    backgroundColor: COLORS.border,
    height: 1,
    marginVertical: 24
  },
  itemRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemImage: {
    borderRadius: 18,
    height: 84,
    width: 84
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16
  },
  itemName: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700'
  },
  itemSubtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginTop: 4
  },
  itemSize: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6
  },
  quantityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14
  },
  quantityButton: {
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: 18,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34
  },
  quantityText: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    minWidth: 22,
    textAlign: 'center'
  },
  discountCard: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 26,
    paddingHorizontal: 18,
    paddingVertical: 20,
    ...SHADOW
  },
  discountText: {
    color: COLORS.text,
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 14
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18
  },
  summaryLabel: {
    color: COLORS.text,
    fontSize: 19
  },
  summaryValue: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '700'
  },
  deliveryFeeRow: {
    flexDirection: 'row',
    gap: 10
  },
  deliveryStrike: {
    color: COLORS.textMuted,
    fontSize: 19,
    textDecorationLine: 'line-through'
  },
  bottomSheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    bottom: 0,
    left: 0,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
    position: 'absolute',
    right: 0,
    ...SHADOW
  },
  paymentRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  walletIcon: {
    alignItems: 'center',
    backgroundColor: '#FFF4EC',
    borderRadius: 18,
    height: 44,
    justifyContent: 'center',
    width: 44
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 14
  },
  paymentTitle: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '700'
  },
  paymentAmount: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4
  },
  orderButton: {
    marginTop: 24
  },
  orderButtonText: {
    fontSize: 20
  }
});
