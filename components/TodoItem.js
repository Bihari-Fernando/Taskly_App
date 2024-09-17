import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const flagColors = [
  { color: '#FF0000', name: 'Red' },
  { color: '#FF9900', name: 'Orange' },
  { color: '#FFD700', name: 'Yellow' },
  { color: '#800080', name: 'Purple' },
  { color: '#0000FF', name: 'Blue' },
  { color: '#008000', name: 'Green' },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.02, // Responsive margin
    paddingHorizontal: width * 0.03, // Responsive padding
    paddingVertical: height * 0.01,  // Responsive padding
    backgroundColor: '#d1cfcf',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  checkboxAndText: {
    flexDirection: 'row',
    alignItems: 'center', // Ensure both are vertically aligned
    flex: 1,
  },
  checkbox: {
    marginRight: width * 0.02, // Space between checkbox and text
  },
  taskText: {
    fontSize: width > 600 ? 18 : 15, // Responsive font size
    color: '#333',
  },
  deleteButton: {
    marginLeft: width * 0.02, // Responsive margin
  },
  deleteIcon: {
    color: '#000',
  },
  flagButton: {
    marginLeft: width * 0.02, // Responsive margin
    padding: 5,
    borderRadius: 5,
  },
  flagIcon: {
    color: '#000', // Default color
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8, // Responsive width
  },
  flagRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  flagOption: {
    padding: 10,
  },
  clearButton: {
    color: '#ff0000',
    marginTop: 10,
    fontSize: width > 600 ? 18 : 14, // Responsive font size
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default function TodoItem({ task, deleteTask, toggleCompleted, onPress, onFlagPress }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Checkbox and Task Name */}
      <View style={styles.checkboxAndText}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleCompleted(task.id)}
        >
          <Icon
            name={task.completed ? 'check-box' : 'check-box-outline-blank'}
            size={width > 600 ? 30 : 24} // Responsive icon size
            color="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
          <Text style={styles.taskText}>{task.text}</Text>
        </TouchableOpacity>
      </View>

      {/* Flag Button */}
      <TouchableOpacity
        style={styles.flagButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon
          name="flag"
          size={width > 600 ? 30 : 24} // Responsive icon size
          style={[styles.flagIcon, { color: task.flagColor || '#000' }]}
        />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(task.id)}
      >
        <Icon name="delete" size={width > 600 ? 30 : 24} style={styles.deleteIcon} />
      </TouchableOpacity>

      {/* Flag Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text>Select a Flag</Text>
            <View style={styles.flagRow}>
              {flagColors.map((flag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.flagOption}
                  onPress={() => {
                    onFlagPress(task.id, flag.color);
                    setModalVisible(false);
                  }}
                >
                  <Icon name="flag" size={width > 600 ? 30 : 24} color={flag.color} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Clear Flag Option */}
            <Pressable
              onPress={() => {
                onFlagPress(task.id, '#000'); // Default no flag color
                setModalVisible(false);
              }}
            >
              <Text style={styles.clearButton}>Clear Flag</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
