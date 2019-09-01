import React from 'react';
import {Text, Image} from 'react-native';
import {Toast} from 'teaset';

import voiceRecording from '../../Image/voice_recording.gif';
import micCancle from '../../Image/micCancel.png';

import styles from './styles';

class RecordView {
    static key = null;
    static show(text, bgColor) {
        if (RecordView.key) {RecordView.hide();}
        RecordView.key = Toast.show({
            text: (
                <Text style={[styles.toastText, {backgroundColor:bgColor}]}>
                    {text}
                </Text>
            ),
            icon: bgColor === 'red' ? <Image source={micCancle} style={styles.toastIcon} /> : <Image source={voiceRecording} style={styles.toastIcon} />,
            position: 'center',
            duration: 1000000,
            overlayOpacity: 0.0,
            modal: true,
        });
    }
    static hide() {
        if (!RecordView.key) {return;}
        Toast.hide(RecordView.key);
        RecordView.key = null;
    }
}

export default RecordView;
