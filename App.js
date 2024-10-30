import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState(require('./assets/io.png'));

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permisos son requeridos');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri });
    } else {
      Alert.alert('No se seleccionó ninguna imagen.');
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permisos son requeridos');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri({ uri: result.assets[0].uri });
    } else {
      Alert.alert('No se tomó ninguna foto.');
    }
  };

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }
    Alert.alert('Éxito', 'Inicio de sesión exitoso :)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INICIAR SESIÓN</Text>
      <Image source={imageUri} style={styles.image} />
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Tomar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#ffcc00',
    marginBottom: 25,
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 0, // Cuadrado
    borderWidth: 5,
    borderColor: '#ffcc00',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ffcc00',
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#333333',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#ff5722',
    padding: 15,
    marginVertical: 8,
    width: '100%',
    borderRadius: 5, // Cuadrado
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    marginVertical: 8,
    width: '100%',
    borderRadius: 5, // Cuadrado
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
