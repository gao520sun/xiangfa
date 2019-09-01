/**
 *  Class: PreviewImageViewer
 *  Author: GAOZHONGLEI
 *  Date: 2018/8/3.
 */
import React from 'react';

import {Modal, Image} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

export default class PreviewImageViewer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalImgVisible:false,
            modalImgs:[],
            index:0
        };
    }

    static propTypes = {
    };
    static defaultProps = {
    };

    // 逻辑处理地方
    setModallImag = (imgs, chooseIndex) => {
        this.setState({
            modalImgVisible:true,
            modalImgs:imgs, // [{url: img}]
            index:chooseIndex
        });
    }
    render() {
        const {modalImgVisible, modalImgs, index} = this.state;
        return (
            <Modal visible={modalImgVisible} transparent={true}
                onRequestClose={() => this.setState({modalImgVisible: false, modalImgs: []})}>
                <ImageViewer onClick={() => this.setState({modalImgVisible: false, modalImgs: []})}
                    loadingRender={() => <Image style={{width: 50, height: 50}} source={require('./images/loading.gif')}/>}
                    imageUrls={modalImgs}
                    index = {index}
                    enablePreload
                    saveToLocalByLongPress = {false}
                />
            </Modal>
        );
    }
}

