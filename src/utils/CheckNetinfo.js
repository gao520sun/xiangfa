import React from 'react';
import NetInfo from '@react-native-community/netinfo';

let instance = null;
class NetinfoUtils extends React.Component {
    constructor(props, context) {
        super(props, context);
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
        }
        this.netInfoEventListener();
        return instance;
    }
      netInfoEventListener = () => {
          NetInfo.addEventListener((state) => {
              console.log('Connection type', state.type);
              console.log('Is connected?', state.isConnected);
          });
      }
}

export default new NetinfoUtils();
