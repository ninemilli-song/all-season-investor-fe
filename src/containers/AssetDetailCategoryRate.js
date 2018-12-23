/**
 * 资产类型比例
 */
import React from 'react';
import { observer } from 'mobx-react';

// Data struct defind
// type AssetAnalysis = {
//     category: {
//         id: number;
//         name: string;
//         code: string;
//     };
//     amount: number;
//     suggestAmount: number;
//     rate: number;
//     suggestRate: number;
//     descripte: string;
//     analysis: string;
//     assets: Array<asset>;
// }

// Array<AssetAnalysis>

@observer
class AssetDetailCategoryRate extends React.Component {
    render() {
        return (
            <div>
                AssetDetailCategoryRate
            </div>
        );
    }
}

export default AssetDetailCategoryRate;
