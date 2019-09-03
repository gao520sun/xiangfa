import React, {Component} from 'react';
import {Text, View} from 'react-native';

import style from './style';

// TODO 缺少长安事件 复制等
export default class ContentText extends Component {
    getBgColor = () => {
        const isMe = this.props.data && this.props.data.isMe || false;
        return isMe ? '#D3E6FF' : 'white';
    }
    render() {
        const msg = this.props.data && this.props.data.content && JSON.parse(this.props.data.content) || {};
        return (
            <View style = {[style.container, {backgroundColor: this.getBgColor()}]}>
                <Text allowFontScaling = {false} style = {[style.text]}>{msg.text}</Text>
            </View>
        );
    }
}
