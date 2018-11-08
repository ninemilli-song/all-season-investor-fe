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
    investors: types.array(User)
});

let userListStore = null;

export default function initUserListStore(iserver, snapshot = null) {
    if (iserver) {
        userListStore = UserListStore.create({
            investors: [
            ]
        });
    }
    if (userListStore === null) {
        userListStore = UserListStore.create({
            investors: [
            ]
        });
    }
    if (snapshot) {
        applySnapshot(userListStore, snapshot);
    }
    return userListStore;
}
