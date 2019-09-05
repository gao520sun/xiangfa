import React, {Component} from 'react';
import {View, KeyboardAvoidingView} from 'react-native';

import PreviewImageViewer from '../../Components/PreviewImageViewer';
import {uuid} from '../../utils/Commons';
// import ImageCrop from '../../utils/ImageCrop';
import ImagePicker from '../../utils/ImagePicker';

import {getimageUrls} from './Utils/ImageUtils';
import AudioRecorder from './Utils/AudioRecorder';
import AudioSound from './Utils/AudioSound';
import DBConsultHandle from './DBHandle';
import MessageListView from './MessageListView';
import MessageToolInput from './MessageToolInput';

// import aimgae from './Image/imageee.png';
// import imga from './Image/imga.png';
import '../../service/RealmManager/consultationManager/DBManager';

const avIcon = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567611112176&di=469a04f6dab0e15ccd9f86210b779c40&imgtype=0&src=http%3A%2F%2Fpic.k73.com%2Fup%2Fsoft%2F2016%2F0102%2F092635_44907394.jpg';
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
            dataTemp:data || []
        });
    }
    // 把数据放在本地
    saveMassageDataRealm = ({messageType = '', content = {}}) => {
        if(!messageType) {return;}
        DBConsultHandle.insertData({
            msgId: uuid(),
            messageType:messageType,
            sessionId: '12312312',
            content:JSON.stringify(content),
            sendTime: new Date().getTime(),
            sender: JSON.stringify({avatarUrl: avIcon}),
            isMe:true,
            status: '1',
            userId: 10000,
        });
        this.getData();
    }
    // 发送文字
    sendTextMsg = (text) => {
        try {
            const content = {text:text};
            this.saveMassageDataRealm({content, messageType:'TEXT'});
        } catch (error) {
            //
        }
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
        const content = {voiceUrl:AudioRecorder.filePathAudio, voiceLength:duration, isPlaying:false};
        this.saveMassageDataRealm({content, messageType:'VOICE'});
    }
    // 停止录音
    stopVoiceRecording = async() => {
        await AudioRecorder.stopVoiceRecording();
    }
    // 播放录音
    playRecording = async (data, callBack) => {
        const msg = JSON.parse(data.content);
        if(AudioSound.getIsPlaying() && msg.voiceUrl === AudioSound.currentPath) {
            AudioSound.stopPlayRecording();
        }else {
            if(AudioSound.getIsPlaying()) {
                AudioSound.stopPlayRecording();
            }
            AudioSound.playRecording(msg.voiceUrl, callBack);
        }
    }
    // 停止播放录音
    stopPlayRecording = () => {
        AudioSound.stopPlayRecording();
    }
    // 使用照片
    photoBtn = async() => {
        try {
            const imgs = await ImagePicker.openImagePicker();
            if(imgs) {
                const content = {url:imgs.uri, width:imgs.width, height:imgs.height};
                this.saveMassageDataRealm({content, messageType:'IMAGE'});
            }
        } catch (error) {
            //
        }
    }
    // 使用相机
    cameraBtn = async() => {
        try {
            const imgs = await ImagePicker.openCamera();
            if(imgs) {
                const content = {url:imgs.uri, width:imgs.width, height:imgs.height};
                this.saveMassageDataRealm({content, messageType:'IMAGE'});
            }
        } catch (error) {
            //
        }
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
            sendTextMsg:this.sendTextMsg,
        };
        const listPress = {
            checkImg: this.checkImg,
            onScroll:this.onScroll,
            onMomentumScrollEnd:this.onMomentumScrollEnd,
            playRecording:this.playRecording
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


