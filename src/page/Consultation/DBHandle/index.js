/* eslint-disable */
import React from 'react';

import DBManager from '../../../service/RealmManager/consultationManager/DBManager'
let instance = null;
class DBConsultHandle extends React.Component {
    constructor(props) {
        super(props)
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
        }
        return instance;
    }
    insertData = (data) => {
        console.log('realm--Realm Path:', DBManager.realmDB);
        if(data) {
            try {
                DBManager.realmDB.write(() => {
                    DBManager.realmDB.create('notification', this.msgDataHandle(data), true);
                });
            } catch (error) {
                console.log('realm--error--insertData-', error);
            }
        }
    }
    gerMsgData = () => {
        return DBManager.realmDB.objects('notification');
    }
    msgDataHandle = (data) => {
        try {
            const dic = {
                msgId: data.msgId,
                messageType:data.messageType,
                sessionId: data.sessionId,
                content:data.content,
                sendTime: data.sendTime,
                sender: data.sender,
                isMe:data.isMe,
                status: data.status,
                userId: data.userId,
            }
            return dic;
        } catch (error) {
            console.log('realm--error--msgDataHandle-', error);
            return {};
        }
    }

}

export default new DBConsultHandle();
