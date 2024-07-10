import 'react-native-gesture-handler';
import { Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Router from './routes/Router';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Router />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 30,
    backgroundColor: '#E0E5EC',
  },

});
