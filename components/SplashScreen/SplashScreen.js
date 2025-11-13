import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../theme';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Hide splash after 1.5 seconds
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onFinish();
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SplashContainer>
      <AnimatedContainer
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <LogoImage
          source={require('../../assets/logo.png')}
          resizeMode="contain"
        />
      </AnimatedContainer>
    </SplashContainer>
  );
};

const SplashContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const AnimatedContainer = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export default SplashScreen;
