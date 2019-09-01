import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, View, Image, TextInput, Text, TouchableOpacity, PanResponder, Keyboard, Platform} from 'react-native';
import {Toast} from 'teaset';

import CheckPermission from '../../../utils/CheckPermission';
import {scaleHeight} from '../../../utils/Commons';
import RecordView from '../Components/RecordToastView';
import MsgAdd from '../Image/message_add.png';
import MsgMic from '../Image/message_voice.png';
import MsgKeyboard from '../Image/keyboard.png';
import CameraIcon from '../Image/camera_icon.png';
import photoIcon from '../Image/photo_icon.png';

import style from './style';

const initInputBarHeight = scaleHeight(40);
const initMoreToolBottom = -scaleHeight(115);
export default class MessageToolInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputBarHeight:initInputBarHeight,
            isKeyBoard:true,
            // 更多工具处理和动画初始化
            moreToolAnim: new Animated.Value(initMoreToolBottom),
            moreToolOpacityAnim: new Animated.Value(0),
            showMoreToolAnim: false,
        };
    }
    componentDidMount() {
        console.log('this.props..', this.props);
        if(Platform.OS === 'ios') {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
            this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        }else {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
            this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
        }
    }
    componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }
    // 键盘显示
    keyboardWillShow = () => {
        this.moreAnim(false);
    }
    // 键盘隐藏
    keyboardWillHide = () => {}
    // 左边显示录音还是键盘
    leftMicWithKeyboardClick = () => {
        Keyboard.dismiss();
        this.showToolHandle({keyBoard:this.state.isKeyBoard});
    }
    // 显示更多内容
    rightMoreClick = () => {
        Keyboard.dismiss();
        const {showMoreToolAnim} = this.state;
        const showTool = showMoreToolAnim;
        this.state.showMoreToolAnim = !showTool;
        if(this.props.moreTool) {
            this.props.moreTool();
        }
        this.showToolHandle({moreTool:this.state.showMoreToolAnim});
    }
    // 是否显示mic和键盘
    showKeyBoard = (vk) => {
        this.setState({
            isKeyBoard:vk,
        });
    }
    // 更多动画
    moreAnim = (showTool) => {
        const {moreToolAnim, moreToolOpacityAnim} = this.state;
        const bt = showTool ? 0 : initMoreToolBottom;
        const opacity = showTool ? 1 : 0;
        this.state.showMoreToolAnim = showTool;
        const duration = 400;
        Animated.parallel([
            Animated.timing(
                moreToolAnim,
                {
                    toValue: bt,
                    duration: duration,
                }
            ),
            Animated.timing(
                moreToolOpacityAnim,
                {
                    toValue: opacity,
                    duration: 0,
                }
            )
        ]).start();
    }
    // 工具栏，不同的按钮，不同处理
    showToolHandle = (params = {moreTool: false, keyBoard: false}) => {
        console.log('params:::', params, this.state.showMoreToolAnim);
        if(params.moreTool) {
            this.moreAnim(true);
            this.showKeyBoard(true);
        }
        if(params.keyBoard) {
            this.moreAnim(false);
            this.showKeyBoard(false);
        }
        if(!params.moreTool && !params.keyBoard) {
            this.moreAnim(false);
            this.showKeyBoard(true);
        }
    }
    hideToolHandle = () => {
        if(!this.state.showMoreToolAnim) {
            return;
        }
        this.moreAnim(false);
        this.showKeyBoard(true);
    }
    // 文本框内容高度变化
    _onContentSizeChange = (e) => {
        const contentSize = e.nativeEvent.contentSize;
        if (!contentSize) { return; }
        if (!this.contentSize || this.contentSize.height !== contentSize.height) {
            if (contentSize.height < initInputBarHeight * 3) {
                this.contentSize = contentSize;
                let _inputBarHeight = contentSize.height;
                if (_inputBarHeight < this.state.inputBarHeight && _inputBarHeight < initInputBarHeight) {
                    _inputBarHeight = initInputBarHeight;
                }
                this.setState({inputBarHeight: (_inputBarHeight)});
            }
        }
    }
    // 按住说话状态
    pressMic = () => {
        const {inputBarHeight} = this.state;
        const h = scaleHeight(inputBarHeight);
        return (
            <MicBtnView barHeight = {h} {...this.props}/>
        );
    }
    // 输入状态
    inputContent = () => (
        <View style = {[style.inputView, {height:scaleHeight(this.state.inputBarHeight)}]}>
            <TextInput
                style = {style.textInput}
                multiline
                onContentSizeChange={this._onContentSizeChange}
            />
        </View>
    )
    // 左边图片切换
    leftChangeMicAndKeybord = () => {
        const {isKeyBoard} = this.state;
        const source = isKeyBoard ? MsgMic : MsgKeyboard;
        return (
            <TouchableOpacity activeOpacity = {0.8} onPress = {this.leftMicWithKeyboardClick}>
                <Image style = {style.msgMic} source = {source} />
            </TouchableOpacity>

        );
    }
    // 右边更多
    rightMoreView = () => (
        <TouchableOpacity activeOpacity = {0.8} onPress = {this.rightMoreClick}>
            <Image style = {style.msgAdd} source = {MsgAdd}/>
        </TouchableOpacity>
    )
    render() {
        const {isKeyBoard} = this.state;
        return (
            <View>
                <View style = {[style.container, {height:scaleHeight(14) + scaleHeight(this.state.inputBarHeight)}]}>
                    {this.leftChangeMicAndKeybord()}
                    {isKeyBoard ? this.inputContent() : this.pressMic()}
                    {this.rightMoreView()}
                </View>
                <Animated.View style = {{opacity: this.state.moreToolOpacityAnim, marginBottom:this.state.moreToolAnim}}>
                    <MoreToolsComponent {...this.props} />
                </Animated.View>
            </View>
        );
    }
}

MessageToolInput.defaultProps = {
    dataSource: []
};
MessageToolInput.propTypes = {
    startVoiceRecording: PropTypes.func,
    finishVoiceRecording: PropTypes.func,
    stopVoiceRecording: PropTypes.func,
    photoBtn: PropTypes.func,
    cameraBtn: PropTypes.func,
    moreTool: PropTypes.func,
};

class MicBtnView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recordingColor:'transparent'
        };
        // 判断是否取消
        this.isCanceRecording = false;
        // 创建手指事件
        this.panResponder();
        this.toastDefText = '手指上滑，取消发送';
        this.toastCancelText = '松开手指，取消发送';
    }
    panResponder = () => {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: async() => {
                // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                const checkPrmission = await CheckPermission.checkPrmission('microphone');
                if(checkPrmission) {
                    this.setState({
                        showMicBtn: true,
                    }, () => {
                        RecordView.show(this.toastDefText, this.state.recordingColor);
                    });
                    this.startTimeout = setTimeout(() => {
                        if(this.props.startVoiceRecording) {
                            this.props.startVoiceRecording();
                        }
                        if(this.startTimeout) {
                            clearTimeout(this.startTimeout);
                        }
                    }, 500);
                }else{
                    Toast.fail('请在设置中麦克风');
                }
            },
            onPanResponderMove: (evt) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                this.isCanceRecording = false;
                if(evt.nativeEvent.locationY < 0) {
                    if(this.state.recordingColor !== 'red') {
                        this.setState({
                            recordingColor: 'red'
                        }, () => {
                            if(this.isCanceRecording) {
                                RecordView.show(this.toastCancelText, this.state.recordingColor);
                            }
                        });
                    }
                    this.isCanceRecording = true;
                }else if(this.state.recordingColor !== 'transparent') {
                    this.setState({
                        recordingColor:'transparent',
                    }, () => {
                        RecordView.show(this.toastDefText, this.state.recordingColor);
                    });
                }
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
                if(this.startTimeout) {
                    clearTimeout(this.startTimeout);
                }
                if(!this.isCanceRecording) {
                    if(this.props.finishVoiceRecording) {
                        this.props.finishVoiceRecording();
                    }
                }else if(this.props.stopVoiceRecording) {
                    this.props.stopVoiceRecording();
                }
                this.isCanceRecording = false;
                this.setState({
                    showMicBtn: false
                }, () => {
                    RecordView.hide();
                });
                console.log('evt...onPanResponderRelease', evt.nativeEvent, gestureState);
            },
        });
    }
    render() {
        const {showMicBtn} = this.state;
        const h = this.props.barHeight;
        return (
            <View {...this._panResponder.panHandlers} style = {[style.micBgView, {height:h, backgroundColor: showMicBtn ? '#9e9e9e' : 'white'}]}>
                <Text style = {[style.micText, {color:showMicBtn ? '#333333' : '#555C6A'}]}>{showMicBtn ? '松开 结束' : '按住 说话'}</Text>
            </View>
        );
    }
}

class MoreToolsComponent extends Component {
    constructor(props) {
        super(props);

        this.itemBtns = [
            {icon: photoIcon, title:'照片', press:this.photoBtn},
            {icon: CameraIcon, title:'拍摄', press:this.cameraBtn}
        ];
    }
    photoBtn = async() => {
        if(this.props.photoBtn) {
            const checkPrmission = await CheckPermission.checkPrmission('photo');
            if(checkPrmission) {
                this.props.photoBtn();
            }else{
                Toast.fail('请在设置中相册');
            }
        }
    }
    cameraBtn = async() => {
        if(this.props.cameraBtn) {
            const checkPrmission = await CheckPermission.checkPrmission('camera');
            if(checkPrmission) {
                this.props.cameraBtn();
            }else{
                Toast.fail('请在设置中相册');
            }
        }
    }
    itemBtnView = ({item, index}) => (
        <TouchableOpacity activeOpacity = {0.8} onPress = {item.press} key = {index} style = {style.itemBtnView}>
            <Image style = {style.btnImg} source = {item.icon}/>
            <Text style = {style.btnText}>{item.title}</Text>
        </TouchableOpacity>
    )
    render() {
        return(
            <View style = {[style.toolView, {height:-initMoreToolBottom}]}>
                <View style = {style.toolItemBtnView}>
                    {this.itemBtns.map((item, index) => this.itemBtnView({item, index}))}
                </View>
            </View>
        );
    }
}
