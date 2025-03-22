import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images, FONTS, SIZES, COLORS } from '../constants'; // Import constants for styling and assets

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);

    // Toggle password visibility
    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    // Validate inputs and send API call
    const handleSignUp = async () => {
        let isValid = true;
        setEmailError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);

        if (!email) {
            isValid = false;
            setEmailError(true);
        }
        if (!password) {
            isValid = false;
            setPasswordError(true);
        }
        if (password !== confirmPassword) {
            isValid = false;
            setConfirmPasswordError(true);
        }

        if (isValid) {
            setLoading(true); // Show loading indicator
            try {
                const response = await fetch('http://192.168.0.23:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                setLoading(false); // Hide loading indicator

                if (response.ok) {
                    // Handle successful registration
                    Alert.alert('Success', 'User registered successfully!');
                    navigation.navigate('SignIn');
                } else {
                    // Display error from server response
                    Alert.alert('Error', data.message || 'Registration failed.');
                }
            } catch (error) {
                setLoading(false);
                console.error('Registration failed:', error);
                Alert.alert('Error', 'Unable to register. Please try again later.');
            }
        } else {
            Alert.alert('Error', 'Please check your inputs.');
        }
    };

    return (
        <ImageBackground
            source={images.background}
            resizeMode="cover"
            style={{ flex: 1, paddingVertical: SIZES.padding, justifyContent: 'center' }}
        >
            <SafeAreaView>
                <KeyboardAwareScrollView>
                    <View style={{ flex: 1 }}>
                        {/* Logo */}
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={images.logo}
                                resizeMode="contain"
                                style={{
                                    height: 250,
                                    width: 500,
                                }}
                            />
                        </View>

                        {/* Input Fields */}
                        <View
                            style={{
                                flex: 3,
                                paddingHorizontal: 20,
                                paddingVertical: 30,
                            }}
                        >
                            {/* Email Input */}
                            <Text style={styles.textAbove}>Email</Text>
                            <View style={styles.textBoxSign}>
                                <Image
                                    source={images.person}
                                    resizeMode="contain"
                                    style={{ width: 26, height: 40, marginRight: 5 }}
                                />
                                <TextInput
                                    placeholder="Enter your email..."
                                    onChangeText={(value) => setEmail(value)}
                                    autoCapitalize="none"
                                    style={{
                                        flex: 1,
                                        height: 40.5,
                                        fontSize: 15,
                                        marginLeft: 2,
                                    }}
                                    accessibilityLabel="Email input"
                                />
                            </View>
                            {emailError && <Text style={styles.errorText}>Email is required!</Text>}

                            {/* Password Input */}
                            <Text style={{ fontSize: 14, marginLeft: 12, marginTop: 30 }}>Password</Text>
                            <View style={styles.textBoxSign}>
                                <Image
                                    source={images.lock}
                                    resizeMode="contain"
                                    style={{ width: 25, height: 20, marginTop: 10 }}
                                />
                                <TextInput
                                    placeholder="Enter your password..."
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={(value) => setPassword(value)}
                                    style={{
                                        flex: 1,
                                        height: 40.5,
                                        fontSize: 15,
                                        marginLeft: 5,
                                    }}
                                    accessibilityLabel="Password input"
                                />
                                <TouchableOpacity onPress={updateSecureTextEntry}>
                                    <Image
                                        source={secureTextEntry ? images.eyeclosed : images.eye}
                                        resizeMode="contain"
                                        style={{ width: 25, height: 40 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            {passwordError && <Text style={styles.errorText}>Password is required!</Text>}

                            {/* Confirm Password Input */}
                            <Text style={{ fontSize: 14, marginLeft: 12, marginTop: 30 }}>Confirm Password</Text>
                            <View style={styles.textBoxSign}>
                                <Image
                                    source={images.lock}
                                    resizeMode="contain"
                                    style={{ width: 25, height: 20, marginTop: 10 }}
                                />
                                <TextInput
                                    placeholder="Confirm your password..."
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={(value) => setConfirmPassword(value)}
                                    style={{
                                        flex: 1,
                                        height: 40.5,
                                        fontSize: 15,
                                        marginLeft: 5,
                                    }}
                                    accessibilityLabel="Confirm password input"
                                />
                            </View>
                            {confirmPasswordError && (
                                <Text style={styles.errorText}>Passwords do not match!</Text>
                            )}

                            {/* Sign Up Button */}
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 55,
                                    marginHorizontal: 30,
                                    marginTop: 40,
                                    borderRadius: 50,
                                    backgroundColor: COLORS.primary,
                                    ...styles.shadow,
                                }}
                                onPress={handleSignUp}
                                accessibilityLabel="Sign Up button"
                            >
                                {loading ? (
                                    <ActivityIndicator color={COLORS.white} />
                                ) : (
                                    <Text
                                        style={{
                                            color: COLORS.white,
                                            fontSize: 18,
                                        }}
                                    >
                                        Sign Up
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {/* Back to Sign In */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius * 2.5,
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                                    Already have an account?{' '}
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                                    <Text style={{ color: COLORS.primary, fontSize: 19 }}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    textBoxSign: {
        flexDirection: 'row',
        height: 45,
        marginHorizontal: 5,
        marginTop: 5,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        elevation: 2,
    },
    textAbove: { fontSize: 14, marginLeft: 12 },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 12,
        marginTop: 5,
    },
});
