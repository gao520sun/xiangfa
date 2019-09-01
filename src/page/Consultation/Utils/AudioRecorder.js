import React from 'react';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

import {uuid} from '../../../utils/Commons';

let instance = null;
class AudioRecorderUtils extends React.Component {
    constructor(props) {
        super(props);
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
        }
        this.filePathAudio = null;
        return instance;
    }
     // 开始录音
     startVoiceRecording = async() => {
         this.filePathAudio = AudioUtils.DocumentDirectoryPath + '/' + uuid() + '.aac';
         AudioRecorder.prepareRecordingAtPath(this.filePathAudio, {
             SampleRate: 44100.0, // 采样率
             Channels: 2, // 通道
             AudioQuality: 'Medium', // 音质（Low, Medium, High）
             AudioEncoding: 'aac', // 音频编码（aac编码iOS和Android均支持）
             OutputFormat: 'aac_adts', // 输出格式
             MeteringEnabled: false, // 是否计量
             MeasurementMode: false, // 测量模式
             AudioEncodingBitRate: 32000, // 音频编码比特率
             IncludeBase64: true, // 是否是base64格式
             AudioSource: 0, // 音频源
         });
         // 开始录音
         await AudioRecorder.startRecording();
         return this.filePathAudio;
     }
    // 完成录音
    finishVoiceRecording = async () => {
        await AudioRecorder.stopRecording();
        return this.filePathAudio;
    }
    // 停止录音
    stopVoiceRecording = async() => {
        await AudioRecorder.stopRecording();
        return this.filePathAudio;
    }
}

export default new AudioRecorderUtils();
