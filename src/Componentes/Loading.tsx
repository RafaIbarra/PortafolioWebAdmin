import React from 'react';
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

interface LoadingProps {
  fullscreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullscreen = false }) => {
  const icon = <SyncOutlined style={{ fontSize: 48, color: 'rgba(32,93,93,255)' }} spin />;
  return <Spin indicator={icon} fullscreen={fullscreen} />;
};

export default Loading;
