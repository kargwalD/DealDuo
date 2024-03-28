import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, Camera } from "expo-camera/next";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const [text, setText] = useState('Not yet scanned');


  // const askForCameraPermission = () => {
  //   (async () => {
  //     //const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })()
  // }

  // //Requesting Camera Permission
  // useEffect(() => {
  //   askForCameraPermission();
  // }, []);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);


  //What happens after scanning barcode
  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    console.log('Type: '+ type + '\nData: ' + data)
  }

  //Check permissions and return the screens
  if (hasPermission === null){
    return(
      <View style={styles.container}>
      <Text>Requesting for Camera Permission</Text>
    </View>
    )
  }

  if(hasPermission===false){
    return(
      <View style={styles.container}>
      <Text style={{margin:10}}>No access to camera</Text>
      <Button title={'Allow Camera'} onPress={() => askForCameraPermission}/>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
      <CameraView
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>

      {/* <Text style={styles.maintext}>{text}</Text> */}

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
});