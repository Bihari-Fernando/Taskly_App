import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TodoList from './components/TodoList';
import TaskDetail from './components/TaskDetail';
import SettingsScreen from './components/SettingsScreen';  
import FeedBack from './components/FeedBack';  
import Report from './components/Report';
import FAQ from './components/FAQ';
import LoadingScreen from './components/LoadingScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const [tasks, setTasks] = useState([]);

  const addTask = (text, category) => {
    const newTask = { id: Date.now(), text, completed: false, category, flagColor: '#000' };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const updateFlagColor = (id, color) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, flagColor: color } : task)));
  };

  const DrawerContent = ({ navigation }) => (
    <DrawerContentScrollView contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Image source={require('./assets/logo.png')} style={styles.drawerLogo} />
        <Text style={styles.drawerTitle}>Taskly</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.drawerItem}>
        <Icon name="settings-outline" size={24} color="#333" />
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FeedBack')} style={styles.drawerItem}>
        <Icon name="chatbox-outline" size={24} color="#333" />
        <Text style={styles.drawerItemText}>Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Report', { tasks })} style={styles.drawerItem}>
        <Icon name="bar-chart-outline" size={24} color="#333" />
        <Text style={styles.drawerItemText}>Report</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('FAQ')} style={styles.drawerItem}>
        <Icon name="help-circle-outline" size={24} color="#333" />
        <Text style={styles.drawerItemText}>FAQ</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );

  const TabNavigator = () => (
    <Tab.Navigator
      initialRouteName="All"
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: { backgroundColor: '#0e7afa' },
        tabBarIndicatorStyle: { backgroundColor: '#fff' },
      }}
    >
      <Tab.Screen name="All">
        {() => (
          <TodoList
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateFlagColor={updateFlagColor}
            filter="All"
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Personal">
        {() => (
          <TodoList
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateFlagColor={updateFlagColor}
            filter="Personal"
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Work">
        {() => (
          <TodoList
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateFlagColor={updateFlagColor}
            filter="Work"
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Wishlist">
        {() => (
          <TodoList
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            updateFlagColor={updateFlagColor}
            filter="Wishlist"
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Taskly">
          {() => (
            <Stack.Navigator initialRouteName="Tabs">
              <Stack.Screen
                name="Tabs"
                options={{ headerShown: false }}
              >
                {() => <TabNavigator />}
              </Stack.Screen>
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }}
              />
              <Stack.Screen
                name="FeedBack"
                component={FeedBack}
                options={{ title: 'Feedback' }}
              />
              <Stack.Screen
                name="Report"
                component={Report}
                options={{ title: 'Report' }}
              />
              <Stack.Screen
                name="FAQ"
                component={FAQ}
                options={{ title: 'FAQ' }}
              />
              <Stack.Screen
                name="TaskDetail"
                component={TaskDetail}
                options={({ route }) => ({ title: route.params.task.text })}
              />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#abcef3',
    alignItems: 'center',
  },
  drawerTitle: {
    fontSize: width > 600 ? 24 : 20, // Responsive font size
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  drawerLogo: {
    width: 50,
    height: 50,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 10,
  },
  drawerItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
