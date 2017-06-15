import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

SortButtons.propTypes = {
    onSort: PropTypes.func.isRequired,
};

export default function SortButtons(props) {
	return (
        <View style={style.buttons} >

            <Button
                onPress={() => props.onSort('price')}
                title="Price Filter"
                color="lightblue"
                accessibilityLabel="Price Filter"
            />

            <Button
                onPress={() => props.onSort('size')}
                title="Size Filter"
                color="lightblue"
                accessibilityLabel="Size Filter"
            />

        </View>
	);
}


const style = StyleSheet.create({
	buttons: {
        flexWrap: 'wrap', 
        flexDirection:'column'
    }
});