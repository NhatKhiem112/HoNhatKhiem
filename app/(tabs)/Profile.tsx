import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng nhập, cơ hội ưu đãi cho đơn đầu!</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => router.push('/register')}
          >
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    padding: 16,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  loginButton: {
    backgroundColor: '#ff4b6a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#ff7e79',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
