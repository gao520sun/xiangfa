import React, {Component} from 'react';
import {View, Image} from 'react-native';


import style from './style';

export default class UserHeadPortrait extends Component {
    render() {
        const isMe = this.props.data && this.props.data.isMe || '';
        const userInfo = this.props.data && this.props.data.user && this.props.data.user[isMe ? 0 : 1];
        return (
            <View style = {[style.container]}>
                <Image style = {[style.headerImg]} source = {userInfo.avatarUrl}/>
            </View>
        );
    }
}
