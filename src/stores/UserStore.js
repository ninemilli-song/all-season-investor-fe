import { types, applySnapshot, flow } from 'mobx-state-tree';
import axios from '../util/api';

const User = types.model({
    id: types.number,
    sex: types.string,
    name: types.string,
    email: types.string,
    mobile: types.string
});

const UserStore = types
    .model({
        // 投资者列表
        userInfo: User
    })
    .actions((self) => {
        const update = (json = []) => {
            json.forEach((assetJson) => {
                self.assets.push(assetJson);
            });
        };

        // 获取投资者资产列表
        const fetchUserInfo = flow(function* fetchAssets(id) {
            const res = yield axios.get('assets/user', {
                params: {
                    id
                }
            });
           
            update(res);
        });

        // 更新投资者资产金额
        const signin = flow(function* updateAsset(id, amount) {
            // 更新服务数据
            yield axios.put(`assets/${id}/`, {
                amount
            });

            // 更新客户端store
            self.assets.forEach((item) => {
                if (item.id === id) {
                    item.amount = amount;
                }
            });
        });

        return {
            fetchUserInfo,
            signin
        };
    });


let userStore = null;

export default function initUserListStore(iserver, snapshot = null) {
    if (iserver) {
        userStore = UserStore.create({
            investors: [],
            assets: []
        });
    }
    if (userStore === null) {
        userStore = UserStore.create({
            investors: [],
            assets: []
        });
    }
    if (snapshot) {
        applySnapshot(userStore, snapshot);
    }
    return userStore;
}
