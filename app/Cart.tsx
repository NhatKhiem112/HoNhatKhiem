import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cartItems: Product[];
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
  onProceedToCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({

  cartItems = [],
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onProceedToCheckout,
}) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };
  

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const isAllSelected = selectedItems.length === cartItems.length;

  const totalAmount = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = (method: string) => {
    console.log(`Payment method selected: ${method}`);
    setModalVisible(false);
  };

  const proceedToPayment = () => {
    console.log('Selected Items:', selectedItems); // Log selected items
    if (selectedItems.length === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn sản phẩm để thanh toán.");
    } else {
      setModalVisible(true);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Giỏ hàng của tôi</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Giỏ hàng của bạn đang trống.</Text>
      ) : (
        <>
          {/* Select All Checkbox */}
          <View style={styles.selectAllContainer}>
            <TouchableOpacity
              style={[styles.checkbox, isAllSelected && styles.checkboxSelected]}
              onPress={toggleSelectAll}
            >
              {isAllSelected && <Ionicons name="checkmark" size={18} color="white" />}
            </TouchableOpacity>
            <Text style={styles.selectAllText}>Chọn tất cả</Text>
          </View>

          {cartItems.map((item) => (
            <Swipeable
              key={item.id}
              renderRightActions={() => (
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity style={styles.likeButton}>
                    <Ionicons name="heart" size={24} color="#ff5c5c" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => onRemoveFromCart(item.id)}>
                    <Ionicons name="trash" size={24} color="#ff5c5c" />
                  </TouchableOpacity>
                </View>
              )}
            >
              <View style={styles.cartItem}>
                {/* Checkbox for selecting item */}
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    selectedItems.includes(item.id) && styles.checkboxSelected,
                  ]}
                  onPress={() => toggleSelection(item.id)}
                >
                  {selectedItems.includes(item.id) && <Ionicons name="checkmark" size={18} color="white" />}
                </TouchableOpacity>

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
              </View>
            </Swipeable>
          ))}
        </>
      )}

      {cartItems.length > 0 && selectedItems.length > 0 && (
        <Text style={styles.totalAmount}>Tổng thành tiền: {totalAmount.toLocaleString('vi-VN')} VND</Text>
      )}

{cartItems.length > 0 && (
  <TouchableOpacity 
    style={styles.checkoutButton} 
    onPress={() => router.push('/CheckoutScreen')}
  >
    <Ionicons name="cash" size={20} color="#fff" style={styles.icon} />
    <Text style={styles.buttonText}>Thanh toán</Text>
  </TouchableOpacity>
)}


      {/* Payment Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        
      </Modal>
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
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectAllText: {
    fontSize: 16,
    marginLeft: 8,
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
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
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
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  likeButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50', // Green background
    paddingVertical: 15, // Increased vertical padding
    paddingHorizontal: 20, // Increased horizontal padding
    borderRadius: 30, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Space above the button
    flexDirection: 'row', // Align icon and text horizontally
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10, // Space between icon and text
  },
  icon: {
    marginRight: 5, // Space between icon and text
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paymentOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
  },
});

export default Cart;
