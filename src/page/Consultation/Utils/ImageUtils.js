import {Image} from 'react-native';

const getimageUrls = (originalData, msgData) => {
    let chooseImgIndex = 0;
    const imgs = originalData.filter((item) => item.messageType === 'IMAGE').map((im, index) => {
        let uriImg = '';
        const msgItem = im && im.content && JSON.parse(im.content) || {};
        const msg = msgData && msgData.content && JSON.parse(msgData.content) || {};
        if(msg.url === msgItem.url) {
            chooseImgIndex = index;
        }
        uriImg = msgItem.url;
        return {url:uriImg || ''};
    });
    return {imgUrls: imgs || [], index:chooseImgIndex};
};

export {
    getimageUrls
};
