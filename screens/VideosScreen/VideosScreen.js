import React, { useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubeIframe from 'react-native-youtube-iframe';
import { colors } from '../../theme';

const VideosScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const educativeVideoIds = ['pvWoB4XNZMo', 'cGndFehov9Q', 'glXIVw4-HgQ'];
  const testimoniosVideoIds = ['ZgQWyiZMDj8', 'Xspaw5KVYFk', 'Bw9Dnqw0fPI'];

  const [educativeLoaded, setEducativeLoaded] = useState({
    0: false,
    1: false,
    2: false,
  });
  const [testimoniosLoaded, setTestimoniosLoaded] = useState({
    0: false,
    1: false,
    2: false,
  });

  return (
    <Container>
      <HeaderContainer topInset={insets.top}>
        <MainContentRow>
          <BackButton onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </BackButton>
          <HeaderTitle>Videos</HeaderTitle>
          <PlaceholderView />
        </MainContentRow>
      </HeaderContainer>
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Videos Educativo Section */}
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Educativos</SectionTitle>
            <SectionDescription>
              Aprende sobre el cuidado y bienestar de las mascotas
            </SectionDescription>
          </SectionHeader>
          {educativeVideoIds.map((videoId, index) => (
            <VideoContainer key={index}>
              {!educativeLoaded[index] && (
                <LoadingOverlay>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <LoadingText>Cargando video...</LoadingText>
                </LoadingOverlay>
              )}
              <YoutubeIframe
                videoId={videoId}
                height={200}
                webViewStyle={{ backgroundColor: colors.surfaceLight }}
                onReady={() =>
                  setEducativeLoaded(prev => ({ ...prev, [index]: true }))
                }
                initialPlayerParams={{
                  modestbranding: true,
                  rel: false,
                  controls: true,
                  iv_load_policy: 3,
                  showClosedCaptions: false,
                }}
              />
            </VideoContainer>
          ))}
        </SectionContainer>

        {/* Testimonios Section */}
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Testimonios</SectionTitle>
            <SectionDescription>
              Historias reales de mascotas encontradas
            </SectionDescription>
          </SectionHeader>
          {testimoniosVideoIds.map((videoId, index) => (
            <VideoContainer key={index}>
              {!testimoniosLoaded[index] && (
                <LoadingOverlay>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <LoadingText>Cargando video...</LoadingText>
                </LoadingOverlay>
              )}
              <YoutubeIframe
                videoId={videoId}
                height={200}
                webViewStyle={{ backgroundColor: colors.surfaceLight }}
                onReady={() =>
                  setTestimoniosLoaded(prev => ({ ...prev, [index]: true }))
                }
                initialPlayerParams={{
                  modestbranding: true,
                  rel: false,
                  controls: true,
                  iv_load_policy: 3,
                  showClosedCaptions: false,
                }}
              />
            </VideoContainer>
          ))}
        </SectionContainer>
      </StyledScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const HeaderContainer = styled.View`
  position: relative;
  z-index: 1;
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
  position: relative;
`;

const BackButton = styled.TouchableOpacity`
  padding: 4px;
`;

const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textPrimary};
  flex: 1;
  text-align: center;
`;

const PlaceholderView = styled.View`
  width: 40px;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

const SectionContainer = styled.View`
  margin-bottom: 32px;
`;

const SectionHeader = styled.View`
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 6px;
`;

const SectionDescription = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary || colors.textPrimary};
  opacity: 0.7;
  line-height: 20px;
`;

const VideoContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${colors.surface};
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 3;
  position: relative;
`;

const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.surfaceLight || colors.surface};
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 16px;
`;

const LoadingText = styled.Text`
  font-size: 14px;
  color: ${colors.textSecondary || colors.textPrimary};
  font-weight: 500;
  margin-top: 12px;
  opacity: 0.7;
`;

export default VideosScreen;
