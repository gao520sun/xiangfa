import {StyleSheet} from 'react-native';

import {scaleHeight, spText} from '../../../../utils/Commons';

const styles = StyleSheet.create({
    container: {
        maxWidth:'100%',
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleHeight(10),
        borderRadius: scaleHeight(5),
        flexDirection: 'row',
    },
    text: {
        fontSize: spText(17),
        lineHeight: spText(21),
        color: '#222938',
        textAlign:'left',
    }
});
export default styles;


// import React, { Component } from 'react';
// import { AppRegistry, StyleSheet, Text, View } from 'react-native';
//  export default class MsgPopPage extends Component { render() {
//      return (
//  <View style={styles.container}>
//  <Text style={styles.msg}>Hello MSG</Text>
//   <View style={styles.triangle}> </View> </View> ); } }
//    const styles = StyleSheet.create({
//        container: { flex: 1, flexDirection: 'row',
//        justifyContent: 'center',
//        alignItems: 'center',
//        backgroundColor: '#F5FCFF', },
//         msg: { fontSize: 20,
//             textAlign: 'center',
//             padding: 10, backgroundColor: 'chartreuse',
//              borderRadius: 8, },
//              triangle: { width: 0, height: 0,
//                  backgroundColor: 'transparent',
//                   borderStyle: 'solid',
//                    borderLeftWidth: 30,
//                    borderRightWidth: 30,
//                    borderBottomWidth: 8,
//                    borderTopWidth: 8,
//                     borderLeftColor: 'chartreuse',
//                     borderRightColor: 'transparent',
//                      borderTopColor: 'transparent',
// borderBottomColor: 'transparent',
//  }, });
