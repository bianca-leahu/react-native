import React, { PureComponent } from 'react';
import { Text } from 'react-native';

export default class Loading extends PureComponent {

  	static defaultProps = {
      	text: 'Loading',
      	speed: 600
  	}

	state = {
		text: this.props.text,
		speed: 600
	};

	componentDidMount() {
		let stopper = this.props.text + '...';

		this.interval = setInterval (() => {
			if (this.interval === stopper) {
				this.setState({
					text: this.this.props.text
				})
			}

			else {
				this.setState({
					text: this.state.text + '.'
				})
			}
		}, this.props.speed)
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
