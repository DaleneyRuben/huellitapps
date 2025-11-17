import React, { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
// import { resetStorage } from '../../utils/storage';

const Account = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('Abigail');
  const [lastName, setLastName] = useState('Daleney');
  const [phone, setPhone] = useState('77788899');
  const [email, setEmail] = useState('abigail.daleney@gmail.com');

  return (
    <Container edges={['left', 'right']}>
      <StyledScrollView
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
      >
        {/* Profile Picture Section */}
        <ProfilePictureContainer>
          <ProfilePicture>
            <MaterialIcons name="pets" size={60} color="#FFFFFF" />
          </ProfilePicture>
          <EditProfileButton>
            <MaterialIcons name="edit" size={20} color={colors.primary} />
          </EditProfileButton>
        </ProfilePictureContainer>

        {/* Profile Section */}
        <Section>
          <SectionTitle>Perfil</SectionTitle>
          <InputContainer>
            <StyledTextInput
              placeholder="Nombre(s)*"
              placeholderTextColor={colors.textLight}
              value={name}
              onChangeText={setName}
            />
            <EditIcon>
              <MaterialIcons
                name="edit"
                size={18}
                color={colors.textSecondary}
              />
            </EditIcon>
          </InputContainer>

          <InputContainer>
            <StyledTextInput
              placeholder="Apellidos(s)*"
              placeholderTextColor={colors.textLight}
              value={lastName}
              onChangeText={setLastName}
            />
            <EditIcon>
              <MaterialIcons
                name="edit"
                size={18}
                color={colors.textSecondary}
              />
            </EditIcon>
          </InputContainer>

          <InputContainer>
            <StyledTextInput
              placeholder="Número de Celular"
              placeholderTextColor={colors.textLight}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <EditIcon>
              <MaterialIcons
                name="edit"
                size={18}
                color={colors.textSecondary}
              />
            </EditIcon>
          </InputContainer>

          <InputContainer>
            <StyledTextInput
              placeholder="Correo Electronico"
              placeholderTextColor={colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <EditIcon>
              <MaterialIcons
                name="edit"
                size={18}
                color={colors.textSecondary}
              />
            </EditIcon>
          </InputContainer>
        </Section>

        {/* Configuration Section */}
        <Section>
          <SectionTitle>Configuración</SectionTitle>

          <ConfigItem>
            <ConfigIcon>
              <MaterialIcons
                name="notifications"
                size={24}
                color={colors.textSecondary}
              />
            </ConfigIcon>
            <ConfigText>Notificaciones</ConfigText>
          </ConfigItem>
          <Separator />

          <ConfigItem onPress={() => navigation.navigate('Videos')}>
            <ConfigIcon>
              <MaterialIcons
                name="info"
                size={24}
                color={colors.textSecondary}
              />
            </ConfigIcon>
            <ConfigText>Videos y Tutoriales</ConfigText>
          </ConfigItem>
          <Separator />

          {/* <ConfigItem
            onPress={async () => {
              Alert.alert(
                'Resetear Datos',
                '¿Estás seguro de que deseas resetear todos los datos? Esto eliminará todas las mascotas guardadas y las reemplazará con los datos iniciales.',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Resetear',
                    style: 'destructive',
                    onPress: async () => {
                      const success = await resetStorage();
                      Alert.alert(
                        success ? 'Éxito' : 'Error',
                        success
                          ? 'Los datos se han reseteado correctamente. Las imágenes actualizadas ahora están disponibles.'
                          : 'Hubo un error al resetear. Por favor intenta de nuevo.'
                      );
                    },
                  },
                ]
              );
            }}
          >
            <ConfigIcon>
              <MaterialIcons
                name="refresh"
                size={24}
                color={colors.textSecondary}
              />
            </ConfigIcon>
            <ConfigText>Resetear Datos</ConfigText>
          </ConfigItem>
          <Separator /> */}

          <ConfigItem
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <ConfigIcon>
              <MaterialIcons name="logout" size={24} color="#6B9AC4" />
            </ConfigIcon>
            <ConfigTextLogout>Cerrar Sesión</ConfigTextLogout>
          </ConfigItem>
        </Section>
      </StyledScrollView>
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
`;

const ProfilePictureContainer = styled.View`
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px;
`;

const ProfilePicture = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const EditProfileButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 35%;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const Section = styled.View`
  margin-bottom: 30px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.primary};
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary};
`;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.background};
  border-radius: 8px;
  padding: 12px 15px;
  margin-bottom: 12px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

const StyledTextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${colors.textPrimary};
`;

const EditIcon = styled.View`
  margin-left: 10px;
`;

const ConfigItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 0;
`;

const ConfigIcon = styled.View`
  margin-right: 15px;
`;

const ConfigText = styled.Text`
  font-size: 16px;
  color: ${colors.textPrimary};
`;

const ConfigTextLogout = styled.Text`
  font-size: 16px;
  color: #6b9ac4;
`;

const Separator = styled.View`
  height: 1px;
  background-color: ${colors.border};
  margin-left: 39px;
`;

export default Account;
