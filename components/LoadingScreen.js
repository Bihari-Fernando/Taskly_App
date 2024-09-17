import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, Dimensions } from "react-native";

export default function LoadingScreen() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) => (prevText.endsWith("...") ? "Loading" : prevText + "."));
    }, 400);

    return () => clearInterval(interval);
  }, [loadingText]);

  // Get screen width and height for responsive sizing
  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles(width, height).loadingPage}>
      {/* Add the logo image */}
      <Image source={require('../assets/logo.png')} style={styles(width, height).logo} />

      {/* Add the app name below the logo */}
      <Text style={styles(width, height).appName}>Taskly</Text>

      {/* Activity Indicator */}
      <ActivityIndicator size="large" color="#ADDFFF" />
    </View>
  );
}

// CSS styles in down
const styles = (width, height) => StyleSheet.create({
  loadingPage: {
    flex: 1,
    justifyContent: "center", // Center items vertically
    alignItems: "center",      // Center items horizontally
    backgroundColor: "#91bff6",  // Optional: Add background color to make the logo pop
  },
  logo: {
    width: width * 0.2,  // Adjust logo width based on screen width (30% of screen width)
    height: width * 0.2, // Keep the logo square
    marginBottom: height * 0.02,  // Space between logo and app name (2% of screen height)
    resizeMode: "contain",
  },
  appName: {
    fontSize: width * 0.08,  // Responsive font size (7% of screen width)
    fontWeight: "bold",
    color: "#000",  // Set app name color
    marginBottom: height * 0.02,  // Space between app name and loader (2% of screen height)
    letterSpacing: 2,
  },
});
