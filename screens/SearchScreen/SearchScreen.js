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

// Convert timeLost string to days for sorting (most recent = fewer days)
const parseTimeLostToDays = timeLost => {
  if (!timeLost) return Infinity; // Put missing data at the end

  const lower = timeLost.toLowerCase().trim();

  // "Hoy" = today = 0 days
  if (lower === 'hoy') return 0;

  // Parse "X días"
  const diasMatch = lower.match(/(\d+)\s*d[ií]a/);
  if (diasMatch) {
    return parseInt(diasMatch[1], 10);
  }

  // Parse "X semanas"
  const semanasMatch = lower.match(/(\d+)\s*semana/);
  if (semanasMatch) {
    return parseInt(semanasMatch[1], 10) * 7;
  }

  // Parse "X mes" or "X meses" (with optional days)
  const mesMatch = lower.match(/(\d+)\s*mes(?:es)?(?:\s*y\s*(\d+)\s*d[ií]a)?/);
  if (mesMatch) {
    const meses = parseInt(mesMatch[1], 10);
    const dias = mesMatch[2] ? parseInt(mesMatch[2], 10) : 0;
    return meses * 30 + dias; // Approximate 30 days per month
  }

  // If we can't parse it, put it at the end
  return Infinity;
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

            // Filter by pet name, characteristics, or zone (case-insensitive partial match)
            const searchTerm = searchQuery.toLowerCase().trim();
            const matchesSearch =
              !searchTerm ||
              pet.petName.toLowerCase().includes(searchTerm) ||
              (pet.characteristics &&
                pet.characteristics.toLowerCase().includes(searchTerm)) ||
              (pet.zone && pet.zone.toLowerCase().includes(searchTerm));

            return matchesType && matchesSearch;
          })
          .sort((a, b) => {
            // Sort by timeLost: most recent first (fewer days = first)
            const daysA = parseTimeLostToDays(a.timeLost);
            const daysB = parseTimeLostToDays(b.timeLost);
            return daysA - daysB;
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
