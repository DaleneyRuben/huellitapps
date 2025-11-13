import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, semanticColors } from '../../theme';

const CARD_WIDTH = 120;
const CARD_MARGIN = 8;
const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_MARGIN;

const LostPetCarousel = ({ pets = [], onPetPress }) => {
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setContentWidth(contentWidth);
  };

  const handleLayout = event => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const scrollToLeft = () => {
    const newOffset = Math.max(0, scrollOffset - CARD_TOTAL_WIDTH * 2);
    scrollViewRef.current?.scrollTo({ x: newOffset, animated: true });
  };

  const scrollToRight = () => {
    const maxScroll = Math.max(0, contentWidth - containerWidth);
    const newOffset = Math.min(maxScroll, scrollOffset + CARD_TOTAL_WIDTH * 2);
    scrollViewRef.current?.scrollTo({ x: newOffset, animated: true });
  };

  const canScrollLeft = scrollOffset > 10;
  const canScrollRight =
    contentWidth > 0 &&
    containerWidth > 0 &&
    scrollOffset < contentWidth - containerWidth - 10;

  return (
    <Container>
      <HeaderText>
        Hay <OrangeText>{pets.length} perritos/gatitos</OrangeText> perdidos
        cerca de tu ubicación.
      </HeaderText>

      <CarouselWrapper onLayout={handleLayout}>
        {canScrollLeft && (
          <LeftArrow onPress={scrollToLeft}>
            <MaterialIcons name="chevron-left" size={20} color={colors.info} />
          </LeftArrow>
        )}

        <StyledScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onContentSizeChange={handleContentSizeChange}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {pets.map((pet, index) => (
            <PetCard
              key={pet.id || index}
              onPress={() => onPetPress && onPetPress(pet)}
              activeOpacity={0.7}
            >
              <PetName>{pet.petName}</PetName>
              <PetImage source={{ uri: pet.imageUrl }} />
              <DetailsContainer>
                <DetailRow>
                  <DetailLabel>Tiempo de Perdido:</DetailLabel>
                  <DetailValue>{pet.timeLost}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Zona o lugar:</DetailLabel>
                  <DetailValue>{pet.zone}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Características:</DetailLabel>
                  <DetailValue>{pet.characteristics}</DetailValue>
                </DetailRow>
              </DetailsContainer>
            </PetCard>
          ))}
        </StyledScrollView>

        {canScrollRight && (
          <RightArrow onPress={scrollToRight}>
            <MaterialIcons name="chevron-right" size={20} color={colors.info} />
          </RightArrow>
        )}
      </CarouselWrapper>
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 16px;
`;

const HeaderText = styled.Text`
  font-size: 14px;
  color: ${colors.textPrimary};
  margin-bottom: 12px;
  padding-horizontal: 16px;
`;

const OrangeText = styled.Text`
  color: ${colors.orange};
  font-weight: 600;
`;

const CarouselWrapper = styled.View`
  position: relative;
`;

const StyledScrollView = styled.ScrollView`
  flex-direction: row;
`;

const PetCard = styled.TouchableOpacity`
  width: ${CARD_WIDTH}px;
  background-color: ${colors.background};
  border: 2px solid ${colors.border};
  border-radius: 8px;
  padding: 4px;
  margin-right: ${CARD_MARGIN}px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const PetName = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.orange};
  font-weight: 600;
  margin-bottom: 2px;
`;

const PetImage = styled.Image`
  width: 100%;
  height: 70px;
  border-radius: 5px;
  margin-bottom: 3px;
  resize-mode: cover;
  background-color: ${colors.surfaceLight};
`;

const DetailsContainer = styled.View`
  gap: 1px;
`;

const DetailRow = styled.View`
  margin-bottom: 1px;
`;

const DetailLabel = styled.Text`
  font-size: 8px;
  font-weight: 600;
  color: ${semanticColors.labelText};
  margin-bottom: 0px;
`;

const DetailValue = styled.Text`
  font-size: 8px;
  color: ${colors.textPrimary};
  line-height: 10px;
`;

const LeftArrow = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-10px);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 6px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 5;
`;

const RightArrow = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-10px);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 6px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 5;
`;

export default LostPetCarousel;
