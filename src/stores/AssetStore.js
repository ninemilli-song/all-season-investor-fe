/* eslint-disable func-names */
/**
 * User asset store
 */
import {
    types,
    applySnapshot,
    flow,
    // addMiddleware
} from 'mobx-state-tree';
import axios from '../util/api';
// import { promiseMiddleware } from '../util/middleware';

/**
 * 投资者模型
 */
const Investor = types.model({
    id: types.number,
    name: types.string,
    mobile: types.string,
    email: types.string,
    sex: types.maybeNull(types.string),
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
 * 资产类目
 */
const AssetCategory = types.model({
    name: types.string,
    code: types.string,
    level: SafeLevel
});

/**
 * 资产品种
 */
const AssetType = types.model({
    name: types.string,
    code: types.string,
    category: AssetCategory
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
    id: types.number,
    type: AssetType,
    owner: User,
    pv: types.number // 资产现值
});

/**
 * 某类资产的资产分析
 */
const AssetAnalysis = types.model({
    bucket: SafeLevel, // 资产水桶
    amount: types.number, // 当前资产金额
    suggestAmount: types.number, // 建议资产金额
    rate: types.number, // 当前配置比例
    suggestRate: types.number, // 建议配置比例
    title: types.string, // 配置项标题
    analysis: types.string, // 当前配置分析
    assets: types.array(AssetItem) // 当前配置中包含的种类资产
});

/**
 * 资产数据模型
 */
export const AssetsStore = types
    .model({
    // 投资者列表
        investors: types.array(Investor),
        // 资产详情列表
        assets: types.array(AssetItem),
        // 资产分析数据
        assetAnalyses: types.array(AssetAnalysis),
        // 异步状态
        loading: types.boolean
    })
    .views(self => ({
        get assetsData() {
            const data = self.assets.map((asset) => {
                return Object.assign({}, asset, {
                    key: asset.id
                });
            });
            return data;
        }
    }))
    .actions((self) => {
        const updateAssets = (json = []) => {
            self.assets = json;
        };

        // 获取投资者资产列表
        const fetchAssets = flow(function* fetchAssets(id) {
            const res = yield axios.get('assets/user', {
                params: {
                    id
                }
            });

            updateAssets(res);
        });

        // 更新投资者资产信息
        const updateAsset = flow(function* updateAsset(id, pv) {
            // self.loading = true;

            // 更新服务数据
            yield axios.put(`assets/${id}/`, {
                pv
            });

            // 更新客户端store
            self.assets.forEach((item) => {
                if (item.id === id) {
                    item.pv = pv;
                }
            });

            // self.loading = false;

            return true;
        });

        const fetchInvestors = flow(function* () {
            const data = yield axios.get('profile');

            self.investors = data;
        });

        // 获取资产分析数据
        const fetchAssetAnalyses = flow(function* fetchAssetAnalyses(id) {
            // 获取投资者资产列表
            const data = yield axios.get('assets/analysis', {
                params: {
                    id
                }
            });

            self.assetAnalyses = data;
        });

        return {
            fetchAssets,
            updateAsset,
            fetchAssetAnalyses,
            fetchInvestors
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
            assets: [],
            assetAnalyses: [],
            loading: false
        });

        // addMiddleware(assetsStore, promiseMiddleware(assetsStore));
    }
    if (assetsStore === null) {
        assetsStore = AssetsStore.create({
            investors: [],
            assets: [],
            assetAnalyses: [],
            loading: false
        });

        // addMiddleware(assetsStore, promiseMiddleware(assetsStore));
    }
    if (snapshot) {
        applySnapshot(assetsStore, snapshot);
    }
    return assetsStore;
}
