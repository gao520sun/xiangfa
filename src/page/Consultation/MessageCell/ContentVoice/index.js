import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {scaleWidth, width} from '../../../../utils/Commons';

import style from './style'
;
// TODO 缺少 播放等
export default class ContentVoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playGif: false,
        };
    }
    onPlayRecording = () => {
        this.setState({
            playGif:true,
        }, () => {
            if(this.props.playRecording) {
                this.props.playRecording(this.props.data, () => {
                    this.setState({
                        playGif:false,
                    });
                });
            }
        });
    }
    getBgColor = () => {
        const isMe = this.props.data && this.props.data.isMe || false;
        return isMe ? '#D3E6FF' : 'white';
    }
    render() {
        const msg = this.props.data && this.props.data.content && JSON.parse(this.props.data.content) || {};
        let de = 0;
        let vWidth = scaleWidth(60);
        try {
            de = Math.ceil(msg.voiceLength);
            vWidth = de > 0 ? ((width - scaleWidth(100)) / 60) * de + scaleWidth(60) : vWidth;
        } catch (error) {
            //
        }
        return (
            <TouchableOpacity onPress = {this.onPlayRecording}
                style = {[style.container, {width:vWidth, backgroundColor: this.getBgColor()}]} >
                <Text>{de + (this.state.playGif ? '正在播放' : '停止')}</Text>
            </TouchableOpacity>
        );
    }
}
