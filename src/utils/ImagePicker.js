import ImagePicker from 'react-native-image-picker';
import {Toast} from 'teaset';

let instance = null;
class ImagePickerUtils {
    constructor() {
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
        }
        return instance;
    }
    // photo'，'video'或'any'
    /**
    * 选择相片
    * @param {object} option mediaType = 'photo'，'video'或''
    * @returns {undefined}
    * */
    openImagePicker = async (option = {mediaType:'photo'}) => new Promise((resolve) => {
        ImagePicker.launchImageLibrary({...option, noData:true}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                Toast.fail('取消选择');
                resolve(null);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Toast.fail('选择失败');
                resolve(null);
            }else {
                const source = {uri: response.uri};
                resolve(source);
            }
        });
    })
    // 打开相机
    openCamera = async (option = {mediaType:'photo'}) => new Promise((resolve) => {
        ImagePicker.launchImageLibrary({...option, noData:true}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                Toast.fail('取消选择');
                resolve(null);
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Toast.fail('选择失败');
                resolve(null);
            }else {
                const source = {uri: response.uri};
                resolve(source);
                console.log('aaaa', response);
            }
        });
    })
}

export default new ImagePickerUtils();
