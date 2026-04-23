import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOW } from '../constants/theme';
import { useAppContext } from '../context/AppContext';

export default function DeliveryScreen({ navigation }) {
  const { delivery, location } = useAppContext();
  const progressBars = [0, 1, 2, 3];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ImageBackground source={delivery.mapImage} style={styles.map}>
        <Pressable onPress={() => navigation.goBack()} style={styles.floatingBack}>
          <Feather color={COLORS.text} name="chevron-left" size={24} />
        </Pressable>

        <Pressable style={styles.floatingTarget}>
          <Ionicons color={COLORS.text} name="locate-outline" size={24} />
        </Pressable>

        <View style={styles.route} />
        <View style={styles.routeTurn} />
        <View style={styles.routeStart} />

        <View style={styles.riderBubble}>
          <MaterialCommunityIcons color={COLORS.primary} name="bike-fast" size={24} />
        </View>
      </ImageBackground>

      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <Text style={styles.eta}>{delivery.etaMinutes} minutes left</Text>
        <Text style={styles.destination}>
          Delivery to <Text style={styles.destinationBold}>{location.addressTitle}</Text>
        </Text>

        <View style={styles.progressRow}>
          {progressBars.map((item) => (
            <View
              key={item}
              style={[
                styles.progressBar,
                item < 3 ? styles.progressBarActive : styles.progressBarInactive
              ]}
            />
          ))}
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <MaterialCommunityIcons color={COLORS.primary} name="bike-fast" size={28} />
          </View>

          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Delivered your order</Text>
            <Text style={styles.statusText}>
              We will deliver your goods to you in the shortest possible time.
            </Text>
          </View>
        </View>

        <View style={styles.courierRow}>
          <View style={styles.courierInfo}>
            <Image source={delivery.courier.image} style={styles.courierImage} />

            <View style={styles.courierText}>
              <Text style={styles.courierName}>{delivery.courier.name}</Text>
              <Text style={styles.courierRole}>{delivery.courier.role}</Text>
            </View>
          </View>

          <Pressable style={styles.callButton}>
            <Feather color={COLORS.text} name="phone-call" size={22} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.surface,
    flex: 1
  },
  map: {
    flex: 1
  },
  floatingBack: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 22,
    height: 56,
    justifyContent: 'center',
    left: 24,
    position: 'absolute',
    top: 66,
    width: 56,
    ...SHADOW
  },
  floatingTarget: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 22,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 24,
    top: 66,
    width: 56,
    ...SHADOW
  },
  route: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    height: 8,
    left: 150,
    position: 'absolute',
    top: 265,
    transform: [{ rotate: '-2deg' }],
    width: 360
  },
  routeTurn: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    height: 220,
    position: 'absolute',
    right: 220,
    top: 266,
    width: 8
  },
  routeStart: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    height: 8,
    left: 112,
    position: 'absolute',
    top: 468,
    width: 54
  },
  riderBubble: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 999,
    height: 62,
    justifyContent: 'center',
    position: 'absolute',
    right: 180,
    top: 500,
    width: 62,
    ...SHADOW
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: 355,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24
  },
  grabber: {
    alignSelf: 'center',
    backgroundColor: '#DADADA',
    borderRadius: 999,
    height: 6,
    width: 90
  },
  eta: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 24,
    textAlign: 'center'
  },
  destination: {
    color: COLORS.textMuted,
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center'
  },
  destinationBold: {
    color: COLORS.text,
    fontWeight: '700'
  },
  progressRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 26
  },
  progressBar: {
    borderRadius: 999,
    flex: 1,
    height: 6
  },
  progressBarActive: {
    backgroundColor: COLORS.success
  },
  progressBarInactive: {
    backgroundColor: '#D2D2D2'
  },
  statusCard: {
    borderColor: COLORS.border,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 26,
    padding: 18
  },
  statusIcon: {
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: 20,
    borderWidth: 1,
    height: 72,
    justifyContent: 'center',
    width: 72
  },
  statusInfo: {
    flex: 1,
    marginLeft: 18
  },
  statusTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700'
  },
  statusText: {
    color: COLORS.textMuted,
    fontSize: 17,
    lineHeight: 28,
    marginTop: 8
  },
  courierRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26
  },
  courierInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  courierImage: {
    borderRadius: 22,
    height: 76,
    width: 76
  },
  courierText: {
    marginLeft: 14
  },
  courierName: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700'
  },
  courierRole: {
    color: COLORS.textMuted,
    fontSize: 18,
    marginTop: 6
  },
  callButton: {
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: 22,
    borderWidth: 1,
    height: 66,
    justifyContent: 'center',
    width: 66
  }
});
