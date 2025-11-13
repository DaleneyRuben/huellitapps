import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components/native';
import LostPetCard from '../../components/LostPetCard';
import Search from '../../components/Search';
import Toggle from '../../components/Toggle';
import PetDetailModal from '../../components/PetDetailModal';
import { colors } from '../../theme';
import { loadLostPets, convertPetToDisplayFormat } from '../../utils/storage';

const ANIMAL_TYPES = {
  DOG: 'dog',
  CAT: 'cat',
};

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPetType, setSelectedPetType] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [lostPets, setLostPets] = useState([]);

  const petTypeOptions = [
    { icon: 'pets', iconLibrary: 'MaterialIcons' },
    { icon: 'cat', iconLibrary: 'FontAwesome5' },
  ];

  const loadPets = async () => {
    const pets = await loadLostPets();
    const displayPets = pets.map(convertPetToDisplayFormat);
    setLostPets(displayPets);
  };

  useEffect(() => {
    loadPets();
  }, []);

  // Reload pets when screen comes into focus (e.g., after adding a new pet)
  useFocusEffect(
    React.useCallback(() => {
      loadPets();
    }, [])
  );

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handlePetTypeChange = index => {
    setSelectedPetType(index);
  };

  const handlePetCardPress = pet => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPet(null);
  };

  return (
    <Container edges={['left', 'right']}>
      <Row>
        <SearchWrapper>
          <Search
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={() => handleSearch(searchQuery)}
          />
        </SearchWrapper>

        <ToggleWrapper>
          <Toggle
            options={petTypeOptions}
            selectedIndex={selectedPetType}
            onSelect={handlePetTypeChange}
          />
        </ToggleWrapper>
      </Row>

      <StyledScrollView showsVerticalScrollIndicator={false}>
        {lostPets
          .filter(pet => {
            // Filter by pet type
            // Index 0 = Dogs, Index 1 = Cats
            const targetType =
              selectedPetType === 0 ? ANIMAL_TYPES.DOG : ANIMAL_TYPES.CAT;
            const matchesType = pet.type === targetType;

            // Filter by pet name (case-insensitive partial match)
            const matchesSearch =
              !searchQuery.trim() ||
              pet.petName
                .toLowerCase()
                .includes(searchQuery.toLowerCase().trim());

            return matchesType && matchesSearch;
          })
          .map(pet => (
            <LostPetCard
              key={pet.id}
              petName={pet.petName}
              timeLost={pet.timeLost}
              zone={pet.zone}
              characteristics={pet.characteristics}
              imageUrl={pet.imageUrl}
              onPress={() => handlePetCardPress(pet)}
            />
          ))}
      </StyledScrollView>

      <PetDetailModal
        visible={modalVisible}
        onClose={handleCloseModal}
        pet={selectedPet}
      />
    </Container>
  );
};

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
  padding: 16px;
  padding-bottom: 100px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

const SearchWrapper = styled.View`
  flex: 1;
  margin-right: 8px;
`;

const ToggleWrapper = styled.View`
  flex-shrink: 0;
`;

export default SearchScreen;
