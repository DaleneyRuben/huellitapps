import React, { useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { verifyCode } from '../../utils/emailService';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email || '';
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleCodeChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only take the last character
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    // Handle backspace to go to previous input
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSend = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 4) {
      // Verify the code
      const result = await verifyCode(verificationCode, email);

      if (result.valid) {
        // Navigate to main app after successful verification
        navigation.navigate('Tabs');
      } else {
        Alert.alert('Error', result.error || 'Código de verificación inválido');
        // Clear the code inputs
        setCode(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

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

          {/* Bottom Section with Verification Form */}
          <BottomSection>
            <FormContainer>
              {/* Verification Title with Icon */}
              <TitleContainer>
                <ShieldIconContainer>
                  <ShieldIcon>
                    <PawIcon>
                      <MaterialIcons
                        name="pets"
                        size={20}
                        color={colors.surface}
                      />
                    </PawIcon>
                  </ShieldIcon>
                </ShieldIconContainer>
                <TitleText>Código de verificación.</TitleText>
              </TitleContainer>

              {/* Instruction Text */}
              <InstructionText>
                Ingresa el código de verificación que enviamos a tu correo
                electrónico.
              </InstructionText>

              {/* Code Input Fields */}
              <CodeContainer>
                {code.map((digit, index) => (
                  <CodeInputWrapper key={index}>
                    <CodeInput
                      ref={ref => (inputRefs.current[index] = ref)}
                      value={digit}
                      onChangeText={value => handleCodeChange(index, value)}
                      onKeyPress={({ nativeEvent }) =>
                        handleKeyPress(index, nativeEvent.key)
                      }
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                    />
                  </CodeInputWrapper>
                ))}
              </CodeContainer>

              {/* Send Button */}
              <SendButton
                onPress={handleSend}
                disabled={!isCodeComplete}
                activeOpacity={isCodeComplete ? 0.8 : 1}
              >
                <SendButtonText disabled={!isCodeComplete}>
                  ENVIAR
                </SendButtonText>
              </SendButton>
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
  padding: 40px 24px;
  padding-top: 48px;
  flex: 1;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 12px;
  elevation: 8;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ShieldIconContainer = styled.View`
  margin-right: 16px;
`;

const ShieldIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${colors.secondaryLight};
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 3;
`;

const PawIcon = styled.View`
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.secondary};
  flex: 1;
`;

const InstructionText = styled.Text`
  font-size: 15px;
  color: ${colors.textSecondary};
  margin-bottom: 40px;
  line-height: 22px;
  padding-right: 8px;
`;

const CodeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 48px;
  gap: 16px;
  padding-horizontal: 4px;
`;

const CodeInputWrapper = styled.View`
  flex: 1;
  max-width: 72px;
`;

const CodeInput = styled.TextInput`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.surface};
  border-radius: 16px;
  border-width: 2px;
  border-color: ${colors.border};
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: ${colors.textPrimary};
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
  min-height: 72px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: ${props =>
    props.disabled ? colors.border : colors.primary};
  border-radius: 16px;
  padding: 18px;
  align-items: center;
  justify-content: center;
  shadow-color: ${props => (props.disabled ? 'transparent' : colors.primary)};
  shadow-offset: 0px 6px;
  shadow-opacity: ${props => (props.disabled ? 0 : 0.3)};
  shadow-radius: 12px;
  elevation: ${props => (props.disabled ? 0 : 6)};
  min-height: 56px;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
`;

const SendButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.surface};
  letter-spacing: 1.5px;
`;

export default VerificationScreen;
