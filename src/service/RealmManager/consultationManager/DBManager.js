/* eslint-disable */
import React from 'react';
import Realm from 'realm';

import { tables } from './Schemas';
let instance = null;
class DBManager extends React.Component {
    constructor(props) {
        super(props)
        if(!instance) {
            // eslint-disable-next-line consistent-this
            instance = this;
            this.realmDB = null;
            this.createRealmDB();
        }
        return instance;
    }
    createRealmDB = () => {
        if (!this.realmDB) {
            const _this = this;
            const schemaList = [];
            for (const key in tables) {
                schemaList.push(tables[key]);
            }
            // TODO 数据库是否有修改，如果有修改，增加版本
            const schemas = [
                { schema: schemaList, path:'consultation.realm', schemaVersion: 1, migration: (oldRealm, newRealm) => { } },
            ];
            // 当前(最新)版本
            let nextSchemaVersion = Realm.schemaVersion(Realm.defaultPath);
            for (let i = 0, len = schemas.length; i < len; i++) {
                const migratedSchema = schemas[i];
                const migratedSchemaVersion = migratedSchema.schemaVersion;
                if (nextSchemaVersion > 0 && nextSchemaVersion < migratedSchemaVersion) {
                    nextSchemaVersion = migratedSchemaVersion;
                    const migratedRealm = new Realm(migratedSchema);
                    migratedRealm.close();
                }
            }
            _this.realmDB = new Realm(schemas[schemas.length - 1]);
            console.log('realm--Realm Path:', _this.realmDB.path);
        }
    };
}

export default new DBManager();
