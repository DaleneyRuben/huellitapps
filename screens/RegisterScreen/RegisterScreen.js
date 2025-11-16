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

  // Validation errors
  const [errors, setErrors] = useState({});

  const toggleUserType = () => {
    setUserType(prev => (prev === 'Usuario' ? 'Albergue' : 'Usuario'));
    // Clear errors when switching user type
    setErrors({});
  };

  // Validation functions
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = phone => {
    // Remove spaces, dashes, and parentheses for validation
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    // Check if it's all digits and has reasonable length (7-15 digits)
    return (
      /^\d+$/.test(cleanedPhone) &&
      cleanedPhone.length >= 7 &&
      cleanedPhone.length <= 15
    );
  };

  const validatePassword = password => {
    // At least 6 characters
    return password.length >= 6;
  };

  const validateField = (fieldName, value, userType) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) {
          newErrors.firstName = 'El nombre es requerido';
        } else if (value.trim().length < 2) {
          newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete newErrors.firstName;
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          newErrors.lastName = 'El apellido es requerido';
        } else if (value.trim().length < 2) {
          newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
        } else {
          delete newErrors.lastName;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'El número de celular es requerido';
        } else if (!validatePhone(value)) {
          newErrors.phone = 'Ingresa un número de celular válido';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = 'El correo electrónico es requerido';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Ingresa un correo electrónico válido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value.trim()) {
          newErrors.password = 'La contraseña es requerida';
        } else if (!validatePassword(value)) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (!value.trim()) {
          newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (userType === 'Usuario' && value !== password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'shelterName':
        if (!value.trim()) {
          newErrors.shelterName = 'El nombre del albergue es requerido';
        } else {
          delete newErrors.shelterName;
        }
        break;

      case 'managerFirstName':
        if (!value.trim()) {
          newErrors.managerFirstName = 'El nombre del encargado es requerido';
        } else {
          delete newErrors.managerFirstName;
        }
        break;

      case 'managerLastName':
        if (!value.trim()) {
          newErrors.managerLastName = 'El apellido del encargado es requerido';
        } else {
          delete newErrors.managerLastName;
        }
        break;

      case 'referenceNumber':
        if (!value.trim()) {
          newErrors.referenceNumber = 'El número de referencia es requerido';
        } else if (!validatePhone(value)) {
          newErrors.referenceNumber = 'Ingresa un número de celular válido';
        } else {
          delete newErrors.referenceNumber;
        }
        break;

      case 'referenceEmail':
        if (!value.trim()) {
          newErrors.referenceEmail = 'El correo de referencia es requerido';
        } else if (!validateEmail(value)) {
          newErrors.referenceEmail = 'Ingresa un correo electrónico válido';
        } else {
          delete newErrors.referenceEmail;
        }
        break;

      case 'shelterLocation':
        if (!value.trim()) {
          newErrors.shelterLocation = 'La ubicación del albergue es requerida';
        } else {
          delete newErrors.shelterLocation;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateAllFields = () => {
    if (userType === 'Usuario') {
      validateField('firstName', firstName, userType);
      validateField('lastName', lastName, userType);
      validateField('phone', phone, userType);
      validateField('email', email, userType);
      validateField('password', password, userType);
      validateField('confirmPassword', confirmPassword, userType);
    } else {
      validateField('shelterName', shelterName, userType);
      validateField('managerFirstName', managerFirstName, userType);
      validateField('managerLastName', managerLastName, userType);
      validateField('referenceNumber', referenceNumber, userType);
      validateField('referenceEmail', referenceEmail, userType);
      validateField('shelterLocation', shelterLocation, userType);
    }
  };

  const handleRegister = () => {
    // Validate all fields before proceeding
    validateAllFields();

    // Check if form is valid (using the same logic as isFormValid)
    const isValid =
      userType === 'Usuario'
        ? firstName.trim() &&
          lastName.trim() &&
          phone.trim() &&
          email.trim() &&
          validateEmail(email) &&
          validatePhone(phone) &&
          password.trim() &&
          validatePassword(password) &&
          confirmPassword.trim() &&
          passwordsMatch
        : shelterName.trim() &&
          managerFirstName.trim() &&
          managerLastName.trim() &&
          referenceNumber.trim() &&
          validatePhone(referenceNumber) &&
          referenceEmail.trim() &&
          validateEmail(referenceEmail) &&
          shelterLocation.trim();

    if (!isValid) {
      return;
    }

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

  // Check if form is valid
  const isFormValid =
    userType === 'Usuario'
      ? firstName.trim() &&
        lastName.trim() &&
        phone.trim() &&
        email.trim() &&
        validateEmail(email) &&
        validatePhone(phone) &&
        password.trim() &&
        validatePassword(password) &&
        confirmPassword.trim() &&
        passwordsMatch
      : shelterName.trim() &&
        managerFirstName.trim() &&
        managerLastName.trim() &&
        referenceNumber.trim() &&
        validatePhone(referenceNumber) &&
        referenceEmail.trim() &&
        validateEmail(referenceEmail) &&
        shelterLocation.trim();

  const isRegisterDisabled = !isFormValid;

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
                  <InputWrapper
                    style={
                      errors.firstName
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={firstName}
                      onChangeText={value => {
                        setFirstName(value);
                        if (errors.firstName) {
                          validateField('firstName', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField('firstName', firstName, userType)
                      }
                      placeholder="Nombre(s)*"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>
                  {errors.firstName && (
                    <ErrorMessage>{errors.firstName}</ErrorMessage>
                  )}

                  {/* Last Name Input */}
                  <InputWrapper
                    style={
                      errors.lastName
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={lastName}
                      onChangeText={value => {
                        setLastName(value);
                        if (errors.lastName) {
                          validateField('lastName', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField('lastName', lastName, userType)
                      }
                      placeholder="Apellido(s)*"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>
                  {errors.lastName && (
                    <ErrorMessage>{errors.lastName}</ErrorMessage>
                  )}

                  {/* Phone Input */}
                  <InputWrapper
                    style={
                      errors.phone
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="phone"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={phone}
                      onChangeText={value => {
                        setPhone(value);
                        if (errors.phone) {
                          validateField('phone', value, userType);
                        }
                      }}
                      onBlur={() => validateField('phone', phone, userType)}
                      placeholder="Número de celular."
                      placeholderTextColor={colors.textLight}
                      keyboardType="phone-pad"
                    />
                  </InputWrapper>
                  {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}

                  {/* Email Input */}
                  <InputWrapper
                    style={
                      errors.email
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="email"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={email}
                      onChangeText={value => {
                        setEmail(value);
                        if (errors.email) {
                          validateField('email', value, userType);
                        }
                      }}
                      onBlur={() => validateField('email', email, userType)}
                      placeholder="Correo electrónico."
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                    />
                  </InputWrapper>
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

                  {/* Password Input */}
                  <InputWrapper
                    style={
                      errors.password
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="lock"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <PasswordInput
                      value={password}
                      onChangeText={value => {
                        setPassword(value);
                        if (errors.password) {
                          validateField('password', value, userType);
                        }
                        // Re-validate confirm password if it has a value
                        if (confirmPassword) {
                          validateField(
                            'confirmPassword',
                            confirmPassword,
                            userType
                          );
                        }
                      }}
                      onBlur={() =>
                        validateField('password', password, userType)
                      }
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
                  {errors.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  )}

                  {/* Confirm Password Input */}
                  <InputWrapper
                    style={
                      errors.confirmPassword || hasPasswordMismatch
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
                      onChangeText={value => {
                        setConfirmPassword(value);
                        if (errors.confirmPassword || hasPasswordMismatch) {
                          validateField('confirmPassword', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField(
                          'confirmPassword',
                          confirmPassword,
                          userType
                        )
                      }
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
                  {(errors.confirmPassword || hasPasswordMismatch) && (
                    <ErrorMessage>
                      {errors.confirmPassword || 'Las contraseñas no coinciden'}
                    </ErrorMessage>
                  )}
                </>
              ) : (
                <>
                  {/* Shelter Name Input */}
                  <InputWrapper
                    style={
                      errors.shelterName
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="home"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={shelterName}
                      onChangeText={value => {
                        setShelterName(value);
                        if (errors.shelterName) {
                          validateField('shelterName', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField('shelterName', shelterName, userType)
                      }
                      placeholder="Nombre del albergue"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>
                  {errors.shelterName && (
                    <ErrorMessage>{errors.shelterName}</ErrorMessage>
                  )}

                  {/* Manager First Name Input */}
                  <InputWrapper
                    style={
                      errors.managerFirstName
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={managerFirstName}
                      onChangeText={value => {
                        setManagerFirstName(value);
                        if (errors.managerFirstName) {
                          validateField('managerFirstName', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField(
                          'managerFirstName',
                          managerFirstName,
                          userType
                        )
                      }
                      placeholder="Nombre(s)* del Encargado"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>
                  {errors.managerFirstName && (
                    <ErrorMessage>{errors.managerFirstName}</ErrorMessage>
                  )}

                  {/* Manager Last Name Input */}
                  <InputWrapper
                    style={
                      errors.managerLastName
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="person-outline"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={managerLastName}
                      onChangeText={value => {
                        setManagerLastName(value);
                        if (errors.managerLastName) {
                          validateField('managerLastName', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField(
                          'managerLastName',
                          managerLastName,
                          userType
                        )
                      }
                      placeholder="Apellido(s)* del Encargado"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>
                  {errors.managerLastName && (
                    <ErrorMessage>{errors.managerLastName}</ErrorMessage>
                  )}

                  {/* Reference Number Input */}
                  <InputWrapper
                    style={
                      errors.referenceNumber
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="phone"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={referenceNumber}
                      onChangeText={value => {
                        setReferenceNumber(value);
                        if (errors.referenceNumber) {
                          validateField('referenceNumber', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField(
                          'referenceNumber',
                          referenceNumber,
                          userType
                        )
                      }
                      placeholder="Numero de Referencia."
                      placeholderTextColor={colors.textLight}
                      keyboardType="phone-pad"
                    />
                  </InputWrapper>
                  {errors.referenceNumber && (
                    <ErrorMessage>{errors.referenceNumber}</ErrorMessage>
                  )}

                  {/* Reference Email Input */}
                  <InputWrapper
                    style={
                      errors.referenceEmail
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="email"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={referenceEmail}
                      onChangeText={value => {
                        setReferenceEmail(value);
                        if (errors.referenceEmail) {
                          validateField('referenceEmail', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField(
                          'referenceEmail',
                          referenceEmail,
                          userType
                        )
                      }
                      placeholder="Correo Electronico de Referencia."
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                    />
                  </InputWrapper>
                  {errors.referenceEmail && (
                    <ErrorMessage>{errors.referenceEmail}</ErrorMessage>
                  )}

                  {/* Shelter Location Input */}
                  <InputWrapper
                    style={
                      errors.shelterLocation
                        ? { borderColor: '#E53E3E', borderWidth: 2 }
                        : {}
                    }
                  >
                    <InputIcon>
                      <MaterialIcons
                        name="location-on"
                        size={20}
                        color={colors.textSecondary}
                      />
                    </InputIcon>
                    <StyledTextInput
                      value={shelterLocation}
                      onChangeText={value => {
                        setShelterLocation(value);
                        if (errors.shelterLocation) {
                          validateField('shelterLocation', value, userType);
                        }
                      }}
                      onBlur={() =>
                        validateField(
                          'shelterLocation',
                          shelterLocation,
                          userType
                        )
                      }
                      placeholder="Ubicacion del Albergue"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="words"
                    />
                  </InputWrapper>
                  {errors.shelterLocation && (
                    <ErrorMessage>{errors.shelterLocation}</ErrorMessage>
                  )}
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
