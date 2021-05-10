import { types, applySnapshot, flow } from 'mobx-state-tree';
import Router from 'next/router';
import { logout } from '../util/AuthService';
import axios from '../util/api';
import { AssetsStore } from './AssetStore';

const UserStore = types
    .model({
        // 投资者列表
        id: types.number,
        sex: types.maybeNull(types.string),
        name: types.string,
        email: types.maybeNull(types.string),
        mobile: types.maybeNull(types.string)
    })
    .actions((self) => {
        const update = (json = {}) => {
            self = Object.assign(self, json);
        };

        // 获取用户信息
        const fetchUserInfo = flow(function* fetch() {
            const res = yield axios.get('auth/userInfo/').catch((err) => {
                console.log('Error: UserStore.js ------> fetchUserInfo \n', err);
            });
           
            update(res);
        });

        const doLogout = () => {
            logout();

            update({
                id: 0,
                sex: '',
                name: '',
                email: '',
                mobile: ''
            });

            // 刷新当前页面，触发重新渲染
            const currentPath = Router.asPath;
            Router.replace(currentPath);
        };

        return {
            fetchUserInfo,
            doLogout,
            update
        };
    });

const AppModel = types.model({
    user: UserStore,
    asset: AssetsStore
});


let appStore = null;

export default function initAppStore(iserver, snapshot = null) {
    if (iserver) {
        appStore = AppModel.create({
            user: {
                id: 0,
                sex: '',
                name: '',
                email: '',
                mobile: ''
            },
            asset: {
                investors: [],
                assets: [],
                assetAnalyses: [],
                loading: false
            }
        });
    }
    if (appStore === null) {
        appStore = AppModel.create({
            user: {
                id: 0,
                sex: '',
                name: '',
                email: '',
                mobile: ''
            },
            asset: {
                investors: [],
                assets: [],
                assetAnalyses: [],
                loading: false
            }
        });
    }
    if (snapshot) {
        applySnapshot(appStore, snapshot);
    }
    return appStore;
}
