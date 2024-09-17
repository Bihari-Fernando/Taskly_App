import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, StatusBar, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get('window');

// Function to scale sizes based on screen width
const scale = (size) => (width / 375) * size;  // 375 is a standard width for scaling

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  // Update the status bar style based on dark mode
  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
  }, [isDarkMode]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: scale(20),  // Make padding responsive
      backgroundColor: isDarkMode ? '#333' : '#f2f2f2',
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scale(20),  // Make margin responsive
    },
    label: {
      fontSize: scale(fontSize),  // Scale font size based on screen size
      color: isDarkMode ? '#fff' : '#000',
    },
    slider: {
      width: '80%',
    },
  });

  return (
    <View style={styles.container}>
      {/* Dark Mode Toggle */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => setIsDarkMode(value)}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Font Size Slider */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>Font Size: {fontSize}</Text>
        <Slider
          style={styles.slider}
          minimumValue={10}
          maximumValue={24}
          value={fontSize}
          onValueChange={(value) => setFontSize(Math.round(value))}
          step={1}
          minimumTrackTintColor={isDarkMode ? '#4CAF50' : '#000'}
          maximumTrackTintColor={isDarkMode ? '#888' : '#ddd'}
          thumbTintColor={isDarkMode ? '#4CAF50' : '#000'}
        />
      </View>
    </View>
  );
}
