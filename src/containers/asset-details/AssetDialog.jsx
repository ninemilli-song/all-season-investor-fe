/**
 * 资产弹框
 * 用于新增、编辑资产
 */
import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import AssetForm from './AssetForm';

export const AssetDialogAction = {
    NEW: 'new',
    EDIT: 'edit'
};

class AssetDialog extends React.Component {
    prefixCls = 'asi-asset-dialog';

    static defaultProps = {
        action: AssetDialogAction.NEW,
        data: {},
        loading: false,
        visible: false
    }

    render() {
        const { 
            action,
            data,
            loading,
            ...otherProps
        } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <Modal
                    title={action === AssetDialogAction.NEW ? '新增资产' : '编辑资产'}
                    confirmLoading={loading}
                    {...otherProps}
                >
                    <AssetForm
                        data={data}
                    />
                </Modal>
            </div>
        );
    }
}

AssetDialog.propTypes = {
    action: PropTypes.string, // 'new'|'edit' 
    data: PropTypes.object,
    loading: PropTypes.bool,
    visible: PropTypes.bool
};

export default AssetDialog;
