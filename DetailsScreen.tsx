// screens/DetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
    View,
    // Button, 
    Pressable, StyleSheet, SafeAreaView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';
import { Badge } from 'react-native-paper';
import {
    DataTable, Button, Dialog, Portal, PaperProvider, Text, Avatar, Card, Divider
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

type DetailsScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Administrare'>;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([5, 10, 20, 50]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );
    const [itemData, setItemData] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);

    const fetchAllItems = async () => {

        const response = await fetch(`https://six-lizards-fix.loca.lt/items`);
        const responseData = await response.json();
        console.log(responseData)
        setItemData(responseData);
    };

    useEffect(() => {
        fetchAllItems()
    }, []);

    useEffect(() => {

    }, [itemData]);

    const [items] = React.useState([
        {
            key: 1,
            name: 'Cupcake',
            calories: 356,
            fat: 16,
        },
        {
            key: 2,
            name: 'Eclair',
            calories: 262,
            fat: 16,
        },
        {
            key: 3,
            name: 'Frozen yogurt',
            calories: 159,
            fat: 6,
        },
        {
            key: 4,
            name: 'Gingerbread',
            calories: 305,
            fat: 3.7,
        },
    ]);

    const rowClick = async (item: any) => {
        setSelectedItem(item);
        showDialog();
        console.log(item);
    }


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, itemData.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    console.log(itemData, "asd")
    return (
        <SafeAreaView style={styles.container}>

            <View>
                <Button onPress={showDialog}>Show Dialog</Button>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Info Articol</Dialog.Title>
                        <Dialog.Content>

                            <Card>
                                <Card.Title title="" subtitle="" />
                                <Card.Content>
                                    <View style={{ margin: 20 }}>
                                        <QRCode value={selectedItem.qrCode} size={140} />
                                        <Text> </Text>
                                        <Divider />
                                        <Text>ID: {selectedItem.id}</Text>
                                        <Text>Name: {selectedItem.name}</Text>
                                        <Text>Code: {selectedItem.code}</Text>
                                        <Text>Description: {selectedItem.description}</Text>
                                        <Text>QR Code: {selectedItem.qrCode}</Text>
                                        <Text>Expiration Date: {selectedItem.expirationDate}</Text>
                                        <Text>Zone: {selectedItem.zone}</Text>
                                        <Text>Location 1: {selectedItem.location1}</Text>
                                        <Text>Location 2: {selectedItem.location2}</Text>
                                        <Text>Location 3: {selectedItem.location3}</Text>
                                    </View>
                                </Card.Content>

                                <Card.Actions>
                                    <Button>Tipareste</Button>
                                    {/* <Button>Ok</Button> */}
                                </Card.Actions>
                            </Card>

                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Inchide</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>


            <View style={styles.buttonContainer}>
                <Button title="Scanare" onPress={() => navigation.navigate('Scanare')} />
            </View>

            <DataTable>
                <DataTable.Header>

                    <DataTable.Title>Denumire</DataTable.Title>
                    <DataTable.Title>QrCode</DataTable.Title>
                    <DataTable.Title numeric>Id</DataTable.Title>

                </DataTable.Header>

                {itemData.slice(from, to).map((item) => (
                    <DataTable.Row key={item.id}>


                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.qrCode}</DataTable.Cell>
                        <DataTable.Cell numeric onPress={() => rowClick(item)}>{item.id}</DataTable.Cell>
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


            {/* <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Dessert</DataTable.Title>
                    <DataTable.Title numeric>Calories</DataTable.Title>
                    <DataTable.Title numeric>Fat</DataTable.Title>
                </DataTable.Header>

                {items.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable> */}

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


