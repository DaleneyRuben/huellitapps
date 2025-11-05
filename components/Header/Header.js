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
          <MaterialIcons name="movie" size={24} color={colors.orange} />
        </LeftIconContainer>

        {/* Center: Logo and Text */}
        <LogoContainer>
          <LogoWrapper>
            <LogoImage
              source={require('../../assets/logo.png')}
              resizeMode="cover"
            />
          </LogoWrapper>
        </LogoContainer>

        {/* Right: Bell Icon */}
        <RightIconContainer>
          <MaterialIcons name="notifications" size={24} color={colors.orange} />
        </RightIconContainer>
      </MainContentRow>
    </HeaderContainer>
  );
};

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

const LeftIconContainer = styled.View`
  align-items: flex-start;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const LogoWrapper = styled.View`
  overflow: hidden;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.Image`
  width: 120px;
  height: 120px;
  margin-top: -15px;
  margin-bottom: -15px;
`;

const RightIconContainer = styled.View`
  align-items: flex-end;
`;

export default Header;
