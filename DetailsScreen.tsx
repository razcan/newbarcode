// screens/DetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    // Button, 
    Pressable, StyleSheet, SafeAreaView, NativeModules,
    ScrollView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';
import { Badge } from 'react-native-paper';
import {
    DataTable, Button, Dialog, Portal, PaperProvider, Text, TextInput, Avatar,
    Card, Divider
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { DatePickerModal } from 'react-native-paper-dates';
import axios from 'axios';

type DetailsScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Administrare'>;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [itemvisible, setItemVisible] = React.useState(false);
    const showItemDialog = () => setItemVisible(true);
    const hideItemDialog = () => setItemVisible(false);

    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([10, 20, 50, 100]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );
    const [itemData, setItemData] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);


    const [name, setName] = React.useState("");
    const [code, setCode] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [qrCode, setQrCode] = React.useState("");
    const [zone, setZone] = React.useState("");
    const [location1, setLocation1] = React.useState("");
    const [location2, setLocation2] = React.useState("");
    const [location3, setLocation3] = React.useState("");
    const [date, setDate] = React.useState(new Date());

    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );


    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });

    const formatDate = (dateString: string | Date) => {
        // Parse the date string
        const date = new Date(dateString);

        // Extract day, month, and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        // Format the date as "dd.mm.yyyy"
        const formattedDate = `${day}.${month}.${year}`;

        return formattedDate;
    };


    const fetchAllItems = async () => {

        const response = await fetch(`https://short-hoops-unite.loca.lt/items`);
        const responseData = await response.json();
        // console.log(responseData)
        setItemData(responseData);
    };


    useEffect(() => {
        fetchAllItems()
    }, []);

    useEffect(() => {

    }, [itemData]);

    const rowClick = async (item: any) => {
        setSelectedItem(item);
        showDialog();
        // console.log(item);
    }

    const addItem = async (item: any) => {
        setItemVisible(true)
        // console.log("adauga");
    }

    const saveData = async () => {
        console.log(name, code, description, qrCode, zone, location1, location2, location3, date)


        interface Item {
            name: String,
            code: String,
            description: String,
            qrCode: String,
            expirationDate: Date,
            zone: String,
            location1: String,
            location2: String,
            location3: String
        }

        let Item: Item = {
            name: name,
            code: code,
            description: description,
            qrCode: qrCode,
            expirationDate: date,
            zone: zone,
            location1: location1,
            location2: location2,
            location3: location3
        }

        try {
            const response = await axios.post(`https://short-hoops-unite.loca.lt/items`,
                Item
            );
            hideItemDialog()
            console.log('Item added:', response.data);
        } catch (error) {
            console.error('Error editing item:', error);
        }
    }

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, itemData.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    // console.log(itemData, "asd")
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.container}>
                <Portal>
                    <Dialog
                        style={{
                            width: 300
                            // ,flex: 0.82 
                        }}
                        visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Info Articol</Dialog.Title>
                        <Dialog.Content>
                            <ScrollView >
                                <View ref={contentToPrint} style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 5
                                }}>
                                    <QRCode value={selectedItem.qrCode} size={100} />
                                </View>

                                <View style={{ margin: 2 }}>

                                    <TextInput
                                        label="Denumire"

                                        value={selectedItem.name}
                                        onChangeText={text => setName(text)}
                                    />
                                    <TextInput
                                        label="Cod"
                                        value={selectedItem.code}
                                        onChangeText={text => setCode(text)}
                                    />
                                    <TextInput
                                        label="Descriere"
                                        value={selectedItem.description}
                                        onChangeText={text => setDescription(text)}
                                    />
                                    <TextInput
                                        label="Cod QR"
                                        value={selectedItem.qrCode}
                                        onChangeText={text => setQrCode(text)}
                                    />
                                    <TextInput
                                        label="Zona"
                                        value={selectedItem.zone}
                                        onChangeText={text => setZone(text)}
                                    />
                                    <TextInput
                                        label="Location 1"
                                        value={selectedItem.location1}
                                        onChangeText={text => setLocation1(text)}
                                    />
                                    <TextInput
                                        label="Location 2"
                                        value={selectedItem.location2}
                                        onChangeText={text => setLocation2(text)}
                                    />
                                    <TextInput
                                        label="Location 3"
                                        value={selectedItem.location3}
                                        onChangeText={text => setLocation3(text)}
                                    />
                                    <TextInput
                                        label="Data Expirare"
                                        disabled={true}
                                        value={formatDate(selectedItem.expirationDate)}

                                    />
                                    <DatePickerModal
                                        locale="en"
                                        mode="single"
                                        visible={open}
                                        onDismiss={onDismissSingle}
                                        date={date}
                                        onConfirm={onConfirmSingle}
                                    />
                                    <Button icon="calendar" onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                                        Data Expirare
                                    </Button>

                                    <Divider />

                                </View>
                            </ScrollView>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => {
                                handlePrint(null, () => contentToPrint.current);
                            }}>Tipareste</Button>
                            <Button onPress={hideDialog}>Inchide</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>


            <View style={styles.buttonContainer}>
                <Button icon="barcode-scan" mode="contained" onPress={() => navigation.navigate('Scanare')}>
                    Scanare
                </Button>
            </View>



            <View style={styles.left}>
                <Button icon="card-plus-outline" mode="contained" onPress={addItem}>
                    Adaugare
                </Button>
            </View>

            <View style={styles.container}>
                <Portal>
                    <Dialog style={{ width: 300 }} visible={itemvisible} onDismiss={hideItemDialog}>
                        <Dialog.Title>Adaugare Articol</Dialog.Title>
                        <Dialog.Content>

                            <ScrollView>

                                <TextInput
                                    label="Denumire"
                                    value={name}
                                    onChangeText={text => setName(text)}
                                />
                                <TextInput
                                    label="Cod"
                                    value={code}
                                    onChangeText={text => setCode(text)}
                                />
                                <TextInput
                                    label="Descriere"
                                    value={description}
                                    onChangeText={text => setDescription(text)}
                                />
                                <TextInput
                                    label="Cod QR"
                                    value={qrCode}
                                    onChangeText={text => setQrCode(text)}
                                />
                                <TextInput
                                    label="Zona"
                                    value={zone}
                                    onChangeText={text => setZone(text)}
                                />
                                <TextInput
                                    label="Location 1"
                                    value={location1}
                                    onChangeText={text => setLocation1(text)}
                                />
                                <TextInput
                                    label="Location 2"
                                    value={location2}
                                    onChangeText={text => setLocation2(text)}
                                />
                                <TextInput
                                    label="Location 3"
                                    value={location3}
                                    onChangeText={text => setLocation3(text)}
                                />
                                <TextInput
                                    label="Data Expirare"
                                    disabled={true}
                                    value={formatDate(date)}

                                />
                                <DatePickerModal
                                    locale="en"
                                    mode="single"
                                    visible={open}
                                    onDismiss={onDismissSingle}
                                    date={date}
                                    onConfirm={onConfirmSingle}
                                />
                                <Button icon="calendar" onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                                    Data Expirare
                                </Button>

                                <Divider />

                            </ScrollView>

                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={saveData} >Salveaza</Button>
                            <Button onPress={hideItemDialog}>Inchide</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>


            <DataTable>
                <DataTable.Header>

                    <DataTable.Title>Denumire</DataTable.Title>
                    <DataTable.Title>QrCode</DataTable.Title>
                    <DataTable.Title>Data Expirare</DataTable.Title>

                </DataTable.Header>

                {itemData.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id} onPress={() => rowClick(item)}
                    >


                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.qrCode}</DataTable.Cell>
                        <DataTable.Cell>{formatDate(item.expirationDate)}</DataTable.Cell>

                        {/* <DataTable.Cell numeric>{item.id}</DataTable.Cell> */}
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(itemData.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${itemData.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
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
    left: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    text: {
        fontSize: 16,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
    },
    logBox: {
        padding: 20,
        margin: 10,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9',
    },
});

export default DetailsScreen;


