import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InterviewHistory = ({ navigation }) => {
  const historyData = [
    { id: '1', title: 'React Developer', date: '2023-07-01' },
    { id: '2', title: 'Product Manager', date: '2023-06-28' },
    { id: '3', title: 'UX Designer', date: '2023-06-25' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.historyItem} onPress={() => navigation.navigate('ResultScreen')}>
      <View style={styles.historyContent}>
        <Text style={styles.historyTitle}>{item.title}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Interview History</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={styles.seeAll}>See all</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  seeAll: {
    textDecorationLine: 'underline',
    color: 'blue',
    textAlign: 'right',
    marginRight: 5,
  }
});

export default InterviewHistory;