// screens/HomeScreen.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import {
    View, Text, Pressable, StyleSheet,
    SafeAreaView, TextInput,
    Alert, Modal,
    ActivityIndicator, FlatList, SectionList, StatusBar, Image

} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera/next';
import QRCode from 'react-native-qrcode-svg';
import { useFonts } from 'expo-font';
import { Link } from 'expo-router';
import {
    DataTable, Button, Dialog, Portal, PaperProvider, Avatar, Card, Divider
} from 'react-native-paper';

type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Scanare'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {

    const [permission, requestPermission] = useCameraPermissions();
    const [text, setText] = useState();
    const [data, setData] = useState('https://softhub.ro');
    const [itemData, setItemData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [showCamera, setShowCamera] = useState(false);


    const setActiveCamera = () => {
        setShowCamera(true);
        // setText('')
    }

    const setInactiveCamera = () => {
        setShowCamera(false);
        // setText('')
    }

    useEffect(() => {
        void requestPermission().then(console.log);
    }, []);

    if (!permission?.granted) {
        return null;
    }


    const handleBarCodeScanned = async ({ type, data }) => {
        setText(data);
        setModalVisible(true);
        setInactiveCamera();
        const response = await fetch(`https://short-hoops-unite.loca.lt/items/find/${data}`);
        const responseData = await response.json();
        setItemData(responseData);
        // console.log(
        //   `Bar code with type ${type} and data ${data} has been scanned!`
        // );

    };

    return (


        <SafeAreaView style={styles.container}>
            {showCamera && (<CameraView
                style={styles.camera}
                // facing={type}
                // zoom={0.5}
                onBarcodeScanned={handleBarCodeScanned}
                // onCameraReady={handleCamReady}
                barcodeScannerSettings={{
                    interval: 100,
                    barcodeTypes: [
                        "qr",
                        "pdf417",
                        "ean13",
                        "code128",
                        "code39",
                        "upc_a",
                        "upc_e",
                        "ean8",
                        "itf14",
                        "codabar",
                        "aztec",
                        "datamatrix",
                        "code93",
                        "itf14"],
                }}>
            </CameraView>
            )}

            {/* <View style={styles.buttonContainer}>
                <Button title="Admin" onPress={() => navigation.navigate('Administrare')} />
            </View> */}

            <View style={styles.buttonContainer}>
                <Button mode="contained" icon="contain" onPress={() => navigation.navigate('Administrare')}>
                    Admin
                </Button>
            </View>


            {/* <Pressable
                onPress={() => navigation.navigate('Administrare')}
                style={[styles.button, { top: 5, borderColor: 'blue' }]}
            >
                <Text style={styles.text}>Administrare</Text>

            </Pressable> */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Informatii despre articolul scanat:
                        </Text>
                        <Text style={styles.barcode}>
                            {text}
                        </Text>

                        <View>
                            <QRCode value={text} size={140} />
                        </View>


                        {itemData && (
                            <View style={{ margin: 20 }}>
                                <Text>ID: {itemData.id}</Text>
                                <Text>Name: {itemData.name}</Text>
                                <Text>Code: {itemData.code}</Text>
                                <Text>Description: {itemData.description}</Text>
                                <Text>QR Code: {itemData.qrCode}</Text>
                                <Text>Expiration Date: {itemData.expirationDate}</Text>
                                <Text>Zone: {itemData.zone}</Text>
                                <Text>Location 1: {itemData.location1}</Text>
                                <Text>Location 2: {itemData.location2}</Text>
                                <Text>Location 3: {itemData.location3}</Text>
                            </View>
                        )}

                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Inchide</Text>
                        </Pressable> */}

                        <Button mode="contained" icon="close-circle"
                            onPress={() => setModalVisible(!modalVisible)}>
                            Inchide
                        </Button>
                    </View>
                </View>
            </Modal>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    // style={styles.localImage}
                    source={require('./utils/logo_niro.png')}
                    resizeMode="contain"
                />
                <Text style={{ fontFamily: 'Arial', fontSize: 30, color: 'black' }}>NIRO INVENTORY</Text>

            </View>


            {/* <Button title="Scaneaza" onPress={setActiveCamera} /> */}

            <Button mode="contained" icon="barcode-scan" onPress={setActiveCamera}>
                Scaneaza
            </Button>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0ffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute', // Position the button absolutely within its container
        top: 0, // Align the button to the bottom
        right: 0, // Align the button to the right
    },
    barcode: {
        backgroundColor: 'yellow',
    },

    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    localImage: {
        width: '20%', // Adjust width and height as needed
        height: '20%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    camera: {
        margin: 20,
        marginRight: 20,

        height: 400,
        width: 350
    },
    title: {
        fontFamily: 'your-custom-font', // Use the font family name defined in Font.loadAsync()
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black', // Adjust the color as needed
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        margin: 20,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    tinyLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
    },
    logo: {
        width: 66,
        height: 58,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
});



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     text: {
//         fontSize: 16,
//     },
//     wrapperCustom: {
//         borderRadius: 8,
//         padding: 6,
//     },
//     logBox: {
//         padding: 20,
//         margin: 10,
//         borderColor: '#f0f0f0',
//         backgroundColor: '#f9f9f9',
//     },
// });

export default HomeScreen;
