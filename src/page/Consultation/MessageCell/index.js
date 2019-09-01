import React, {Component} from 'react';
import {View} from 'react-native';

import {scaleWidth} from '../../../utils/Commons';

import UserHeadPortrait from './UserHeadPortrait';
import ContentText from './ContentText';
import ContentImage from './ContentImage';
import ContentVoice from './ContentVoice';
import style from './style';

export default class MessageCell extends Component {
    showContent = () => {
        const messageType = this.props.data && this.props.data.messageType || '';
        switch (messageType) {
        case 'TEXT':
            return <ContentText {...this.props}/>;
        case 'IMAGE':
            return <ContentImage {...this.props}/>;
        case 'VOICE':
            return <ContentVoice {...this.props}/>;
        default:
            break;
        }
        return <View/>;
    }
    showContenttDirection = () => {
        const isMe = this.props.data && this.props.data.isMe || false;
        const left = isMe ? scaleWidth(8) : scaleWidth(10);
        const right = isMe ? scaleWidth(10) : scaleWidth(8);
        return (
            <View style = {{flex:1}}>
                <View style = {{flex:1, flexDirection:isMe ? 'row-reverse' : 'row'}}>
                    <View style = {[{marginLeft:left, marginRight:right}]}>
                        <UserHeadPortrait data = {this.props.data}/>
                    </View>
                    <View style = {{
                        flex:1,
                        marginRight: isMe ? 0 : scaleWidth(60),
                        marginLeft:  isMe ? scaleWidth(60) : 0,
                        flexDirection:'row',
                        justifyContent: isMe ? 'flex-end' : 'flex-start'}}>
                        {this.showContent()}
                    </View>
                </View>

            </View>
        );
    }
    render() {
        return (
            <View style = {style.container}>
                {this.showContenttDirection()}
            </View>
        );
    }
}
