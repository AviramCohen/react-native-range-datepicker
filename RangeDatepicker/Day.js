'use strict'
import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import moment from 'moment-with-locales-es6';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Day extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.day.type == this.props.day.type)
			return false;

		return true;
	}

	render() {
		let {day, dayProps, locale} = this.props;
		let dayStyle = {backgroundColor : 'transparent', position: 'relative'};
		let textDayStyle = {color: dayProps.textColor || 'black'};
		let touchStyle = {width: Math.floor(DEVICE_WIDTH / 7), height: Math.floor((DEVICE_WIDTH / 7)-10), justifyContent: 'center', alignItems: 'center'}

		const margin = Math.floor((DEVICE_WIDTH / 7)/3.7);
		const size = Math.floor((DEVICE_WIDTH / 7)-margin);

		switch(day.type){
			case "single" : 
				dayStyle = {backgroundColor: dayProps.selectedBetweenBackgroundColor, borderColor: dayProps.selectedBetweenBorderColor, borderWidth: 1, borderRadius: size }
				textDayStyle = {color: dayProps.selectedBetweenTextColor};
				break;
			case "first" :
				dayStyle = {backgroundColor: dayProps.selectedBetweenBackgroundColor, borderColor : dayProps.selectedBetweenBorderColor, borderWidth: 1, borderRadius: size  }
				textDayStyle = {color: dayProps.selectedBetweenTextColor};
				break;
			case "last" :
				dayStyle = {backgroundColor: dayProps.selectedBetweenBackgroundColor, borderColor : dayProps.selectedBetweenBorderColor, borderWidth:1, borderRadius: size }
				textDayStyle = {color: dayProps.selectedBetweenTextColor};
				break;
			case "between" :
				dayStyle = {backgroundColor: dayProps.selectedBetweenBackgroundColor, borderColor : dayProps.selectedBetweenBorderColor, borderWidth: 1, borderRadius: size }
				textDayStyle = {color: dayProps.selectedBetweenTextColor};
				break;
			case "disabled" :
			case "blockout" :
				textDayStyle = {color: '#ccc'};
			default: break;
		}

		if(day.date){
			if(day.type == 'disabled')
				return (
					<TouchableOpacity activeOpacity={1} style={touchStyle}>
						<View style={{...dayStyle, height: size, justifyContent: 'center', opacity: 0.4}}>
							<Text style={{...textDayStyle, textAlign: "center", width: size, backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 24)}}>{moment(day.date, 'YYYYMMDD').locale(locale).date()}</Text>
						</View>
					</TouchableOpacity>
				);
			else if(day.type == 'blockout') {
				return (
					<TouchableOpacity style={touchStyle}>
						<View style={{...dayStyle, height: size, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", width: size, backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 24)}}>{moment(day.date, 'YYYYMMDD').locale(locale).date()}</Text>
						</View>
					</TouchableOpacity>
				);
			}
			else
				return (
					<TouchableOpacity style={touchStyle} onPress={() => this.props.onSelectDate(moment(day.date, 'YYYYMMDD'))}>
						<View style={{...dayStyle, height: size, width: size, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 24)}}>{moment(day.date, 'YYYYMMDD').locale(locale).date()}</Text>
						</View>
					</TouchableOpacity>
				);
		}
		else
			return (
				<TouchableOpacity style={{...touchStyle, opacity: 0}}>
					<View style={{...dayStyle, height: size, width: size, justifyContent: 'center', opacity: 0}}>
						<Text style={{ ...textDayStyle, textAlign: "center", width: size, backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 24)}}>{null}</Text>
					</View>
				</TouchableOpacity>
			);
	}
}
