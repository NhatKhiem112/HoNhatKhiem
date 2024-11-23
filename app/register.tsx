import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
const backgroundImage = require("../components/imgs/background2.jpg");

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        gender: '',
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (name: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8000/register', formData);
            setSuccess(response.data.message);
            router.push('/login');
        } catch (error: any) {
            if (error.response) {
                setError(error.response.data.message || 'Registration failed. Please check your inputs.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={styles.title}>Sign Up</Text>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    {success ? <Text style={styles.successText}>{success}</Text> : null}
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        placeholderTextColor="#aaa"
                        value={formData.name}
                        onChangeText={(value) => handleChange('name', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="#aaa"
                        value={formData.username}
                        onChangeText={(value) => handleChange('username', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#aaa"
                        value={formData.email}
                        keyboardType="email-address"
                        onChangeText={(value) => handleChange('email', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(value) => handleChange('password', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={formData.password_confirmation}
                        onChangeText={(value) => handleChange('password_confirmation', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        placeholderTextColor="#aaa"
                        value={formData.phone}
                        onChangeText={(value) => handleChange('phone', value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        placeholderTextColor="#aaa"
                        value={formData.address}
                        onChangeText={(value) => handleChange('address', value)}
                    />
                     {/* Gender Picker */}
                     <Picker
                        selectedValue={formData.gender}
                        style={styles.input}
                        onValueChange={(value) => handleChange('gender', value)}
                    >
                        <Picker.Item label="Select Gender" value="" color="#aaa" />
                        <Picker.Item label="Male" value="1" />
                        <Picker.Item label="Female" value="2" />
                    </Picker>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay for better contrast
        padding: 20,
    },
    box: {
        width: '100%',
        maxWidth: 400,
        padding: 25,
        backgroundColor: '#393E46',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        color: '#EEEEEE',
        fontSize: 26,
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 8,
        color: '#EEEEEE',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#00ADB5',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#EEEEEE',
        fontWeight: '600',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    errorText: {
        color: '#FF4C4C',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
    },
    successText: {
        color: '#4CAF50',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
    },
});

export default Register;
