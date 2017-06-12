import Expo from 'expo';
import React from 'react';
import { Text } from 'react-native';

export class Loading extends React.Component {

  	static defaultProps = {
      	text: 'Loading',
      	speed: 600
  	}

	constructor(props) {
		super(props);

		this.originalText = this.props.text;

		this.state = {
			text: this.originalText,
			speed: 600
		};
	}

	componentDidMount() {
		let stopper = this.originalText + '...';
		this.interval = setInterval(function() {
			
			if (this.interval === stopper) {
				this.setState({
					text: this.originalText
				})
			}

			else {
				this.setState({
					text: this.state.text + '.'
				})
			}

		}.bind(this), this.props.speed)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
        	<Text>{this.state.text}</Text>
		)
	}
};
