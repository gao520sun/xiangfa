import {StyleSheet} from 'react-native';

import {scaleHeight, scaleWidth, spText} from '../../../../utils/Commons';

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop:scaleHeight(20),
    },
    toastText: {
        fontSize: spText(17),
        color:'white',
        paddingHorizontal:scaleWidth(5),
        paddingVertical:scaleHeight(5),
        borderRadius:scaleHeight(3)
    },
    toastIcon:{
        width:scaleHeight(100),
        height:scaleHeight(100),
    }
});
export default styles;

