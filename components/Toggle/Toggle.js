import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const Toggle = ({
  options = [],
  selectedIndex = 0,
  onSelect,
  disabled = false,
  style,
}) => {
  return (
    <ToggleContainer style={style}>
      {options.map((option, index) => (
        <ToggleSegment
          key={index}
          isActive={index === selectedIndex}
          isFirst={index === 0}
          isLast={index === options.length - 1}
          onPress={() => !disabled && onSelect(index)}
          disabled={disabled}
        >
          <SegmentIcon
            name={option.icon}
            size={20}
            color={
              index === selectedIndex ? colors.surface : colors.textSecondary
            }
          />
          <SegmentLabel isActive={index === selectedIndex}>
            {option.label}
          </SegmentLabel>
        </ToggleSegment>
      ))}
    </ToggleContainer>
  );
};

const ToggleContainer = styled.View`
  flex-direction: row;
  background-color: ${colors.surface};
  border-radius: 12px;
  padding: 0px;
  margin-horizontal: 2px;
  margin-vertical: 6px;
  min-width: 100px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  border: 1px solid ${colors.border};
`;

const ToggleSegment = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-vertical: 5px;
  padding-horizontal: 12px;
  background-color: ${props =>
    props.isActive ? colors.primary : 'transparent'};
  border-radius: ${props => {
    if (props.isFirst) return '8px 0px 0px 8px';
    if (props.isLast) return '0px 8px 8px 0px';
    return '0px';
  }};
  margin-left: ${props => (props.isFirst ? '0px' : '2px')};
  margin-right: ${props => (props.isLast ? '0px' : '2px')};
`;

const SegmentIcon = styled(MaterialIcons)`
  margin-right: 1px;
`;

const SegmentLabel = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${props => (props.isActive ? colors.surface : colors.textSecondary)};
`;

export default Toggle;
