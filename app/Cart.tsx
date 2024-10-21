import React from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cartItems: Product[]; // Ensure this is always passed as an array
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems = [], // Set default value to an empty array
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Giỏ hàng</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Giỏ hàng của bạn đang trống.</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image
              source={{ uri: `http://localhost:8000/imgs/products/${item.image}` }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {(item.price * item.quantity).toLocaleString('vi-VN')} VND
              </Text>
            </View>

            <View style={styles.quantityControls}>
              <Button
                title="-"
                onPress={() => onDecreaseQuantity(item.id)}
                color="#888"
              />
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Button
                title="+"
                onPress={() => onIncreaseQuantity(item.id)}
                color="#888"
              />
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onRemoveFromCart(item.id)}
            >
              <Ionicons name="trash" size={24} color="#ff5c5c" />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCart: {
    fontSize: 18,
    color: '#888',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  deleteButton: {
    backgroundColor: '#2B3044', // Primary button color
    padding: 10,
    borderRadius: 7,
    marginLeft: 16, // Space from quantity controls
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Cart;
