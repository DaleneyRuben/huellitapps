import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Login attempt:', { username, password });
    // Navigate to main app after successful login
    navigation.navigate('Tabs');
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password logic
    console.log('Forgot password');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const isLoginDisabled = !username.trim() || !password.trim();

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

          {/* Bottom Section with Login Form */}
          <BottomSection>
            <FormContainer>
              <SeparatorLine />
              <Title>Ingreso</Title>

              {/* Username/Email Input */}
              <InputWrapper>
                <InputIcon>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color={colors.textSecondary}
                  />
                </InputIcon>
                <StyledTextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Usuario o Correo Electronico"
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
                  placeholder="Contraseña"
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

              {/* Forgot Password Link */}
              <ForgotPasswordLink onPress={handleForgotPassword}>
                <ForgotPasswordText>
                  ¿Olvidaste tu contraseña?
                </ForgotPasswordText>
              </ForgotPasswordLink>

              {/* Login Button */}
              <LoginButton
                onPress={handleLogin}
                disabled={isLoginDisabled}
                activeOpacity={isLoginDisabled ? 1 : 0.8}
              >
                <LoginButtonText disabled={isLoginDisabled}>
                  INGRESAR
                </LoginButtonText>
              </LoginButton>

              {/* Alternative Login Text */}
              {/* <AlternativeLoginContainer>
                <AlternativeLoginLine />
                <AlternativeLoginText>O Ingresar con:</AlternativeLoginText>
                <AlternativeLoginLine />
              </AlternativeLoginContainer> */}

              {/* Register Card */}
              <RegisterCard>
                <RegisterTextContainer>
                  <RegisterText>¿No tienes una cuenta? </RegisterText>
                  <RegisterLink onPress={handleRegister}>
                    <RegisterLinkText>Registrarse</RegisterLinkText>
                  </RegisterLink>
                </RegisterTextContainer>
              </RegisterCard>
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

const SeparatorLine = styled.View`
  height: 3px;
  background-color: ${colors.secondaryLight};
  margin-bottom: 32px;
  width: 60px;
  align-self: center;
  border-radius: 2px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: 700;
  color: ${colors.secondary};
  margin-bottom: 32px;
  text-align: center;
`;

const InputWrapper = styled.View`
  background-color: ${colors.surface};
  border-radius: 16px;
  padding: 0;
  margin-bottom: 20px;
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

const ForgotPasswordLink = styled.TouchableOpacity`
  align-self: flex-end;
  margin-bottom: 32px;
  margin-top: 4px;
`;

const ForgotPasswordText = styled.Text`
  font-size: 15px;
  color: ${colors.secondary};
  font-weight: 600;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? colors.border : colors.primary};
  border-radius: 16px;
  padding: 18px;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  shadow-color: ${props => (props.disabled ? 'transparent' : colors.primary)};
  shadow-offset: 0px 6px;
  shadow-opacity: ${props => (props.disabled ? 0 : 0.3)};
  shadow-radius: 12px;
  elevation: ${props => (props.disabled ? 0 : 6)};
  min-height: 56px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

const LoginButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${props => (props.disabled ? colors.surface : colors.surface)};
  letter-spacing: 1.5px;
`;

const AlternativeLoginContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
  margin-top: 8px;
`;

const AlternativeLoginLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${colors.border};
`;

const AlternativeLoginText = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  padding-horizontal: 16px;
  font-weight: 500;
`;

const RegisterCard = styled.View`
  background-color: ${colors.surfaceLight};
  border-radius: 16px;
  padding: 24px 20px;
  align-items: center;
  border-width: 1px;
  border-color: ${colors.border};
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`;

const RegisterTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const RegisterText = styled.Text`
  font-size: 15px;
  color: ${colors.textSecondary};
  font-weight: 400;
`;

const RegisterLink = styled.TouchableOpacity`
  padding: 4px 2px;
`;

const RegisterLinkText = styled.Text`
  font-size: 15px;
  color: ${colors.secondaryLight};
  font-weight: 700;
`;

export default LoginScreen;
