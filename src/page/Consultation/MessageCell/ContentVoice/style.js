import {StyleSheet} from 'react-native';

import {scaleHeight, scaleWidth} from '../../../../utils/Commons';

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#87CEFF',
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleHeight(10),
        borderRadius: scaleHeight(5),
        minWidth:scaleWidth(60)
    },
});
export default styles;

