import React from 'react'

import { SearchBar } from 'react-native-elements';
import { ColorPalette } from '../colors/ColorPalette';


export default class App extends React.Component {
    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                lightTheme={true}
                placeholder="search..."
                containerStyle={{ backgroundColor: null, width: '100%', borderTopWidth: 0, borderBottomWidth: 0, margin: 0, padding: 0, }}
                inputContainerStyle={{ backgroundColor: ColorPalette.LightColors.White, borderColor: ColorPalette.LightColors.Secondary, borderWidth: 1, borderBottomWidth: 1, height: 35, borderRadius: 50, elevation: 1, shadowOpacity: 0.5, }}
                allowFontScaling={true}
                onChangeText={this.updateSearch}
                value={search}

            />
        );
    }

}