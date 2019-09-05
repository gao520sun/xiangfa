import React from 'react';
import {
    NativeModules
} from 'react-native';
// git https://github.com/ivpusic/react-native-image-crop-picker
// 当前没有使用安卓，后期再加上
const ImageCropPicker = NativeModules.ImageCropPicker;

let instance = null;
class ImageCrop extends React.Component {
    constructor(props, context) {
        super(props, context);
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
        }
        return instance;
    }
    // photo'，'video'或'any'
    /**
    * 选择相片
    * @param {object} option mediaType = 'photo'，'video'或'any'
    * @returns {undefined}
    * */
    openPicker = async (option = {mediaType:'photo'}) => {
        try {
            const imgs = await ImageCropPicker.openPicker({
                loadingLabelText:'正在处理图片',
                multiple:false, ...option});
            return imgs;
        } catch (error) {
            return [];
        }
    }
    // 打开相机
    openCamera = async (option = {mediaType:'photo'}) => {
        try {
            const imgs = await ImageCropPicker.openCamera({
                loadingLabelText:'正在处理图片',
                multiple:false, ...option});
            return imgs;
        } catch (error) {
            console.log('picError::', error);
            return null;
        }
    }
    // 裁剪
    openCropper = async (option = {path:''}) => {
        try {
            const img = await ImageCropPicker.openCropper(option);
            return img;
        } catch (error) {
            return null;
        }
    }
}

export default new ImageCrop();
