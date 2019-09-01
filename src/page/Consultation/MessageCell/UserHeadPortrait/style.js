import {StyleSheet} from 'react-native';

import {scaleHeight} from '../../../../utils/Commons';

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
    },
    headerImg: {
        width: scaleHeight(45),
        height: scaleHeight(45),
        borderRadius: scaleHeight(5)

    }
});
export default styles;

