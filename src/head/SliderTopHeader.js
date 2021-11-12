import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBar from './SearchBar';



const SliderTopHeader = () => {
    return (
        <View
            style={{ margin: 0, padding: '10%' }}
        >
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Good Morning.!</Text>

                    </View>
                    <TouchableOpacity style={{ paddingVertical: 10 }}>
                        <View>
                            <MaterialIcons name="shop" color="black" size={30} />
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{ paddingVertical: '5%' }}>
                <SearchBar />
            </View>
            
        </View>
    )
}

export default SliderTopHeader;