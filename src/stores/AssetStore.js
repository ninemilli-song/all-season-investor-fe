/**
 * User asset store
 */
import { types, applySnapshot } from 'mobx-state-tree';

const User = types.model({
    id: types.number,
    name: types.string,
    mobile: types.string,
    email: types.string,
    sex: types.string,
    amount: types.number
});

const UserListStore = types.model({
    users: types.array(User)
});

let userListStore = null;

export default function initUserListStore(iserver, snapshot = null) {
    if (iserver) {
        userListStore = UserListStore.create({
            users: [
                {
                    'id': 1,
                    'name': 'songxg',
                    'mobile': '13629851096',
                    'email': 'ex@asi.com',
                    'sex': '男',
                    'amount': 499970.8
                },
            ]
        });
    }
    if (userListStore === null) {
        userListStore = UserListStore.create({
            users: [
                {
                    'id': 1,
                    'name': 'songxg',
                    'mobile': '13629851096',
                    'email': 'ex@asi.com',
                    'sex': '男',
                    'amount': 499970.8
                },
            ]
        });
    }
    if (snapshot) {
        applySnapshot(userListStore, snapshot);
    }
    return userListStore;
}
