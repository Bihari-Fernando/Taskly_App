import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { ProgressChart, PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const chartPadding = 20; // Adjust as needed

const chartConfig = {
  backgroundGradientFrom: '#f3f4f5',
  backgroundGradientTo: '#f3f4f5',
  color: (opacity = 1) => `rgba(41, 128, 185, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

function Report({ route }) {
  const { tasks } = route.params;

  const calculateTaskDistribution = () => {
    const distribution = {
      Work: 0,
      Personal: 0,
      Wishlist: 0,
    };

    tasks.forEach(task => {
      if (distribution[task.category] !== undefined) {
        distribution[task.category]++;
      }
    });

    return [
      { name: 'Work', tasks: distribution.Work, color: '#f39c12', legendFontColor: '#7F8C8D', legendFontSize: 15 },
      { name: 'Personal', tasks: distribution.Personal, color: '#27ae60', legendFontColor: '#7F8C8D', legendFontSize: 15 },
      { name: 'Wishlist', tasks: distribution.Wishlist, color: '#e74c3c', legendFontColor: '#7F8C8D', legendFontSize: 15 },
    ];
  };

  const taskDistributionData = calculateTaskDistribution();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0; // Calculate percentage
  const progressData = {
    labels: ['Completion Rate'],
    data: [totalTasks ? completedTasks / totalTasks : 0],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Icon name="stats-chart" size={30} color="#2980b9" />
          <Text style={styles.title}>Weekly Report</Text>
        </View>

        {/* Completion Rate Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Completion Rate</Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 2 * chartPadding}
            height={220}
            strokeWidth={16}
            radius={50}
            chartConfig={chartConfig}
            hideLegend={true}  
            style={styles.chart}
          />
          {/* Displaying Completion Percentage below the chart */}
          <Text style={styles.completionText}>{completionRate.toFixed(2)}%</Text>
        </View>

        {/* Task Distribution Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Task Distribution</Text>
          <View style={styles.verticalAlign}>
            <PieChart
              data={taskDistributionData}
              width={screenWidth - 2 * chartPadding}
              height={220}
              chartConfig={chartConfig}
              accessor="tasks"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>

        {/* Productivity Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Icon name="checkmark-done-circle" size={24} color="#27ae60" />
            <Text style={styles.statsLabel}>Tasks Completed</Text>
            <Text style={styles.statsValue}>{completedTasks}</Text>
          </View>
          <View style={styles.statsItem}>
            <Icon name="time" size={24} color="#f39c12" />
            <Text style={styles.statsLabel}>Avg Completion Time</Text>
            <Text style={styles.statsValue}>2 hrs</Text>
          </View>
          <View style={styles.statsItem}>
            <Icon name="alert-circle" size={24} color="#e74c3c" />
            <Text style={styles.statsLabel}>Overdue Tasks</Text>
            <Text style={styles.statsValue}>0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2f0fb',
  },
  scrollView: {
    padding: chartPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2980b9',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 30,
  },
  verticalAlign: {
    alignItems: 'center', // Vertically center the chart and content
  },
  chart: {
    borderRadius: 16,
  },
  completionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -30, // Adjust this to position below the chart
    color: '#2980b9',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ecf0f1',
    paddingTop: 15,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsLabel: {
    marginTop: 5,
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default Report;
