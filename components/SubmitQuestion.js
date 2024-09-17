import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0f6cd8',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});

const SubmitQuestion = () => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    // Handle question submission (e.g., send to a server or save locally)
    alert('Your question has been submitted!');
    setQuestion('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Submit Your Question</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your question here..."
          value={question}
          onChangeText={setQuestion}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SubmitQuestion;
