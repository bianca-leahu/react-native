import React from 'react';
import { Text, View } from 'react-native';
import { GetItems } from '../containers/items'

export class Main extends React.Component {
	render() {
		return (
			<View style={{paddingBottom: 140}}>
				<Text style={{fontSize: 20, textAlign: 'center'}}>Products List</Text>
				<GetItems />
			</View>
		)
	}
};