import Sound from 'react-native-sound';
import {Toast} from 'teaset';

let instance = null;
class AudioSoundUtils {
    constructor() {
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
        }
        this.playInstance = null;
        this.currentPath = '';
        this.callback = () => (false);
        return instance;
    }
    // 播放录音
    playRecording = async (audioPath, callback = () => {}) => {
        this.currentPath = audioPath;
        this.stopPlayRecording();
        this.playInstance = new Sound(audioPath, '', (error) => {
            if (error) {
                console.log('play...error', error);
                callback({playFailure:true});
                return;
            }
            this.callback = callback;
            this.playInstance.play((success) => {
                if(success) {
                    console.log('success - 播放成功');
                    this.callback({playSuccess:true});
                }else {
                    Toast.fail('语音加载失败');
                    this.callback({playFailure:true});
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
            this.currentPath = '';
            this.callback({stopPlay:true});
        }
    }
    getIsPlaying = () => this.playInstance && this.playInstance.isPlaying()
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
