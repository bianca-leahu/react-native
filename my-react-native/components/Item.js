import PropTypes from 'prop-types';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import getFormattedDate from '../helpers/date-format';

Item.propTypes = {
    face: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired
};

export default function Item(props) {
	
	return (
		<View style={style.itemContainer}>
            <Text style={style.faceItem}>{props.face}</Text>
            <Text style={style.priceItem}>Price: ${(props.price / 100).toFixed( 2 )}</Text>
            <Text>Size: {props.size}px</Text>
            <Text>Added: {getFormattedDate(props.date)}</Text>
		</View>
	)
}

const style = StyleSheet.create({
	itemContainer: {
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        backgroundColor: 'lightblue',
        borderRadius: 6,
        padding: 10,
	},
    priceItem: {
    	fontSize: 20
    },
    faceItem: {
    	marginTop: 25,
    	marginBottom: 25,
    	display: 'block'
    }
});