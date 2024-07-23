import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InterviewHistory = ({ navigation }) => {
  const [historyData, setHistoryData] = useState([
    { id: '1', title: 'React Developer', date: '2023-07-01' },
    { id: '2', title: 'Product Manager', date: '2023-06-28' },
    { id: '3', title: 'UX Designer', date: '2023-06-25' },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.historyItem} onPress={() => navigation.navigate('ResultScreen', { interviewId: item.id })}>
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
        ListEmptyComponent={<Text style={styles.emptyText}>No interview history available.</Text>}
      />
      <TouchableOpacity onPress={() => navigation.navigate('AllInterviewsScreen')}>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 30
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
    color: '#3b5998'
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
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontSize: 16,
  },
});

export default InterviewHistory;
