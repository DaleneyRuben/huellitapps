import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { loadNotifications, deleteNotification } from '../../utils/storage';
import PetDetailModal from '../../components/PetDetailModal';
import SeenPetDetailModal from '../../components/SeenPetDetailModal';
import FoundPetDetailModal from '../../components/FoundPetDetailModal';
import { loadLostPets, convertPetToDisplayFormat } from '../../utils/storage';

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [seenPetModalVisible, setSeenPetModalVisible] = useState(false);
  const [foundPetModalVisible, setFoundPetModalVisible] = useState(false);

  const loadNotificationsData = async () => {
    try {
      const notificationsData = await loadNotifications();
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNotificationsData();
  }, []);

  // Reload notifications when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadNotificationsData();
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadNotificationsData();
  };

  const handleDelete = async notificationId => {
    try {
      await deleteNotification(notificationId);
      loadNotificationsData();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleNotificationPress = async notification => {
    // For "pet_seen" notifications, show the seen pet detail modal
    if (notification.type === 'pet_seen') {
      setSelectedNotification(notification);
      setSeenPetModalVisible(true);
      return;
    }

    // For "pet_found" notifications, show the found pet detail modal
    if (notification.type === 'pet_found') {
      setSelectedNotification(notification);
      setFoundPetModalVisible(true);
      return;
    }

    // For other notification types (like "lost_pet_registered"), show the pet detail modal
    if (notification.petId) {
      // Load the pet details
      const pets = await loadLostPets();
      const pet = pets.find(p => p.id === notification.petId);
      if (pet) {
        const displayPet = convertPetToDisplayFormat(pet);
        setSelectedPet(displayPet);
        setModalVisible(true);
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPet(null);
  };

  const handleCloseSeenPetModal = () => {
    setSeenPetModalVisible(false);
    setSelectedNotification(null);
  };

  const handleCloseFoundPetModal = () => {
    setFoundPetModalVisible(false);
    setSelectedNotification(null);
  };

  const getPetTypeText = petType => {
    return petType === 'cat' ? 'gatito' : 'perrito';
  };

  const getNotificationTitle = notification => {
    const petTypeText = getPetTypeText(notification.petType || 'cat');
    switch (notification.type) {
      case 'lost_pet_registered':
        return `Se registró la pérdida de ${notification.petName}.`;
      case 'pet_seen':
        return `Vieron a tu ${petTypeText} ${notification.petName} en ${notification.location || 'una ubicación'}`;
      case 'pet_found':
        return `¡Se registro el Encuentro de ${notification.petName}!`;
      default:
        return 'Notificación';
    }
  };

  const getNotificationDescription = notification => {
    const petTypeText = getPetTypeText(notification.petType || 'cat');
    const capitalizedPetType =
      notification.petType === 'cat' ? 'Gatito' : 'Perrito';
    switch (notification.type) {
      case 'lost_pet_registered':
        return (
          notification.description ||
          `Se publicó correctamente la pérdida de tu ${petTypeText}. Mantén la calma; recibirás una notificación en cuanto alguien lo vea o lo encuentre.`
        );
      case 'pet_seen':
        return (
          notification.description ||
          `Se registró una vista de un ${petTypeText} similar al tuyo en ${notification.location || 'una ubicación'}. Haz clic aquí para obtener más detalles.`
        );
      case 'pet_found':
        return (
          notification.description ||
          `El albergue mis patitas amores encontro a tu ${capitalizedPetType} ${notification.petName}, haz clic aquí para ver el estado de tu ${capitalizedPetType}.`
        );
      default:
        return notification.description || '';
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderContainer topInset={insets.top}>
        <MainContentRow>
          <BackButton onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </BackButton>
          <HeaderTitle>Notificaciones</HeaderTitle>
          <PlaceholderView />
        </MainContentRow>
      </HeaderContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {notifications.length === 0 ? (
          <EmptyContainer>
            <EmptyIcon>
              <MaterialIcons
                name="notifications-none"
                size={64}
                color={colors.textLight}
              />
            </EmptyIcon>
            <EmptyText>No hay notificaciones</EmptyText>
            <EmptySubtext>
              Las notificaciones aparecerán aquí cuando haya actividad
              relacionada con tus mascotas.
            </EmptySubtext>
          </EmptyContainer>
        ) : (
          <NotificationsList>
            {notifications.map(notification => (
              <NotificationCard key={notification.id}>
                <NotificationContent
                  onPress={() => handleNotificationPress(notification)}
                >
                  {notification.imageUri ? (
                    <NotificationImage
                      source={{ uri: notification.imageUri }}
                    />
                  ) : (
                    <NotificationImagePlaceholder>
                      <MaterialIcons
                        name="pets"
                        size={32}
                        color={colors.textLight}
                      />
                    </NotificationImagePlaceholder>
                  )}
                  <NotificationTextContainer>
                    <NotificationTitle>
                      {getNotificationTitle(notification)}
                    </NotificationTitle>
                    <NotificationDescription>
                      {getNotificationDescription(notification)}
                    </NotificationDescription>
                  </NotificationTextContainer>
                </NotificationContent>
                <DeleteButton onPress={() => handleDelete(notification.id)}>
                  <MaterialIcons
                    name="close"
                    size={20}
                    color={colors.secondaryLight}
                  />
                </DeleteButton>
              </NotificationCard>
            ))}
          </NotificationsList>
        )}
      </ScrollView>
      <PetDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        pet={selectedPet}
      />
      <SeenPetDetailModal
        visible={seenPetModalVisible}
        onClose={handleCloseSeenPetModal}
        notification={selectedNotification}
      />
      <FoundPetDetailModal
        visible={foundPetModalVisible}
        onClose={handleCloseFoundPetModal}
        notification={selectedNotification}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const HeaderContainer = styled.View`
  padding-top: ${props => props.topInset || 0}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  background-color: ${colors.surface};
`;

const MainContentRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  padding: 4px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.primary};
  flex: 1;
  text-align: center;
`;

const PlaceholderView = styled.View`
  width: 32px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NotificationsList = styled.View`
  padding: 16px;
  gap: 12px;
`;

const NotificationCard = styled.View`
  background-color: ${colors.surface};
  border-radius: 12px;
  border-width: 2px;
  border-color: ${colors.primary};
  padding: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const NotificationContent = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
`;

const NotificationImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: ${colors.surfaceLight};
`;

const NotificationImagePlaceholder = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 12px;
  background-color: ${colors.surfaceLight};
  justify-content: center;
  align-items: center;
`;

const NotificationTextContainer = styled.View`
  flex: 1;
`;

const NotificationTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 6px;
  line-height: 22px;
`;

const NotificationDescription = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  line-height: 20px;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
  z-index: 10;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
  margin-top: 100px;
`;

const EmptyIcon = styled.View`
  margin-bottom: 16px;
`;

const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 8px;
  text-align: center;
`;

const EmptySubtext = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary};
  text-align: center;
  line-height: 20px;
`;

export default NotificationsScreen;
