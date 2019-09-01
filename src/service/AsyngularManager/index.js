
import asyngularClient from 'asyngular-client';

class AsyngularManager {
    constructor() {
        this.socket = null;
    }
    getSocket = () => {
        return this.socket;
    }
    // 创建
    socketCreate = () => {
        let socket = asyngularClient.create({
            hostname: 'localhost',
            port: 8001
          });
          this.socket = socket;
          this.bindSocket(socket);
          this.connectListener(socket);
          this.connectingListener(socket);
          this.errorListener(socket);
    }
    // 连接
    connectListener = async (socket) => {
        const channel = await socket.listener('connect');
        const iterator = channel[Symbol.asyncIterator]();
        while (0 < Infinity) {
            const { value, done } = await iterator.next();
            if (done) { break; }
            console.log('... We have an connect: ', value);
            // socket.transmit('customRemoteEvent', 123);
            // 订阅 subscribe
            // rpc进行发送
            // try {
            //     let result = await socket.sendMessage({'aaaaaaa':'dddddd', bad:true});
            //     console.log('result::',result);
            // } catch (error) {
            //     console.log(error.name, error.code);
            // }
        }
    }
    // 订阅
    subscribe = async (socket, subscribeName = '') => {
        if(subscribeName) {
            const channel = await socket.subscribe('consultation', { waitForAuth: true,});
            const iterator = channel[Symbol.asyncIterator]();
            while (0 < Infinity) {
                const { value, done } = await iterator.next();
                console.log('inbox recieved array size ', value.length);
                console.log(value);
                if (done) { break; }    
            }
        }
    }

    unsubscribe = async (socket, subscribeName = '') => {
        if(subscribeName) {
            socket.unsubscribe('inboxChannel');
        }
    }
    
    // 连接中...
    connectingListener = async (socket) => {
        const channel = await socket.listener('connecting');
        const iterator = channel[Symbol.asyncIterator]();
        while (0 < Infinity) {
            const { value, done } = await iterator.next();
            if (done) { break; }
            console.log('... We have an connecting: ', value);
    
        }
    }
    // socket错误处理
    errorListener = async (socket) => {
        const channel = await socket.listener('error');
        const iterator = channel[Symbol.asyncIterator]();
        while (0 < Infinity) {
            const { value, done } = await iterator.next();
            if (done) { break; }
            console.log('... We have an error: ', value);
    
        }
    }
    // 断开连接
    disconnectListener = async () => {
        const channel = await socket.listener('disconnect')
        const iterator = channel[Symbol.asyncIterator]();
        while (0 < Infinity) {
            const { value, done } = await iterator.next();
            if (done) { break; }
            console.log('... We have an disconnect: ', value);
            this.unsubscribe(this.socket)
        }
    }
    // 使用RPC
    bindSocket = (socket) => { 
        socket.sendMessage = socket.invoke.bind(socket, 'sendMessage');
    }
}

export default AsyngularManager;