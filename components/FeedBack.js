import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions } from "react-native";

// Get screen width and height
const { width, height } = Dimensions.get('window');

// Define responsive styles
const styles = StyleSheet.create({
  container: {
    padding: width * 0.05, // 5% of screen width for padding
  },
  pSize: {
    fontSize: width * 0.05, // 5% of screen width for font size
    fontWeight: 'bold',
    textAlign: 'center', // Center align text
    marginTop: height * 0.02, // 2% of screen height for top margin
  },
  feedbackText: {
    padding: width * 0.05, // 5% of screen width for padding
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5, // Optional: Add rounded corners
    textAlignVertical: 'top', // Align text to the top within the TextInput
    fontSize: width * 0.04, // 4% of screen width for font size
  },
});

function FeedBack() {
  const [feedback, setFeedback] = React.useState(""); // Input state
  const [submittedFeedback, setSubmittedFeedback] = React.useState(""); // Submitted feedback state

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: width * 0.06, fontWeight: 'bold', marginBottom: height * 0.02 }}>Feedback</Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder="Enter your feedback here"
          style={styles.feedbackText}
          onChangeText={(text) => setFeedback(text)} // Update input state
          value={feedback} // To maintain text input value
        />
        <View style={{ marginTop: height * 0.03 }}>
          <Button
            title="Add Feedback"
            onPress={() => {
              setSubmittedFeedback(feedback); // Update submitted feedback on button press
              setFeedback(""); // Clear the input field
            }}
          />
        </View>
      </View>
      <View style={styles.container}>
        {/* Ensure feedback is a valid string before rendering */}
        {submittedFeedback !== "" && (
          <Text style={styles.pSize}>{submittedFeedback}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default FeedBack;
