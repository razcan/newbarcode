// screens/DetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';
import { Badge } from 'react-native-paper';
import { DataTable } from 'react-native-paper';


type DetailsScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Administrare'>;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {

    const [page, setPage] = React.useState<number>(0);
    const [numberOfItemsPerPageList] = React.useState([5, 10, 20, 50]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );
    const [itemData, setItemData] = useState([]);

    const fetchAllItems = async () => {

        const response = await fetch(`https://chatty-carrots-enjoy.loca.lt/items`);
        const responseData = await response.json();
        console.log(responseData)
        setItemData(responseData);
    };

    useEffect(() => {
        fetchAllItems()
    }, []);


    const rowClick = async (item: any) => {
        console.log("apasat", item)
    }


    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, itemData.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);



    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.buttonContainer}>
                <Button title="TESTARE ASD" />
            </View>




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


