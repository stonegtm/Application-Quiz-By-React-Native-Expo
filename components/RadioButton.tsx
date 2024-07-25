import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type RadioButtonProps = {
  options: Option[];
  selectedOption: string | null;
  onSelect: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedOption,
  onSelect
}) => {
  return (
    <View style={styles.radioContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioButton}
          onPress={() => onSelect(option.value)}
        >
          <View style={styles.outerCircle}>
            {selectedOption === option.value && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3b82f6',
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default RadioButton;
