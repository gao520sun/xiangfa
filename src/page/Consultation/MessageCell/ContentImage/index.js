import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import {scaleWidth, scaleHeight} from '../../../../utils/Commons';

import style from './style';

const wTemp = 80;
const hTemp = 150;
// TODO 缺少放大图片 和 默认图片  和 缓存图片
export default class ContentImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgWidth: scaleWidth(wTemp),
            imgHeight: scaleHeight(hTemp),
        };
    }
    componentDidMount() {
        // const msg = this.props.data && this.props.data.messgae || {};
        // if(msg.imgUrl && typeof msg.imgUrl === 'string' && msg.imgUrl.indexOf('http') !== -1) {
        //     this.getImageSize(msg.imgUrl);
        // }else if(msg.imgUrl && typeof msg.imgUrl === 'number') {
        //     this.getImagesAssetSource(msg.imgUrl);
        // }
    }
    // 点图片
    _checkImg = () => {
        if(this.props.checkImg) {
            this.props.checkImg(this.props.data);
        }
    }
    // 获取网络宽高
    getImageSize = (imgUrl) => {
        Image.getSize(imgUrl, (width, height) => {
            if(width > height) {
                this.setState({
                    imgWidth:scaleWidth(hTemp),
                    imgHeight:scaleHeight(wTemp),
                });
            }else {
                this.setState({
                    imgWidth:scaleWidth(wTemp),
                    imgHeight:scaleHeight(hTemp),
                });
            }
        });
    }
    // 获取本地宽高
    getImagesAssetSource = (imgUrl) => {
        const source = Image.resolveAssetSource(imgUrl);
        if(source.width > source.height) {
            this.setState({
                imgWidth:scaleWidth(hTemp),
                imgHeight:scaleHeight(wTemp),
            });
        }else {
            this.setState({
                imgWidth:scaleWidth(wTemp),
                imgHeight:scaleHeight(hTemp),
            });
        }
    }
    getImageUrlWidthAndHeight = (msg) => {
        let widht = scaleWidth(wTemp);
        let height = scaleHeight(hTemp);
        if(msg) {
            if(msg.width > msg.height) {
                widht = scaleWidth(hTemp);
                height = scaleHeight(wTemp);
            }
        }
        return {imgWidth:widht, imgHeight:height};
    }
    render() {
        const msg = this.props.data && this.props.data.content && JSON.parse(this.props.data.content) || {};
        const imgWH = this.getImageUrlWidthAndHeight(msg);
        const source = {uri:msg.url};
        return (
            <TouchableOpacity activeOpacity = {0.8} onPress = {this._checkImg} style = {[style.container]}>
                <Image style = {[style.headerImg, {width:imgWH.imgWidth, height:imgWH.imgHeight}]} source = {source}/>
            </TouchableOpacity>
        );
    }
}
