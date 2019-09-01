import {
    Dimensions,
    Platform,
    StatusBar,
    PixelRatio,
    Image,
} from 'react-native';

const _screenWidth = Dimensions.get('window').width;
const _screenHeight = Dimensions.get('window').height; // 安卓不包含虚拟按键高度

const defaultWidth = 375;
const defaultHeight = 667;

const _scaleWidth = _screenWidth / defaultWidth;
const _scaleHeight = _screenHeight / defaultHeight;
const fontScale = PixelRatio.getFontScale();

const globalWindow = typeof window !== 'undefined' ? window : global;

/**
 * 判断手机是否为iOS 刘海屏系列
 * */
const isIphoneX = (Platform.OS === 'ios' && (Number(((_screenHeight / _screenWidth) + '').substr(0, 4)) * 100) === 216);
/**
 * 状态栏高度
 * */
const statusBarHeight = Platform.OS !== 'ios' ? StatusBar.currentHeight : isIphoneX ? 40 : 20;


function getDates(timestamp) {
    const date = new Date();
    if (timestamp) {
        let _timestamp = String(parseInt(timestamp, 10));
        if(_timestamp.length === 10) {
            _timestamp = String(parseInt(_timestamp, 10) * 1000);
        }
        if (_timestamp.length !== 13) {
            _timestamp = Date.now();
            console.error(`Commons.getDate 非法参数 timestamp[${timestamp}]`);
        }
        date.setTime(parseInt(_timestamp, 10));
    }
    return date;
}
function getImageSize(image, maxWidth = 0, maxHeight = 0) {
    return new Promise((resolve) => {
        Image.getSize(image, (imgWidth, imgHeight) => {
            resolve(this.getScaleSize(imgWidth, imgHeight, maxWidth, maxHeight));
        });
    });
}
function zeroize(num) {
    return (String(num).length === 1 ? '0' : '') + num;
}
function getDateDiff(date) {
    if (date instanceof Date) { // 时间类型 获取今天 昨天 和年月日时间
        const curTimestamp = parseInt(new Date().getTime() / 1000, 10); // 当前时间戳
        const curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
        const tmDate = new Date(date); // 参数时间戳转换成的日期对象

        const Y = tmDate.getFullYear(); const m = tmDate.getMonth() + 1; const d = tmDate.getDate();
        const H = tmDate.getHours(); const i = tmDate.getMinutes();

        if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
            return this.zeroize(H) + ':' + this.zeroize(i);
        }
        const newDate = new Date((curTimestamp - 86400) * 1000); // 参数中的时间戳加一天转换成的日期对象
        if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
            return '昨天 ' + this.zeroize(H) + ':' + this.zeroize(i);
        }
        return Y + '/' + this.zeroize(m) + '/' + this.zeroize(d) + '  ' + this.zeroize(H) + ':' + this.zeroize(i);
    }
    return null;
}
function getScaleSize(originW, originH, maxWidth = 0, maxHeight = 0) {
    let width = originW;
    let height = originH;
    let scaleW = 1;
    let scaleH = 1;
    if (maxWidth > 0 && width > maxWidth) {
        scaleW = maxWidth / width;
    }
    if (maxHeight > 0 && height > maxHeight) {
        scaleH = maxHeight / height;
    }
    const scale = scaleW > scaleH ? scaleH : scaleW;
    width = width * scale;
    height = height * scale;
    return {width, height};
}
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function log(title, data) {
    if(globalWindow.process.env.NODE_ENV === 'development') {
        console.group(new Date().toLocaleString() + ' ' + title);
        console.log(data);
        console.groupEnd();
    }
}
/**
 * 屏幕适配,缩放size , 默认根据宽度适配，纵向也可以使用此方法
 * 横向的尺寸直接使用此方法
 * 如：width ,paddingHorizontal ,paddingLeft ,paddingRight ,marginHorizontal ,marginLeft ,marginRight
 * @param {number} size 设计图的尺寸
 * @returns {number} number
 */
function scaleWidth(size) {
    if(isIphoneX) {
        return size;
    }
    return size * _scaleWidth;
}

/**
 * 屏幕适配 , 纵向的尺寸使用此方法应该会更趋近于设计稿
 * 如：height ,paddingVertical ,paddingTop ,paddingBottom ,marginVertical ,marginTop ,marginBottom
 * @param {number} size 设计图的尺寸
 * @returns {number} number
 */
function scaleHeight(size) {
    if(isIphoneX) {
        return size;
    }
    return size * _scaleHeight;
}
function getDifDay (starttime, endtime) {
    const runTime = parseInt((endtime - starttime) / 1000, 10);
    const day = Math.floor(runTime / 86400);
    return day;
}

function setSpText(size, allowFontScaling = false) {
    if(isIphoneX) {
        return size;
    }
    const scale = Math.min(_scaleWidth, _scaleHeight);
    const fontSize = allowFontScaling ? 1 : fontScale;
    return size * scale / fontSize;
}

module.exports = {
    width:_screenWidth,
    height:_screenHeight,
    isIphoneX: isIphoneX,
    statusBarHeight: statusBarHeight,
    log: log,
    uuid:uuid,
    spText:setSpText,
    scaleWidth:scaleWidth,
    scaleHeight:scaleHeight,
    getDates:getDates,
    getImageSize:getImageSize,
    getScaleSize:getScaleSize,
    getDateDiff:getDateDiff,
    zeroize:zeroize,
    getDifDay:getDifDay,
};
