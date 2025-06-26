import React from 'react';
import { Alert } from 'antd';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Alert message={message} type="error" showIcon style={{ marginTop: '20vh' }} />
);

export default ErrorMessage;
