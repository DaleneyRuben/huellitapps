import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../theme';
import {
  sendVerificationEmail,
  generateVerificationCode,
} from '../../utils/emailService';

const AlbergueRegisterStep2Screen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesitan permisos para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setQrCodeImage(result.assets[0].uri);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    // TODO: Implement registration logic
    console.log('Albergue registration step 2:', {
      password,
      confirmPassword,
      qrCodeImage,
      email,
    });

    // Generate and send verification code
    const verificationCode = generateVerificationCode();
    const result = await sendVerificationEmail(email, verificationCode);

    if (result.success) {
      // Navigate to verification screen after successful registration
      navigation.navigate('Verification', { email });
    } else {
      const errorMessage =
        result.error ||
        'No se pudo enviar el código de verificación. Por favor, intenta nuevamente.';
      console.error('Email sending failed:', result);
      Alert.alert('Error al enviar correo', errorMessage);
    }
  };

  const passwordsMatch = password === confirmPassword;
  const hasPasswordMismatch =
    password.trim() && confirmPassword.trim() && !passwordsMatch;

  const isRegisterDisabled =
    !password.trim() ||
    !confirmPassword.trim() ||
    !qrCodeImage ||
    !passwordsMatch;

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Bottom Section with Registration Form */}
          <FormContainer>
            <Title>¡Registrate!</Title>

            {/* User Type Selection */}
            <UserTypeContainer>
              <UserTypeLabel>Ingresar como:</UserTypeLabel>
              <UserTypeButton>
                <MaterialIcons
                  name="home"
                  size={20}
                  color={colors.secondaryLight}
                />
                <UserTypeText isSelected={true}>Albergue</UserTypeText>
              </UserTypeButton>
            </UserTypeContainer>

            {/* QR Code Instructions */}
            <QRInstructions>
              Si el albergue acepta donaciones, por favor ingresa el código QR
              correspondiente en formato de imagen. Asegúrate de que la imagen
              del QR esté clara y legible para facilitar su escaneo.
            </QRInstructions>

            {/* QR Code Display/Upload Area */}
            <QRCodeContainer onPress={handlePickImage}>
              {qrCodeImage ? (
                <QRCodeImage
                  source={{ uri: qrCodeImage }}
                  resizeMode="contain"
                />
              ) : (
                <QRCodePlaceholder>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={48}
                    color={colors.textLight}
                  />
                  <QRCodePlaceholderText>
                    Toca para seleccionar QR
                  </QRCodePlaceholderText>
                </QRCodePlaceholder>
              )}
            </QRCodeContainer>

            {/* Password Input */}
            <InputWrapper>
              <InputIcon>
                <MaterialIcons
                  name="lock"
                  size={20}
                  color={colors.textSecondary}
                />
              </InputIcon>
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña."
                placeholderTextColor={colors.textLight}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <PasswordToggle onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={22}
                  color={colors.textSecondary}
                />
              </PasswordToggle>
            </InputWrapper>

            {/* Confirm Password Input */}
            <InputWrapper
              style={
                hasPasswordMismatch
                  ? { borderColor: '#E53E3E', borderWidth: 2 }
                  : {}
              }
            >
              <InputIcon>
                <MaterialIcons
                  name="lock-outline"
                  size={20}
                  color={colors.textSecondary}
                />
              </InputIcon>
              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Ingresa tu contraseña nuevamente."
                placeholderTextColor={colors.textLight}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <PasswordToggle
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <MaterialIcons
                  name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                  size={22}
                  color={colors.textSecondary}
                />
              </PasswordToggle>
            </InputWrapper>
            {hasPasswordMismatch && (
              <ErrorMessage>Las contraseñas no coinciden</ErrorMessage>
            )}

            {/* Navigation Buttons */}
            <ButtonsContainer>
              <BackButton onPress={handleGoBack}>
                <BackButtonText>VOLVER</BackButtonText>
              </BackButton>
              <RegisterButton
                onPress={handleRegister}
                disabled={isRegisterDisabled}
                activeOpacity={isRegisterDisabled ? 1 : 0.8}
              >
                <RegisterButtonText disabled={isRegisterDisabled}>
                  REGISTRARSE
                </RegisterButtonText>
              </RegisterButton>
            </ButtonsContainer>
          </FormContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const FormContainer = styled.View`
  background-color: ${colors.surface};
  flex: 1;
  padding: 32px 24px;
  padding-top: 60px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.secondary};
  margin-bottom: 24px;
  text-align: center;
`;

const UserTypeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
`;

const UserTypeLabel = styled.Text`
  font-size: 16px;
  color: ${colors.textPrimary};
  font-weight: 500;
`;

const UserTypeButton = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.surfaceLight};
  border-radius: 12px;
  padding: 10px 16px;
  border-width: 1px;
  border-color: ${colors.border};
  gap: 8px;
`;

const UserTypeText = styled.Text`
  font-size: 16px;
  color: ${props =>
    props.isSelected ? colors.secondaryLight : colors.textPrimary};
  font-weight: ${props => (props.isSelected ? 600 : 500)};
`;

const QRInstructions = styled.Text`
  font-size: 15px;
  color: ${colors.textSecondary};
  margin-bottom: 24px;
  line-height: 22px;
  text-align: center;
`;

const QRCodeContainer = styled.TouchableOpacity`
  width: 100%;
  aspect-ratio: 1;
  max-width: 300px;
  align-self: center;
  background-color: ${colors.surfaceLight};
  border-radius: 16px;
  border-width: 2px;
  border-color: ${colors.border};
  border-style: dashed;
  margin-bottom: 32px;
  overflow: hidden;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const QRCodeImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const QRCodePlaceholder = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const QRCodePlaceholderText = styled.Text`
  font-size: 14px;
  color: ${colors.textLight};
  margin-top: 12px;
  text-align: center;
`;

const InputWrapper = styled.View`
  background-color: ${colors.surface};
  border-radius: 16px;
  padding: 0;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
  border-width: 1.5px;
  border-color: ${colors.border};
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 8px;
  elevation: 2;
  min-height: 56px;
`;

const InputIcon = styled.View`
  padding-left: 16px;
  padding-right: 12px;
  justify-content: center;
`;

const PasswordInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.textPrimary};
  padding: 16px 12px 16px 0;
  font-weight: 400;
`;

const PasswordToggle = styled.TouchableOpacity`
  padding: 12px 16px;
  justify-content: center;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 32px;
`;

const BackButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${colors.primary};
  border-radius: 12px;
  padding: 14px 20px;
  align-items: center;
  justify-content: center;
  shadow-color: ${colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 8px;
  elevation: 4;
  min-height: 50px;
`;

const BackButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.surface};
  letter-spacing: 0.5px;
`;

const RegisterButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props =>
    props.disabled ? colors.border : colors.primary};
  border-radius: 12px;
  padding: 14px 20px;
  align-items: center;
  justify-content: center;
  shadow-color: ${props => (props.disabled ? 'transparent' : colors.primary)};
  shadow-offset: 0px 4px;
  shadow-opacity: ${props => (props.disabled ? 0 : 0.25)};
  shadow-radius: 8px;
  elevation: ${props => (props.disabled ? 0 : 4)};
  min-height: 50px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

const RegisterButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.surface};
  letter-spacing: 0.5px;
`;

const ErrorMessage = styled.Text`
  font-size: 14px;
  color: #e53e3e;
  margin-top: -8px;
  margin-bottom: 8px;
  margin-left: 4px;
  font-weight: 500;
`;

export default AlbergueRegisterStep2Screen;
