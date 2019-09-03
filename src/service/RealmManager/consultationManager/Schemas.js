export const tables = {
    // imageSchema: {
    //     name: 'Image',
    //     properties: {
    //         url:  {type: 'string', default: '', optional:true},
    //         localUrl:{type: 'string', default: '', optional:true},
    //         width: {type: 'int', default: 0, optional:true},
    //         height: {type: 'int', default: 0, optional:true},
    //     }
    // },
    // voiceSchema: {
    //     name: 'Voice',
    //     properties: {
    //         url:  {type: 'string', default: '', optional:true},
    //         localUrl:{type: 'string', default: '', optional:true},
    //         length: {type: 'double', default: 0, optional:true},
    //     }
    // },
    // textSchema: {
    //     name: 'Text',
    //     properties: {
    //         text:  {type: 'string', default: '', optional:true},
    //     }
    // },
    notification: {
        name: 'notification',
        primaryKey: 'msgId',
        properties: {
            msgId: 'string',
            messageType:'string',
            sessionId: {type: 'string', optional:true},
            // TODO
            content:{type:'string', optional:true},
            sendTime: {type: 'double', optional:true},
            sender: {type: 'string', optional:true},
            isMe:{type: 'bool', default:false},
            status: {type: 'string', indexed: true},
            userId: {type: 'int', indexed: true},
        }
    },
};


