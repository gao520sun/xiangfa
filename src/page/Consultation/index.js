import React, {Component} from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Toast} from 'teaset';

import PreviewImageViewer from '../../Components/PreviewImageViewer';
import {uuid} from '../../utils/Commons';
import {isArray} from '../../utils/Utils';
import ImageCrop from '../../utils/ImageCrop';

import {getimageUrls} from './Utils/ImageUtils';
import AudioRecorder from './Utils/AudioRecorder';
import AudioSound from './Utils/AudioSound';
import DBConsultHandle from './DBHandle';
import MessageListView from './MessageListView';
import MessageToolInput from './MessageToolInput';

import aimgae from './Image/imageee.png';
import imga from './Image/imga.png';
import '../../service/RealmManager/consultationManager/DBManager';

export default class Consultation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTemp:[],
        };
        this.showMoreTool = false;
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        const data = DBConsultHandle.gerMsgData().sorted('sendTime', true);

        this.setState({
            dataTemp:data
        });
    }
    // 发送文字
    sendTextMsg = (text) => {
        try {
            DBConsultHandle.insertData({
                msgId: uuid(),
                messageType:'TEXT',
                sessionId: '12312312',
                content:JSON.stringify({text:text}),
                sendTime: new Date().getTime(),
                sender: JSON.stringify({avatarUrl: require('./Image/user1.jpg')}),
                isMe:true,
                status: '1',
                userId: 10000,
            });
        } catch (error) {
            //
        }
        this.getData();
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
        try {
            const imgs = await ImageCrop.openPicker();
            if(imgs && !isArray(imgs)) {
                DBConsultHandle.insertData({
                    msgId: uuid(),
                    messageType:'IMAGE',
                    sessionId: '12312312',
                    content:JSON.stringify({url:imgs.sourceURL, width:imgs.width, height:imgs.height}),
                    sendTime: new Date().getTime(),
                    sender: JSON.stringify({avatarUrl: require('./Image/user1.jpg')}),
                    isMe:true,
                    status: '1',
                    userId: 10000,
                });
            }
        } catch (error) {
            //
        }
        this.getData();
    }
    // 使用相机
    cameraBtn = async() => {
        try {
            const imgs = await ImageCrop.openCamera();
            if(imgs && !isArray(imgs)) {
                DBConsultHandle.insertData({
                    msgId: uuid(),
                    messageType:'IMAGE',
                    sessionId: '12312312',
                    content:JSON.stringify({url:imgs.sourceURL, width:imgs.width, height:imgs.height}),
                    sendTime: new Date().getTime(),
                    sender: JSON.stringify({avatarUrl: require('./Image/user1.jpg')}),
                    isMe:true,
                    status: '1',
                    userId: 10000,
                });
            }
        } catch (error) {
            //
        }
        this.getData();
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
        // console.log('this.showMoreTool:::', this.showMoreTool);
    }
    onMomentumScrollEnd = () => {
        console.log('aaaaaaa');
        this.showMoreTool = false;
    }
    moreTool = () => {
        if(this.msgListView) {
            this.showMoreTool = true;
            console.log('this.msgListView:::', this.msgListView.conten);
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
            sendTextMsg:this.sendTextMsg
        };
        const listPress = {
            checkImg: this.checkImg,
            onScroll:this.onScroll,
            onMomentumScrollEnd:this.onMomentumScrollEnd
        };
        return (
            <View style = {{flex:1, backgroundColor:'#EFEFF0'}}>
                <MessageListView
                    ref = {(msgListView) => (this.msgListView = msgListView)}
                    dataSource = {this.state.dataTemp || []}
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


