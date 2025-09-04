import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const Search = ({
  placeholder = 'Buscador',
  value,
  onChangeText,
  onSubmit,
  style,
  ...props
}) => {
  return (
    <SearchContainer style={style}>
      <SearchIconContainer>
        <SearchIcon name="search" size={24} color={colors.textSecondary} />
      </SearchIconContainer>
      <SearchInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        {...props}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.surface};
  border-radius: 12px;
  padding-horizontal: 16px;
  padding-vertical: 6px;
  margin-horizontal: 8px;
  margin-vertical: 8px;
  shadow-color: ${colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const SearchIconContainer = styled.View``;

const SearchIcon = styled(MaterialIcons)`
  /* Icon styling is handled by MaterialIcons props */
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 11px;
  color: ${colors.textPrimary};
  font-weight: 400;
`;

export default Search;
