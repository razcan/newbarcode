// screens/DetailsScreen.tsx
import React from 'react';
import { View, Text, Button, Pressable, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AppNavigator';

type DetailsScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Administrare'>;
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Administrare</Text>
            {/* <Button
                title="Scanare"
                onPress={() => navigation.navigate('Scanare')}
            /> */}
            <Pressable
                onPress={() => navigation.navigate('Scanare')}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                    },
                    styles.wrapperCustom,
                ]}>
                <Text style={styles.text}>Scanare</Text>
                {/* {({ pressed }) => (
                    <Text style={styles.text}>{pressed ? 'Pressed!' : 'Scanare'}</Text>
                )} */}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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


