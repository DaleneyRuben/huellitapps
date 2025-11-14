import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import YoutubeIframe from 'react-native-youtube-iframe';
import { colors } from '../../theme';

const VideosScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const educativeVideoId = 'pvWoB4XNZMo';
  const testimoniosVideoIds = ['ZgQWyiZMDj8', 'Xspaw5KVYFk', 'Bw9Dnqw0fPI'];

  const [educativeLoaded, setEducativeLoaded] = useState(false);
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
      <StyledScrollView showsVerticalScrollIndicator={false}>
        {/* Videos Educativo Section */}
        <SectionContainer>
          <SectionTitle>Educativos</SectionTitle>
          <VideoContainer>
            {!educativeLoaded && (
              <LoadingOverlay>
                <LoadingText>Cargando video...</LoadingText>
              </LoadingOverlay>
            )}
            <YoutubeIframe
              videoId={educativeVideoId}
              height={200}
              webViewStyle={{ backgroundColor: colors.surfaceLight }}
              onReady={() => setEducativeLoaded(true)}
              initialPlayerParams={{
                modestbranding: true,
                rel: false,
                controls: true,
                iv_load_policy: 3,
                showClosedCaptions: false,
              }}
            />
          </VideoContainer>
        </SectionContainer>

        {/* Testimonios Section */}
        <SectionContainer>
          <SectionTitle>Testimonios</SectionTitle>
          {testimoniosVideoIds.map((videoId, index) => (
            <VideoContainer key={index}>
              {!testimoniosLoaded[index] && (
                <LoadingOverlay>
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
  padding-bottom: 2px;
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
  padding: 16px;
`;

const SectionContainer = styled.View`
  margin-bottom: 12px;
`;

const SectionTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 16px;
`;

const VideoContainer = styled.View`
  width: 100%;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${colors.surface};
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 4;
  position: relative;
`;

const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.surfaceLight};
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 12px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: ${colors.textSecondary || colors.textPrimary};
  font-weight: 500;
`;

export default VideosScreen;
