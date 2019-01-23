/**
 * User asset store
 */
import { types, applySnapshot, flow } from 'mobx-state-tree';
import axios from '../util/api';

/**
 * 投资者模型
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
    amount: types.number
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
const AssetsStore = types
    .model({
        // 投资者列表
        investors: types.array(Investor),
        // 资产详情列表
        assets: types.array(AssetItem),
        // 资产分析数据
        assetAnalyses: types.array(AssetAnalysis)
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
        const update = (json = []) => {
            // json.forEach((assetJson) => {
            //     self.assets.push(assetJson);
            // });
            self.assets = json;
        };

        // 获取投资者资产列表
        const fetchAssets = flow(function* fetchAssets(id) {
            const res = yield axios.get('assets/user', {
                params: {
                    id
                }
            });
            
            update(res);
        });

        // 更新投资者资产金额
        const updateAsset = flow(function* updateAsset(id, amount) {
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

        // 获取资产分析数据
        const fetchAssetAnalyses = flow(function* fetchAssetAnalyses(id) {
            // const mockData = [
            //     {
            //         bucket: {
            //             'id': 2,
            //             'name': '风险/成长',
            //             'code': '000002'
            //         },
            //         amount: 200,
            //         suggestAmount: 80,
            //         rate: 0.5,
            //         suggestRate: 0.2,
            //         title: '有正负波动收益的钱',
            //         analysis: '配置过高，风险较大',
            //         assets: [
            //             {
            //                 'id': 1,
            //                 'type': {
            //                     'name': '易方达上证50指数A',
            //                     'code': '110003',
            //                     'type': {
            //                         'name': '股票',
            //                         'code': '000001',
            //                         'bucket': {
            //                             'id': 2,
            //                             'name': '风险/成长',
            //                             'code': '000002'
            //                         }
            //                     }
            //                 },
            //                 'owner': {
            //                     'id': 1,
            //                     'sex': '男',
            //                     'name': 'ninemilli',
            //                     'email': '111111@asi.com',
            //                     'mobile': '13711112222'
            //                 },
            //                 'amount': 16249.55
            //             },
            //             {
            //                 'id': 2,
            //                 'type': {
            //                     'name': '富国中证500指数增强(LOF)',
            //                     'code': '161017',
            //                     'type': {
            //                         'name': '股票',
            //                         'code': '000001',
            //                         'bucket': {
            //                             'id': 2,
            //                             'name': '风险/成长',
            //                             'code': '000002'
            //                         }
            //                     }
            //                 },
            //                 'owner': {
            //                     'id': 1,
            //                     'sex': '男',
            //                     'name': 'ninemilli',
            //                     'email': '111111@asi.com',
            //                     'mobile': '13711112222'
            //                 },
            //                 'amount': 21199.52
            //             }
            //         ]
            //     },
            //     {
            //         bucket: {
            //             'id': 1,
            //             'name': '安全/安心',
            //             'code': '000001'
            //         },
            //         amount: 200,
            //         suggestAmount: 320,
            //         rate: 0.5,
            //         suggestRate: 0.8,
            //         title: '安全/安心资产',
            //         analysis: '配置过低，不足以对冲高风险收入',
            //         assets: [
            //             {
            //                 'id': 12,
            //                 'type': {
            //                     'name': '招商产业C',
            //                     'code': '001868',
            //                     'type': {
            //                         'name': '债券',
            //                         'code': '000002',
            //                         'bucket': {
            //                             'id': 1,
            //                             'name': '安全/安心',
            //                             'code': '000001'
            //                         }
            //                     }
            //                 },
            //                 'owner': {
            //                     'id': 1,
            //                     'sex': '男',
            //                     'name': 'ninemilli',
            //                     'email': '111111@asi.com',
            //                     'mobile': '13711112222'
            //                 },
            //                 'amount': 14559.19
            //             }
            //         ]
            //     }
            // ];

            // const data = yield new Promise((resolve, reject) => {
            //     try {
            //         setTimeout(() => {
            //             resolve(mockData);
            //         }, 1000);
            //     } catch (e) {
            //         reject(e);
            //     }
            // });

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
            fetchAssetAnalyses
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
            assetAnalyses: []
        });
    }
    if (assetsStore === null) {
        assetsStore = AssetsStore.create({
            investors: [],
            assets: [],
            assetAnalyses: []
        });
    }
    if (snapshot) {
        applySnapshot(assetsStore, snapshot);
    }
    return assetsStore;
}
