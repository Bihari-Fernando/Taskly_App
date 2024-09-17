import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Switch, Text, Image, Dimensions } from 'react-native';
import TodoItem from './TodoItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e2f0fb',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  textInput: {
    flex: 1,
    fontSize: width > 600 ? 18 : 15, // Responsive font size
    padding: 8,
    color: '#333',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: width > 600 ? 18 : 16, // Responsive font size
    fontWeight: 'bold',
    marginRight: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyImage: {
    width: width > 600 ? 200 : 150, // Responsive image size
    height: width > 600 ? 200 : 150, // Responsive image size
    marginBottom: 20,
  },
  emptyText: {
    fontSize: width > 600 ? 20 : 18, // Responsive font size
    color: '#666',
  }
});

export default function TodoList({ tasks, addTask, deleteTask, toggleCompleted, updateFlagColor, filter }) {
  const [text, setText] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const navigation = useNavigation();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') {
      return showCompleted ? task.completed : !task.completed;
    }
    return task.category === filter && (showCompleted ? task.completed : !task.completed);
  });

  function handleAddTask() {
    if (text.trim()) {
      addTask(text, filter);
      setText('');
    }
  }

  return (
    <View style={styles.container}>
      {/* Switch Button for filtering tasks */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>{showCompleted ? 'Completed Tasks' : 'Incomplete Tasks'}</Text>
        <Switch
          value={showCompleted}
          onValueChange={() => setShowCompleted(!showCompleted)}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
          thumbColor={showCompleted ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Task Input and Add Button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddTask}
          accessibilityLabel="Task input"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTask}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Add task"
        >
          <Icon name="add" size={width > 600 ? 20 : 15} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conditionally render the image and text if there are no tasks */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../assets/empty-state.png')}  // Replace with your image path
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>No tasks yet! Add your first task.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TodoItem
              task={item}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              onPress={() => navigation.navigate('TaskDetail', { task: item })}
              onFlagPress={updateFlagColor}  // Pass the updateFlagColor function
            />
          )}
        />
      )}
    </View>
  );
}
