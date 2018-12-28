/**
 * Loading Icon Component
 */
import React from 'react';
import Icon from 'antd/lib/icon';

/**
 * @param {*} props The props of Icon Component in antd.
 */
const LoadingIcon = (props) => {
    return (
        <Icon type="loading" {...props} style={{ fontSize: 24 }} spin />
    );
};

export default LoadingIcon;
