import {StyleSheet} from 'react-native';

import {scaleHeight, scaleWidth, spText} from '../../../utils/Commons';

const styles = StyleSheet.create({
    container: {
        // backgroundColor:'#876482',
        backgroundColor:'#E9E9E9',
        flexDirection:'row',
        justifyContent:'space-between',
        // alignItems:'center',
        alignItems:'flex-end',
    },
    msgMic:{
        width:scaleHeight(27),
        height:scaleHeight(27),
        marginHorizontal:scaleWidth(15),
        marginBottom:scaleHeight(14),
    },
    msgAdd:{
        width:scaleHeight(27),
        height:scaleHeight(27),
        marginHorizontal:scaleWidth(15),
        marginBottom:scaleHeight(14),
    },
    micBgView: {
        flex:1,
        backgroundColor:'white',
        borderRadius:scaleHeight(5),
        alignItems:'center',
        justifyContent:'center',
        marginBottom:scaleHeight(8),
    },
    micText: {
        color:'#555C6A',
        fontSize:spText(17),
        fontWeight:'bold'
    },
    inputView: {
        flex:1,
        backgroundColor:'white',
        borderRadius:scaleHeight(5),
        justifyContent:'center',
        marginBottom:scaleHeight(8),
    },
    textInput: {
        flex:1,
        marginVertical:scaleHeight(5),
        marginHorizontal:scaleWidth(5),
        backgroundColor:'white',
        textAlignVertical: 'top',
        fontSize:spText(17)
    },
    toolView: {
        borderTopWidth:1,
        borderTopColor:'#CCCCCC',
        paddingHorizontal:scaleWidth(15)
    },
    toolItemBtnView: {
        flex:1,
        flexDirection:'row',
    },
    itemBtnView: {
        marginRight:scaleWidth(35),
        justifyContent:'center',
        alignItems:'center',
    },
    btnImg: {
        width:scaleHeight(60),
        height:scaleHeight(60),
    },
    btnText:{
        color:'#999FAC',
        fontSize:spText(12),
        marginTop:scaleHeight(15),
    }

});
export default styles;

