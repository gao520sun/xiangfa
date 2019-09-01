import React from 'react';
import Sound from 'react-native-sound';
import {Toast} from 'teaset';

let instance = null;
class AudioSoundUtils extends React.Component {
    constructor(props) {
        super(props);
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
        }
        this.playInstance = null;
        return instance;
    }
    // 播放录音
    playRecording = async (audioPath) => {
        this.stopPlayRecording();
        this.playInstance = new Sound(audioPath, '', (error) => {
            if (error) {
                return;
            }
            this.playInstance.play((success) => {
                if(success) {
                    console.log('success - 播放成功');
                }else {
                    Toast.fail('语音加载失败');
                }
                this.stopPlayRecording();
            });
        });
    }
    // 停止播放录音
    stopPlayRecording = () => {
        this.playIndex = '';
        if (this.playInstance) {
            this.playInstance.stop();
            this.playInstance.release();
            this.playInstance = null;
        }
    }
    // 获取音频时间
    getVoiceDuration = async(audioPath) => new Promise((resolve) => {
        let playInstance = new Sound(audioPath, '', (error) => {
            if (error) {
                resolve(-1);
                return;
            }
            resolve(playInstance.getDuration());
            playInstance.release();
            playInstance = null;
        });
    })
}

export default new AudioSoundUtils();
