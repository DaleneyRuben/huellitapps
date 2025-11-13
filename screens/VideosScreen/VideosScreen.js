import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { colors } from '../../theme';

const VideosScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const educativeVideoRef = useRef(null);
  const testimonioRefs = [useRef(null), useRef(null), useRef(null)];
  const [fullscreenOpened, setFullscreenOpened] = useState({
    educative: false,
    testimonio0: false,
    testimonio1: false,
    testimonio2: false,
  });

  const educativeVideo = require('../../assets/educative.mov');
  const testimoniosVideos = [
    require('../../assets/case_1.mov'),
    require('../../assets/case_2.mov'),
    require('../../assets/case_3.mov'),
  ];

  const handleVideoLoad = async ref => {
    if (ref && ref.current) {
      try {
        const status = await ref.current.getStatusAsync();
        if (status.isLoaded) {
          // Seek to 2 seconds (2000ms) and pause to show that frame as poster
          await ref.current.setPositionAsync(800);
          await ref.current.pauseAsync();
        }
      } catch (error) {
        console.log('Error setting video position:', error);
      }
    }
  };

  const handlePlaybackStatusUpdate = async (status, videoKey) => {
    if (status.isLoaded) {
      // Open fullscreen when video starts playing
      if (status.isPlaying && !fullscreenOpened[videoKey]) {
        try {
          const ref =
            videoKey === 'educative'
              ? educativeVideoRef
              : testimonioRefs[parseInt(videoKey.replace('testimonio', ''))];

          if (ref && ref.current) {
            await ref.current.presentFullscreenPlayer();
            setFullscreenOpened(prev => ({ ...prev, [videoKey]: true }));
          }
        } catch (error) {
          console.log('Error presenting fullscreen:', error);
        }
      }
      // Reset flag when video is paused/stopped so it can open fullscreen again
      if (!status.isPlaying && fullscreenOpened[videoKey]) {
        setFullscreenOpened(prev => ({ ...prev, [videoKey]: false }));
      }
    }
  };

  return (
    <Container>
      <HeaderContainer topInset={insets.top}>
        <MainContentRow>
          <BackButton onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={colors.orange} />
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
            <Video
              ref={educativeVideoRef}
              source={educativeVideo}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              isLooping={false}
              onLoad={() => handleVideoLoad(educativeVideoRef)}
              onPlaybackStatusUpdate={status =>
                handlePlaybackStatusUpdate(status, 'educative')
              }
            />
          </VideoContainer>
        </SectionContainer>

        {/* Testimonios Section */}
        <SectionContainer>
          <SectionTitle>Testimonios</SectionTitle>
          {testimoniosVideos.map((video, index) => (
            <VideoContainer key={index}>
              <Video
                ref={testimonioRefs[index]}
                source={video}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                isLooping={false}
                onLoad={() => handleVideoLoad(testimonioRefs[index])}
                onPlaybackStatusUpdate={status =>
                  handlePlaybackStatusUpdate(status, `testimonio${index}`)
                }
              />
            </VideoContainer>
          ))}
        </SectionContainer>
      </StyledScrollView>
    </Container>
  );
};

const styles = {
  video: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surfaceLight,
  },
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
  color: ${colors.orange};
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
`;

export default VideosScreen;
