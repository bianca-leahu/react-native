import React from 'react';
import { Text, View } from 'react-native';
import GetItems from '../containers/items'

export default function Main(props) {
	return (
		<View style={{paddingBottom: 23}}>
			<Text style={{fontSize: 20, textAlign: 'center'}}>Products List</Text>
			<GetItems />
		</View>
	)
};