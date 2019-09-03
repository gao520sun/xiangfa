import React, {PureComponent} from 'react';
import {View, Image} from 'react-native';


import style from './style';

export default class UserHeadPortrait extends PureComponent {
    render() {
        const userInfo = this.props.data && this.props.data && this.props.data.sender && JSON.parse(this.props.data.sender) || {};
        return (
            <View style = {[style.container]}>
                <Image style = {[style.headerImg]} source = {userInfo.avatarUrl || ''}/>
            </View>
        );
    }
}
