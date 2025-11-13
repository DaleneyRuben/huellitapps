import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../theme';

const Step2DateTimePicker = ({ formData, onFormDataChange, petType }) => {
  const [selectedDate, setSelectedDate] = useState(formData.date || new Date());
  const [selectedHour, setSelectedHour] = useState(formData.hour || 1);
  const [selectedMinute, setSelectedMinute] = useState(formData.minute || 30);
  const [selectedPeriod, setSelectedPeriod] = useState(formData.period || 'PM');

  const petTypeText = petType === 'cat' ? 'Gatito' : 'Perrito';

  const handleDateChange = date => {
    setSelectedDate(date);
    onFormDataChange({
      ...formData,
      date: date,
    });
  };

  const handleTimeChange = (field, value) => {
    const updates = { ...formData };
    if (field === 'hour') {
      setSelectedHour(value);
      updates.hour = value;
    } else if (field === 'minute') {
      setSelectedMinute(value);
      updates.minute = value;
    } else if (field === 'period') {
      setSelectedPeriod(value);
      updates.period = value;
    }
    onFormDataChange(updates);
  };

  const incrementHour = () => {
    const newHour = selectedHour >= 12 ? 1 : selectedHour + 1;
    handleTimeChange('hour', newHour);
  };

  const decrementHour = () => {
    const newHour = selectedHour <= 1 ? 12 : selectedHour - 1;
    handleTimeChange('hour', newHour);
  };

  const incrementMinute = () => {
    const newMinute = selectedMinute >= 59 ? 0 : selectedMinute + 1;
    handleTimeChange('minute', newMinute);
  };

  const decrementMinute = () => {
    const newMinute = selectedMinute <= 0 ? 59 : selectedMinute - 1;
    handleTimeChange('minute', newMinute);
  };

  const togglePeriod = () => {
    const newPeriod = selectedPeriod === 'AM' ? 'PM' : 'AM';
    handleTimeChange('period', newPeriod);
  };

  // Generate calendar days
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const dayNames = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  const navigateMonth = direction => {
    const newDate = new Date(selectedDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    handleDateChange(newDate);
  };

  const selectDate = day => {
    const newDate = new Date(currentYear, currentMonth, day);
    handleDateChange(newDate);
  };

  const renderCalendarDays = () => {
    const days = [];
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const prevMonthDays = prevMonth.getDate();

    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <CalendarDay key={`prev-${day}`} isOtherMonth>
          <DayText isOtherMonth>{day}</DayText>
        </CalendarDay>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate.getDate();
      days.push(
        <CalendarDay
          key={day}
          isSelected={isSelected}
          onPress={() => selectDate(day)}
        >
          {isSelected ? (
            <PawIcon>
              <MaterialIcons name="pets" size={20} color={colors.orange} />
            </PawIcon>
          ) : (
            <DayText isSelected={isSelected}>{day}</DayText>
          )}
        </CalendarDay>
      );
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <CalendarDay key={`next-${day}`} isOtherMonth>
          <DayText isOtherMonth>{day}</DayText>
        </CalendarDay>
      );
    }

    return days;
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuestionText>¿Cuándo se perdió tu {petTypeText}?</QuestionText>

        <CalendarContainer>
          <MonthHeader>
            <MonthNavButton onPress={() => navigateMonth('prev')}>
              <MaterialIcons
                name="chevron-left"
                size={24}
                color={colors.info}
              />
            </MonthNavButton>
            <MonthText>
              {monthNames[currentMonth]} {currentYear}
            </MonthText>
            <MonthNavButton onPress={() => navigateMonth('next')}>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={colors.info}
              />
            </MonthNavButton>
          </MonthHeader>

          <DaysOfWeek>
            {dayNames.map((day, index) => (
              <DayOfWeek key={index}>{day}</DayOfWeek>
            ))}
          </DaysOfWeek>

          <CalendarGrid>{renderCalendarDays()}</CalendarGrid>
        </CalendarContainer>

        <QuestionText style={{ marginTop: 24 }}>
          ¿A qué hora se perdió tu {petTypeText}?
        </QuestionText>

        <TimePickerContainer>
          <TimePickerColumn>
            <TimePickerButton onPress={incrementHour}>
              <MaterialIcons
                name="keyboard-arrow-up"
                size={24}
                color={colors.info}
              />
            </TimePickerButton>
            <TimeDisplay>
              <TimeText>{String(selectedHour).padStart(2, '0')}</TimeText>
            </TimeDisplay>
            <TimePickerButton onPress={decrementHour}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color={colors.info}
              />
            </TimePickerButton>
          </TimePickerColumn>

          <TimeSeparator>:</TimeSeparator>

          <TimePickerColumn>
            <TimePickerButton onPress={incrementMinute}>
              <MaterialIcons
                name="keyboard-arrow-up"
                size={24}
                color={colors.info}
              />
            </TimePickerButton>
            <TimeDisplay>
              <TimeText>{String(selectedMinute).padStart(2, '0')}</TimeText>
            </TimeDisplay>
            <TimePickerButton onPress={decrementMinute}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color={colors.info}
              />
            </TimePickerButton>
          </TimePickerColumn>

          <TimePickerColumn>
            <TimePickerButton onPress={togglePeriod}>
              <MaterialIcons
                name="keyboard-arrow-up"
                size={24}
                color={colors.info}
              />
            </TimePickerButton>
            <TimeDisplay>
              <TimeText>{selectedPeriod}</TimeText>
            </TimeDisplay>
            <TimePickerButton onPress={togglePeriod}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color={colors.info}
              />
            </TimePickerButton>
          </TimePickerColumn>
        </TimePickerContainer>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 0;
`;

const QuestionText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.info};
  margin-bottom: 16px;
`;

const CalendarContainer = styled.View`
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
`;

const MonthHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MonthNavButton = styled.TouchableOpacity`
  padding: 8px;
`;

const MonthText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.info};
`;

const DaysOfWeek = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 8px;
`;

const DayOfWeek = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.info};
  width: 40px;
  text-align: center;
`;

const CalendarGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CalendarDay = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 4px;
  border-radius: 20px;
  background-color: ${props =>
    props.isSelected ? colors.surface : 'transparent'};
`;

const DayText = styled.Text`
  font-size: 16px;
  font-weight: ${props => (props.isSelected ? '600' : '400')};
  color: ${props =>
    props.isOtherMonth
      ? colors.textLight
      : props.isSelected
        ? colors.info
        : colors.info};
`;

const PawIcon = styled.View`
  justify-content: center;
  align-items: center;
`;

const TimePickerContainer = styled.View`
  background-color: ${colors.orangeLight};
  border-radius: 16px;
  padding: 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const TimePickerColumn = styled.View`
  align-items: center;
  gap: 8px;
`;

const TimePickerButton = styled.TouchableOpacity`
  padding: 4px;
`;

const TimeDisplay = styled.View`
  border-radius: 8px;
  padding: 12px 16px;
  min-width: 60px;
  align-items: center;
  justify-content: center;
`;

const TimeText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

const TimeSeparator = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.info};
  margin-bottom: 20px;
`;

export default Step2DateTimePicker;
