import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const Header = ({ topInset = 0 }) => {
  return (
    <HeaderContainer topInset={topInset}>
      {/* Main Content Row */}
      <MainContentRow>
        {/* Left: Film Strip Icon */}
        <LeftIconContainer>
          <MaterialIcons name="movie" size={24} color={colors.surface} />
        </LeftIconContainer>

        {/* Center: Logo and Text */}
        <LogoContainer>
          <LogoImage
            source={require('../../assets/logo.png')}
            resizeMode="contain"
            style={{ width: 100, height: 'auto' }}
          />
        </LogoContainer>

        {/* Right: Bell Icon */}
        <RightIconContainer>
          <MaterialIcons
            name="notifications"
            size={24}
            color={colors.surface}
          />
        </RightIconContainer>
      </MainContentRow>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  position: relative;
  z-index: 1;
  padding-top: ${props => (props.topInset || 0) + 5}px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  background-color: ${colors.orangeDark};
`;

const MainContentRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const LeftIconContainer = styled.View`
  align-items: flex-start;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const LogoImage = styled.Image`
  width: 32px;
  height: 32px;
`;

const LogoTextContainer = styled.View`
  margin-left: 8px;
`;

const LogoText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.info};
  letter-spacing: 1px;
`;

const RightIconContainer = styled.View`
  align-items: flex-end;
`;

export default Header;
