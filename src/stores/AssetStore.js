/**
 * User asset store
 */
import { types, applySnapshot, process } from 'mobx-state-tree';
import axios from '../util/api';

/**
 * 投资都模型
 */
const Investor = types.model({
    id: types.number,
    name: types.string,
    mobile: types.string,
    email: types.string,
    sex: types.string,
    amount: types.number
});

/**
 * 安全等级模型
 */
const SafeLevel = types.model({
    id: types.number,
    name: types.string,
    code: types.string
});

/**
 * 资产分类
 */
const AssetCategory = types.model({
    name: types.string,
    code: types.string,
    bucket: SafeLevel
});

/**
 * 资产类型
 */
const AssetType = types.model({
    name: types.string,
    code: types.string,
    type: AssetCategory
});

/**
 * 用户模型
 */
const User = types.model({
    id: types.number,
    sex: types.string,
    name: types.string,
    mobile: types.string,
    email: types.string
});

/**
 * 资产详情列表
 */
const AssetItem = types.model({
    type: AssetType,
    owner: User,
    amount: types.number
});

/**
 * 资产数据模型
 */
const AssetsStore = types
    .model({
        // 投资者列表
        investors: types.array(Investor),
        // 资产详情列表
        assets: types.array(AssetItem)
    })
    .views(self => ({
        get assetsData() {
            const data = self.assets.map((asset, index) => {
                return Object.assign({}, asset, {
                    key: index
                });
            });
            return data;
        }
    }))
    .actions((self) => {
        const update = (json) => {
            json.forEach((assetJson) => {
                self.assets.push(assetJson);
            });
        };

        const fetchAssets = process(function* fetchAssets(id) {
            const res = yield axios.get(`userDetail/${id}/`);
            
            update(res.data);
        });

        return {
            fetchAssets
        };
    });

/**
 * 资产数据实例
 */
let assetsStore = null;

export default function initUserListStore(iserver, snapshot = null) {
    if (iserver) {
        assetsStore = AssetsStore.create({
            investors: [],
            assets: []
        });
    }
    if (assetsStore === null) {
        assetsStore = AssetsStore.create({
            investors: [],
            assets: []
        });
    }
    if (snapshot) {
        applySnapshot(assetsStore, snapshot);
    }
    return assetsStore;
}
