import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const CheckoutScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const paymentMethods = ['Thẻ tín dụng', 'PayPal', 'Chuyển khoản ngân hàng'];

  const handleOrder = () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Thông báo', 'Vui lòng chọn phương thức thanh toán!');
    } else {
      Alert.alert('Đặt hàng thành công', `Bạn đã chọn phương thức thanh toán: ${selectedPaymentMethod}`);
      // Thực hiện các hành động khác như gọi API đặt hàng ở đây
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Payment Section */}
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentMethod}>Chọn phương thức thanh toán:</Text>
        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paymentOption,
              selectedPaymentMethod === method && styles.selectedPaymentOption,
            ]}
            onPress={() => setSelectedPaymentMethod(method)}
          >
            <Text style={styles.paymentOptionText}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Order Button */}
      <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Đặt hàng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  paymentContainer: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  paymentMethod: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentOption: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
  },
  selectedPaymentOption: {
    backgroundColor: '#ff5252',
  },
  paymentOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: '#ff5252',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
