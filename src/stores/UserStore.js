import { types, applySnapshot, flow } from 'mobx-state-tree';
import { logout } from '../util/AuthService';
import axios from '../util/api';

// const User = types.model({
//     id: types.number,
//     sex: types.string,
//     name: types.string,
//     email: types.string,
//     mobile: types.string
// });

const UserStore = types
    .model({
        // 投资者列表
        id: types.number,
        sex: types.string,
        name: types.string,
        email: types.string,
        mobile: types.string
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
        };

        return {
            fetchUserInfo,
            doLogout,
            update
        };
    });


let userStore = null;

export default function initUserListStore(iserver, snapshot = null) {
    if (iserver) {
        userStore = UserStore.create({
            id: 0,
            sex: '',
            name: '',
            email: '',
            mobile: ''
        });
    }
    if (userStore === null) {
        userStore = UserStore.create({
            id: 0,
            sex: '',
            name: '',
            email: '',
            mobile: ''
        });
    }
    if (snapshot) {
        applySnapshot(userStore, snapshot);
    }
    return userStore;
}
