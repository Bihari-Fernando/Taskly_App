import React from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import { AntDesign } from '@expo/vector-icons'; // Use your preferred icon library

// Get screen width and height
const { width, height } = Dimensions.get('window');

// Define responsive styles
const styles = StyleSheet.create({
  container: {
    padding: width * 0.05, // 5% of screen width for padding
  },
  pSize: {
    fontSize: width * 0.045, // 4.5% of screen width for font size
  },
  heading: {
    fontSize: width * 0.06, // 6% of screen width for heading font size
    fontWeight: 'bold',
    marginBottom: height * 0.02, // 2% of screen height for margin
  },
  subheading: {
    fontSize: width * 0.05, // 5% of screen width for subheading font size
    fontWeight: 'bold',
    marginTop: height * 0.03, // 3% of screen height for margin
    marginBottom: height * 0.01, // 1% of screen height for margin
  },
  text: {
    fontSize: width * 0.04, // 4% of screen width for text font size
    marginBottom: height * 0.02, // 2% of screen height for margin
  },
  askButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02, // 2% of screen height for margin
  },
  askText: {
    fontSize: width * 0.04, // 4% of screen width for button text size
    marginLeft: width * 0.02, // 2% of screen width for left margin
    color: 'blue', // Customize color as needed
  },
});

const FAQ = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.askButton}>
          <TouchableOpacity onPress={() => navigation.navigate('SubmitQuestion')}>
            <AntDesign name="questioncircleo" size={width * 0.06} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SubmitQuestion')}>
            <Text style={styles.askText}>Ask a Question</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Common Questions</Text>
        <Text style={styles.subheading}>1. How do I add a new task?</Text>
        <Text style={styles.text}>To add a new task, go to the "Tasks" tab, and press the "Add Task" button. Enter the task details, such as the task name and sub tasks, and then save. The task will be added to your list.</Text>
        <Text style={styles.subheading}>2. Can I set reminders for tasks?</Text>
        <Text style={styles.text}>Yes, you can set reminders for tasks. When you create or edit a task, you’ll have the option to set a reminder. Choose the date and time you want to be reminded.</Text>
        <Text style={styles.subheading}>3. How can I categorize my tasks?</Text>
        <Text style={styles.text}>You can categorize tasks into "Work," "Personal," or "Wishlist." When adding or editing a task, select the appropriate category from the tab bars.</Text>
        <Text style={styles.subheading}>4. How do I mark a task as completed?</Text>
        <Text style={styles.text}>To mark a task as completed, navigate to the task in the list and toggle the checkbox next to the task. Completed tasks will be visually indicated and moved to the "Completed" section if you’re viewing tasks by status.</Text>
        <Text style={styles.subheading}>5. Can I edit or delete tasks?</Text>
        <Text style={styles.text}>Yes, you can edit or delete tasks. Tap on a task to view its details, then select the option to edit or delete it. You can change any details or remove the task entirely.</Text>
        <Text style={styles.subheading}>6. What are flag colors, and how do I use them?</Text>
        <Text style={styles.text}>Flag colors are used to prioritize tasks. You can assign a color flag to each task to indicate its priority. To change a task’s flag color, go to the task details and select the color from the available options.</Text>
        <Text style={styles.subheading}>7. Is there a way to filter tasks by category or status?</Text>
        <Text style={styles.text}>Yes, you can filter tasks by category (e.g., Work, Personal) and by status (e.g., All, Completed). Use the filters in the "Tasks" tab to view tasks according to your preferences.</Text>
        <Text style={styles.subheading}>8. How do I access the settings?</Text>
        <Text style={styles.text}>To access the settings, open the sidebar by pressing the menu icon, and select "Settings" from the drawer menu. Here, you can customize app preferences, such as theme and notification settings.</Text>
        <Text style={styles.subheading}>9. Where can I provide feedback or report issues?</Text>
        <Text style={styles.text}>You can provide feedback or report issues through the "Feedback" section in the sidebar menu. Your feedback helps us improve the app, and we appreciate your input.</Text>
        <Text style={styles.subheading}>10. Can I sync my tasks across multiple devices?</Text>
        <Text style={styles.text}>Currently, our app does not support syncing tasks across multiple devices. Tasks are stored locally on your device. We are working on implementing this feature in future updates.</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQ;
