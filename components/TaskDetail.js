import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
  FlatList,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import Voice from 'react-native-voice';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const TaskDetail = () => {
  const [taskTitle, setTaskTitle] = useState('Task Title');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState(null);
  const [repeatTask, setRepeatTask] = useState(false);
  const [repeatOptionsVisible, setRepeatOptionsVisible] = useState(false);
  const [repeatOption, setRepeatOption] = useState('No');
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [subTasks, setSubTasks] = useState([]);
  const [showSubTaskInput, setShowSubTaskInput] = useState(false);
  const [newSubTask, setNewSubTask] = useState('');
  const [notesVisible, setNotesVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceRecognitionText, setVoiceRecognitionText] = useState('');

  // States to track if details are added
  const [isDueDateSet, setIsDueDateSet] = useState(false);
  const [isReminderSet, setIsReminderSet] = useState(false);
  const [isRepeatOptionSet, setIsRepeatOptionSet] = useState(false);
  const [isNotesSet, setIsNotesSet] = useState(false);

  // Initialize Voice
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    const results = event.value[0];
    setVoiceRecognitionText(results);
    if (results.includes("Add task")) {
      setTaskTitle("New Task from Voice");
    }
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone for voice commands.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'You need to grant microphone permissions to use voice input.');
          return;
        }
      }

      await Voice.start('en-US');
      setIsListening(true);
    } catch (error) {
      Alert.alert("Error", "Failed to start voice recognition: " + error.message);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      Alert.alert("Error", "Failed to stop voice recognition: " + error.message);
    }
  };

  // Date picker handler for due date
  const onChangeDueDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
      setIsDueDateSet(true); // Set due date state to true
    }
  };

  // Time picker handler for reminder
  const onChangeReminderTime = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setReminderTime(selectedTime);
      setReminder(true);
      setIsReminderSet(true); // Set reminder state to true
    }
  };

  // Add subtask to list
  const handleAddSubTask = () => {
    setSubTasks([...subTasks, newSubTask]);
    setNewSubTask('');
    setShowSubTaskInput(false);
  };

  // Handle document attachment
  const handleAttachment = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== 'cancel') {
      setAttachment(result.uri);
    }
  };

  // Handle image picker for photos and videos
  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setAttachment(result.uri);
    }
  };

  // Modal for repeat task options
  const RepeatOptionsModal = () => (
    <Modal visible={repeatOptionsVisible} transparent={true} animationType="slide">
      <View style={styles.modalView}>
        <FlatList
          data={['Hourly', 'Daily', 'Weekly', 'Monthly', 'Yearly']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { setRepeatOption(item); setRepeatOptionsVisible(false); setIsRepeatOptionSet(true); }}>
              <Text style={styles.modalText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {isEditingTitle ? (
        <TextInput
          style={styles.taskTitleInput}
          value={taskTitle}
          onChangeText={setTaskTitle}
          onBlur={() => setIsEditingTitle(false)}
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={() => setIsEditingTitle(true)}>
          <Text style={styles.taskTitle}>{taskTitle}</Text>
        </TouchableOpacity>
      )}

      {/* Add Subtask Section */}
      <TouchableOpacity style={styles.addSubtaskButton} onPress={() => setShowSubTaskInput(true)}>
        <MaterialIcons name="add" size={24} color="#4CAF50" />
        <Text style={styles.addSubtaskText}>Add Sub-task</Text>
      </TouchableOpacity>
      {showSubTaskInput && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter sub-task"
            value={newSubTask}
            onChangeText={(text) => setNewSubTask(text)}
          />
          <Button title="Add" onPress={handleAddSubTask} />
        </View>
      )}

      {/* Sub-tasks list */}
      {subTasks.map((subTask, index) => (
        <Text key={index} style={styles.subTaskText}>
          <MaterialIcons name="check-box" size={20} color="#4CAF50" /> {subTask}
        </Text>
      ))}

      {/* Due Date Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <MaterialIcons name="calendar-today" size={24} color={isDueDateSet ? "#4CAF50" : "#666"} />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={onChangeDueDate}
          />
        )}
        {isDueDateSet && <Text>{dueDate.toDateString()}</Text>}
      </View>

      {/* Time & Reminder Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Time & Reminder</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <MaterialIcons name="alarm" size={24} color={isReminderSet ? "#4CAF50" : "#666"} />
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={onChangeReminderTime}
          />
        )}
        {isReminderSet && <Text>Reminder set for: {reminderTime?.toLocaleTimeString()}</Text>}
      </View>

      {/* Repeat Options Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Repeat</Text>
        <TouchableOpacity onPress={() => setRepeatOptionsVisible(true)}>
          <MaterialIcons name="repeat" size={24} color={isRepeatOptionSet ? "#4CAF50" : "#666"} />
        </TouchableOpacity>
        {isRepeatOptionSet && <Text>Repeats: {repeatOption}</Text>}
      </View>
      <RepeatOptionsModal />

      {/* Notes Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Notes</Text>
        <TouchableOpacity onPress={() => setNotesVisible(!notesVisible)}>
          <MaterialIcons name="note" size={24} color={isNotesSet ? "#4CAF50" : "#666"} />
        </TouchableOpacity>
        {notesVisible && (
          <View>
            <TextInput
              style={styles.notesInput}
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={(text) => { setNotes(text); setIsNotesSet(true); }}
              placeholder="Add notes"
            />
          </View>
        )}
        {isNotesSet && <Text>{notes}</Text>}
      </View>

      {/* Attachment Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Attachment</Text>
        <TouchableOpacity onPress={handleImagePick}>
          <FontAwesome name="paperclip" size={24} color={attachment ? "#4CAF50" : "#666"} />
        </TouchableOpacity>
        {attachment && (
          <View>
            <Text>Attachment: {attachment}</Text>
          </View>
        )}
      </View>
      
      {/* Voice Command Section */}
      <View style={styles.row}>
        <Text style={styles.label}>Voice Command</Text>
        <TouchableOpacity onPress={isListening ? stopListening : startListening}>
          <MaterialIcons name={isListening ? "stop" : "mic"} size={24} color={isListening ? "#4CAF50" : "#666"} />
        </TouchableOpacity>
        {voiceRecognitionText ? <Text>Voice: {voiceRecognitionText}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e2f0fb',
  },
  taskTitleInput: {
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#e2f0fb',
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addSubtaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  addSubtaskText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  subTaskText: {
    fontSize: 16,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    flex: 1,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    fontSize: 18,
    padding: 10,
    color: '#fff',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
});

export default TaskDetail;
