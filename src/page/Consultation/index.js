import React, {Component} from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Toast} from 'teaset';

import PreviewImageViewer from '../../Components/PreviewImageViewer';

import ImageCrop from '../../utils/ImageCrop';

import {getimageUrls} from './Utils/ImageUtils';
import AudioRecorder from './Utils/AudioRecorder';
import AudioSound from './Utils/AudioSound';

import MessageListView from './MessageListView';
import MessageToolInput from './MessageToolInput';

import aimgae from './Image/imageee.png';
import imga from './Image/imga.png';

export default class Consultation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTemp:this.tempData(),
        };
        this.showMoreTool = false;
    }
    rnd(n, m) {
        const random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;
    }
    tempData = () => {
        const da = [];
        for(let i = 0; i < 30; i++) {
            const imags = [
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566647223751&di=17fdebaf061386b4c47917d05c896695&imgtype=0&src=http%3A%2F%2Fimage.finance.china.cn%2Fupload%2Fimages%2F2014%2F0410%2F085000%2F0_2323627_580fd395d60d023a4cf8b45c31cd1218.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566647223751&di=c6ff9dae4be950bf2348317f49fb41c9&imgtype=0&src=http%3A%2F%2Fimg3.ph.126.net%2F1KDLXCf_5HxC0KDAxUQZSg%3D%3D%2F2866541162838628463.jpg',
                'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566647305900&di=53fe18ca0d040d8a506221e369a7496e&imgtype=0&src=http%3A%2F%2Fpic30.nipic.com%2F20130527%2F12858576_115546326147_2.jpg',
                aimgae, imga
            ];
            const jg = this.rnd(0, 2);
            let actionType = '';
            switch (jg) {
            case 0:
                actionType = 'TEXT';
                break;
            case 1:
                actionType = 'IMAGE';
                break;
            case 2:
                actionType = 'VOICE';
                break;

            default:
                break;
            }
            const dic = {
                messageId: i,
                messageType: actionType,
                messgae: {text: '好好的好好的好好的好好的好好的好好的好好的好好的' + i,
                    imgUrl: imags[this.rnd(0, 4)], voiceUrl: '', time:new Date().getTime()},
                isMe: jg === 0 ? true : false,
                user:{
                    1: {
                        avatarUrl: require('./Image/user1.jpg')
                    },
                    0: {
                        avatarUrl: require('./Image/user2.jpg')
                    },
                }
            };
            da.push(dic);
        }
        return da;
    }
    // 点击图片查看大图图片
    checkImg = (imgData) => {
        const resData = getimageUrls(this.state.dataTemp, imgData);
        this.previewImg.setModallImag(resData.imgUrls, resData.index);
    }
    // 开始录音
    startVoiceRecording = async() => {
        this.stopPlayRecording();
        await AudioRecorder.startVoiceRecording();
    }
    // 完成录音
    finishVoiceRecording = async () => {
        await AudioRecorder.finishVoiceRecording();
        const duration = await AudioSound.getVoiceDuration(AudioRecorder.filePathAudio);
        console.log('duration:::', duration);
        // this.playRecording(AudioRecorder.filePathAudio);
    }
    // 停止录音
    stopVoiceRecording = async() => {
        await AudioRecorder.stopVoiceRecording();
    }
    // 播放录音
    playRecording = async (audioPath) => {
        AudioSound.playRecording(audioPath);
    }
    // 停止播放录音
    stopPlayRecording = () => {
        AudioSound.stopPlayRecording();
    }
    // 使用照片
    photoBtn = async() => {
        const imgs = await ImageCrop.openPicker();
        console.log('相册imgas', imgs);
    }
    // 使用相机
    cameraBtn = async() => {
        const imgs = await ImageCrop.openCamera();
        console.log('相机imgas', imgs);
    }
    // 滑动事件
    onScroll = () => {
        // if(this.toolInputView) {
        //     this.toolInputView.hideToolHandle();
        // }
        // console.log('this.showMoreTool::', this.showMoreTool);
        // if(!this.showMoreTool) {
        //     if(this.toolInputView) {
        //         this.toolInputView.hideToolHandle();
        //     }
        // }
    }
    moreTool = () => {
        if(this.msgListView) {
            this.showMoreTool = true;
            this.msgListView.scrollToIndex({index:0, viewPosition:0});
        }
    }
    render() {
        const toolPress = {
            startVoiceRecording: this.startVoiceRecording,
            finishVoiceRecording: this.finishVoiceRecording,
            stopVoiceRecording: this.stopVoiceRecording,
            photoBtn: this.photoBtn,
            cameraBtn: this.cameraBtn,
            moreTool:this.moreTool,
        };
        const listPress = {
            checkImg: this.checkImg,
            onScroll:this.onScroll,
        };
        return (
            <View style = {{flex:1, backgroundColor:'#EFEFF0'}}>
                <MessageListView
                    ref = {(msgListView) => (this.msgListView = msgListView)}
                    dataSource = {this.state.dataTemp}
                    {...listPress}/>
                <KeyboardAvoidingView behavior={'padding'}>
                    <MessageToolInput
                        ref = {(toolInputView) => (this.toolInputView = toolInputView)}
                        {...toolPress}/>
                </KeyboardAvoidingView>
                <PreviewImageViewer ref={(preview) => (this.previewImg = preview)}/>
            </View>
        );
    }
}


