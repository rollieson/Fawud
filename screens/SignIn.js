import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images, FONTS, SIZES, COLORS } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    // Toggle password visibility
    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    // Validate inputs and send API call
    const handleSignIn = async () => {
        let isValid = true;
        setEmailError(false);
        setPasswordError(false);

        if (!email) {
            isValid = false;
            setEmailError(true);
        }
        if (!password) {
            isValid = false;
            setPasswordError(true);
        }

        if (isValid) {
            setLoading(true); // Show loading indicator
            try {
                const response = await fetch('http://192.168.0.23:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                setLoading(false); // Hide loading indicator

                if (response.ok) {
                    // Store the token in AsyncStorage
                    await AsyncStorage.setItem('userToken', data.token);

                    // Handle successful login (navigate, etc.)
                    Alert.alert('Success', 'Signed in successfully!');
                    navigation.navigate('OnBoarding');
                } else {
                    // Display error from server response
                    Alert.alert('Error', data.message || 'Invalid login credentials.');
                }
            } catch (error) {
                setLoading(false);
                console.error('Login failed:', error);
                Alert.alert('Error', 'Unable to login. Please try again later.');
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
                            <Text style={styles.textAbove}>Email or Phone Number</Text>
                            <View style={styles.textBoxSign}>
                                <Image
                                    source={images.person}
                                    resizeMode="contain"
                                    style={{ width: 26, height: 40, marginRight: 5 }}
                                />
                                <TextInput
                                    placeholder="Enter your email or phone number..."
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

                            {/* Reset Password */}
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        color: COLORS.darkgray,
                                        marginTop: 5,
                                        alignSelf: 'flex-end',
                                        right: 25,
                                    }}
                                >
                                    Reset Password
                                </Text>
                            </TouchableOpacity>

                            {/* Sign In Button */}
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
                                onPress={handleSignIn}
                                accessibilityLabel="Sign In button"
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
                                        Sign In
                                    </Text>
                                )}
                            </TouchableOpacity>

                            {/* Sign Up Option */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius * 2.5,
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                                    Don't have an account?{' '}
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={{ color: COLORS.primary, fontSize: 19 }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default SignIn;

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
