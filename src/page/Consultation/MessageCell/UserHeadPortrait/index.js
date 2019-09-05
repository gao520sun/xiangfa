import React, {Component} from 'react';
import {View, Image} from 'react-native';


import style from './style';

export default class UserHeadPortrait extends Component {
    render() {
        const userInfo = this.props.data && this.props.data && this.props.data.sender && JSON.parse(this.props.data.sender) || {};
        return (
            <View style = {[style.container]}>
                <Image style = {[style.headerImg]} source = {{uri:userInfo.avatarUrl}}/>
            </View>
        );
    }
}
