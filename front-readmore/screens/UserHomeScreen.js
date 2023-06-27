import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../components/TopBar';
import CentralBox from '../components/CentralBox';


export default function UserHomeScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.background}>
      <TopBar title={"Página Inicial"} />
      <CentralBox />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#070558',
    flex: 1,
  },

});