
import {Platform, Alert} from 'react-native';

import Permissions from 'react-native-permissions';
// https://github.com/react-native-community/react-native-permissions
// authorized	用户已授权此权限
// denied	用户至少拒绝过一次此权限。在iOS上，这意味着不会再次提示用户。可以多次提示Android用户，直到他们选择“再也不要问我”为止
// restricted	iOS - 这意味着用户无法授予此权限，因为设备不支持此权限，或者因为它已被家长控制阻止。Android - 这意味着用户在拒绝许可时选择了“从不再问我”
// undetermined	尚未通过权限对话框提示用户
const alterView = () => new Promise((resolve) => {
    Alert.alert('提醒', '开启“想法”权限,获取更多想法', [
        {
            text: '残忍拒绝',
            onPress: () => {resolve(false);},
        },
        {
            text: '设置',
            onPress: () => {
                resolve(false);
                Permissions.openSettings();
            },
        }
    ], {cancelable:false});
});

const checkPermissionUtils = {
    checkPrmission: async (type) => {
        const check = await Permissions.check(type);
        // // 已授权
        if(check === 'authorized') {
            return true;
        }
        if(check === 'restricted') {
            if(Platform.OS === 'ios') {
                // android没有此功能
                const canPermission = Permissions.canOpenSettings();
                if(canPermission) {
                    return await alterView();
                }
            }
            return false;
        }
        if(check === 'denied') {
            // android 会在询问一次 再次请求一次
            if(Platform.OS === 'android') {
                const request = await Permissions.request(type);
                return request === 'authorized';
            }
            return await alterView();
        }
        const request = await Permissions.request(type);
        return request === 'authorized';
    },
};
export default checkPermissionUtils;
