/**
 * 资产弹框
 * 用于新增、编辑资产
 */
import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import AssetForm from './AssetForm';

const AssetDialogAction = {
    NEW: 'new',
    EDIT: 'edit'
};

class AssetDialog extends React.Component {
    prefixCls = 'asi-asset-dialog';

    static defaultProps = {
        action: AssetDialogAction.NEW,
        onCommit: () => {},
        data: {},
        loading: false,
        visible: false
    }

    onCommit = () => {
        const { onCommit } = this.props;

        onCommit();
    }

    render() {
        const { 
            action, 
            data, 
            loading, 
            visible 
        } = this.props;

        return (
            <div className={`${this.prefixCls}`}>
                <Modal
                    title={action === AssetDialogAction.NEW ? '新增资产' : '编辑资产'}
                    onOk={this.onCommit}
                    visible={visible}
                    confirmLoading={loading}
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
    onCommit: PropTypes.func,
    data: PropTypes.object,
    loading: PropTypes.bool,
    visible: PropTypes.bool
};

export default AssetDialog;
