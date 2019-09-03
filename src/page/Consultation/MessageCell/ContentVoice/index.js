import React, {Component} from 'react';
import {Text, View} from 'react-native';

import style from './style'
;
// TODO 缺少 播放等
export default class ContentVoice extends Component {
    getBgColor = () => {
        const isMe = this.props.data && this.props.data.isMe || false;
        return isMe ? '#D3E6FF' : 'white';
    }
    render() {
        const msg = this.props.data && this.props.data.content && JSON.parse(this.props.data.content) || {};
        return (
            <View style = {[style.container, {backgroundColor: this.getBgColor()}]} >
                <Text>{'2``'}</Text>
            </View>
        );
    }
}
