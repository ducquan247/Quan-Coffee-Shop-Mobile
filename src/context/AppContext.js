import React, { createContext, useContext, useMemo, useState } from 'react';
import rawData from '../data/data.json';
import { IMAGE_ASSETS } from '../constants/assets';

const AppContext = createContext(null);

const products = rawData.products.map((item) => ({
  ...item,
  image: IMAGE_ASSETS[item.imageKey]
}));

const promo = {
  ...rawData.promo,
  image: IMAGE_ASSETS[rawData.promo.imageKey]
};

const delivery = {
  ...rawData.delivery,
  mapImage: IMAGE_ASSETS[rawData.delivery.mapImageKey],
  courier: {
    ...rawData.delivery.courier,
    image: IMAGE_ASSETS[rawData.delivery.courier.imageKey]
  }
};

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(['coffee-1']);
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [deliveryMode, setDeliveryMode] = useState('Deliver');

  const selectedProduct =
    products.find((item) => item.id === selectedProductId) || products[0];

  const deliveryFee = 1.0;
  const subtotal = Number((selectedProduct.price * quantity).toFixed(2));
  const total = Number((subtotal + deliveryFee).toFixed(2));

  const value = useMemo(
    () => ({
      categories: rawData.categories,
      location: rawData.location,
      promo,
      products,
      delivery,
      favorites,
      selectedProduct,
      selectedSize,
      quantity,
      deliveryMode,
      deliveryFee,
      subtotal,
      total,
      toggleFavorite: (productId) => {
        setFavorites((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId]
        );
      },
      selectProduct: (productId, size = 'M') => {
        setSelectedProductId(productId);
        setSelectedSize(size);
        setQuantity(1);
      },
      setSelectedSize,
      increaseQuantity: () => setQuantity((current) => current + 1),
      decreaseQuantity: () =>
        setQuantity((current) => (current > 1 ? current - 1 : current)),
      setDeliveryMode
    }),
    [
      favorites,
      selectedProduct,
      selectedSize,
      quantity,
      deliveryMode,
      subtotal,
      total
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}
