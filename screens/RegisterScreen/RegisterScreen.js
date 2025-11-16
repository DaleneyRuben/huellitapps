import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('Usuario');

  // Usuario fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Albergue fields
  const [shelterName, setShelterName] = useState('');
  const [managerFirstName, setManagerFirstName] = useState('');
  const [managerLastName, setManagerLastName] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [referenceEmail, setReferenceEmail] = useState('');
  const [shelterLocation, setShelterLocation] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleUserType = () => {
    setUserType(prev => (prev === 'Usuario' ? 'Albergue' : 'Usuario'));
  };

  const handleRegister = () => {
    // TODO: Implement registration logic
    if (userType === 'Usuario') {
      console.log('Registration attempt:', {
        userType,
        firstName,
        lastName,
        phone,
        email,
        password,
        confirmPassword,
      });
      // Navigate to verification screen for Usuario
      navigation.navigate('Verification');
    } else {
      console.log('Registration attempt:', {
        userType,
        shelterName,
        managerFirstName,
        managerLastName,
        referenceNumber,
        referenceEmail,
        shelterLocation,
      });
      // Navigate to step 2 for Albergue (QR code and password)
      navigation.navigate('AlbergueRegisterStep2');
    }
  };

  const passwordsMatch = password === confirmPassword;
  const hasPasswordMismatch =
    userType === 'Usuario' &&
    password.trim() &&
    confirmPassword.trim() &&
    !passwordsMatch;

  const isRegisterDisabled =
    userType === 'Usuario'
      ? !firstName.trim() ||
        !lastName.trim() ||
        !phone.trim() ||
        !email.trim() ||
        !password.trim() ||
        !confirmPassword.trim() ||
        !passwordsMatch
      : !shelterName.trim() ||
        !managerFirstName.trim() ||
        !managerLastName.trim() ||
        !referenceNumber.trim() ||
        !referenceEmail.trim() ||
        !shelterLocation.trim();

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
          {/* Top Section with Logo and Branding */}
          <TopSection>
            <LogoContainer>
              <LogoImage
                source={require('../../assets/logo.png')}
                resizeMode="contain"
              />
            </LogoContainer>
          </TopSection>

          {/* Bottom Section with Registration Form */}
          <BottomSection>
            <FormContainer>
              <Title>¡Registrate!</Title>

              {/* User Type Selection */}
              <UserTypeContainer>
                <UserTypeLabel>Ingresar como:</UserTypeLabel>
                <UserTypeButton onPress={toggleUserType}>
                  <MaterialIcons
                    name={userType === 'Usuario' ? 'person' : 'home'}
                    size={20}
                    color={
                      userType === 'Albergue'
                        ? colors.secondaryLight
                        : colors.textSecondary
                    }
                  />
                  <UserTypeText isSelected={userType === 'Albergue'}>
                    {userType}
                  </UserTypeText>
                </UserTypeButton>
              </UserTypeContainer>

              {/* Conditional Form Fields based on User Type */}
              {userType === 'Usuario' ? (
                <>
                  {/* First Name Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={firstName}
                      onChangeText={setFirstName}
                      placeholder="Nombre(s)*"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>

                  {/* Last Name Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={lastName}
                      onChangeText={setLastName}
                      placeholder="Apellido(s)*"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>

                  {/* Phone Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="phone"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="Número de celular."
                      placeholderTextColor={colors.textLight}
                      keyboardType="phone-pad"
                    />
                  </InputWrapper>

                  {/* Email Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="email"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Correo electrónico."
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                    />
                  </InputWrapper>

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
                    <PasswordToggle
                      onPress={() => setShowPassword(!showPassword)}
                    >
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
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <MaterialIcons
                        name={
                          showConfirmPassword ? 'visibility' : 'visibility-off'
                        }
                        size={22}
                        color={colors.textSecondary}
                      />
                    </PasswordToggle>
                  </InputWrapper>
                  {hasPasswordMismatch && (
                    <ErrorMessage>Las contraseñas no coinciden</ErrorMessage>
                  )}
                </>
              ) : (
                <>
                  {/* Shelter Name Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="home"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={shelterName}
                      onChangeText={setShelterName}
                      placeholder="Nombre del albergue"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>

                  {/* Manager First Name Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={managerFirstName}
                      onChangeText={setManagerFirstName}
                      placeholder="Nombre(s)* del Encargado"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>

                  {/* Manager Last Name Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={managerLastName}
                      onChangeText={setManagerLastName}
                      placeholder="Apellido(s)* del Encargado"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>

                  {/* Reference Number Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="description"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={referenceNumber}
                      onChangeText={setReferenceNumber}
                      placeholder="Numero de Referencia."
                      placeholderTextColor={colors.textLight}
                    />
                  </InputWrapper>

                  {/* Reference Email Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="email"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={referenceEmail}
                      onChangeText={setReferenceEmail}
                      placeholder="Correo Electronico de Referencia."
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                    />
                  </InputWrapper>

                  {/* Shelter Location Input */}
                  <InputWrapper>
                    <InputIcon>
                      <MaterialIcons
                        name="location-on"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={shelterLocation}
                      onChangeText={setShelterLocation}
                      placeholder="Ubicacion del Albergue"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>
                </>
              )}

              {/* Register Button */}
              <RegisterButton
                onPress={handleRegister}
                disabled={isRegisterDisabled}
                activeOpacity={isRegisterDisabled ? 1 : 0.8}
              >
                <RegisterButtonText disabled={isRegisterDisabled}>
                  {userType === 'Albergue' ? 'SIGUIENTE' : 'REGISTRARSE'}
                </RegisterButtonText>
              </RegisterButton>
            </FormContainer>
          </BottomSection>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const TopSection = styled.View`
  background-color: #fff8f0;
  padding-top: 80px;
  padding-bottom: 50px;
  align-items: center;
  justify-content: center;
  min-height: 280px;
`;

const LogoContainer = styled.View`
  margin-bottom: 24px;
`;

const LogoImage = styled.Image`
  width: 140px;
  height: 140px;
`;

const BottomSection = styled.View`
  background-color: #fff5eb;
  flex: 1;
  padding-top: 0;
`;

const FormContainer = styled.View`
  background-color: ${colors.surface};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  padding: 32px 24px;
  padding-top: 40px;
  flex: 1;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8;
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

const UserTypeButton = styled.TouchableOpacity`
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

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.textPrimary};
  padding: 16px 12px 16px 0;
  font-weight: 400;
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

const RegisterButton = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? colors.border : colors.primary};
  border-radius: 16px;
  padding: 18px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 32px;
  shadow-color: ${props => (props.disabled ? 'transparent' : colors.primary)};
  shadow-offset: 0px 6px;
  shadow-opacity: ${props => (props.disabled ? 0 : 0.3)};
  shadow-radius: 12px;
  elevation: ${props => (props.disabled ? 0 : 6)};
  min-height: 56px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

const RegisterButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${props => (props.disabled ? colors.surface : colors.surface)};
  letter-spacing: 1.5px;
`;

const ErrorMessage = styled.Text`
  font-size: 14px;
  color: #e53e3e;
  margin-top: -8px;
  margin-bottom: 8px;
  margin-left: 4px;
  font-weight: 500;
`;

export default RegisterScreen;
