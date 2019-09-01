import {Image} from 'react-native';

const getimageUrls = (originalData, imgData) => {
    let chooseImgIndex = 0;
    const imgs = originalData.filter((item) => item.messageType === 'IMAGE').reverse().map((im, index) => {
        let uriImg = '';
        if(im.messgae.imgUrl === imgData.messgae.imgUrl) {
            chooseImgIndex = index;
        }
        try {
            if(im.messgae.imgUrl && typeof im.messgae.imgUrl === 'string' && im.messgae.imgUrl.indexOf('http') !== -1) {
                uriImg = im.messgae.imgUrl;
            }else {
                const source = Image.resolveAssetSource(im.messgae.imgUrl);
                uriImg = source.uri;
            }
        } catch (error) {
            //
        }
        return {url:uriImg || ''};
    });
    return {imgUrls: imgs || [], index:chooseImgIndex};
};

export {
    getimageUrls
};
