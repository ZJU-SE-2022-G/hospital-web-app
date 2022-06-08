import { Space, Tag,Table,Button} from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

const VaccineInfo: React.FC = () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: '身份证号',
      dataIndex: 'id_number',
      key: 'id_number',
    },
    {
      title: '当前针数',
      dataIndex: 'vaccine_number',
      key: 'vaccine_number',
    },
    {
      title: '日期',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      //TODO: tag需要设置为interface，设置预约的状态
      render: (tag: any) => (
        <Tag>
          {tag === 2 ? '已预约' : tag === 4 ? '问诊中' : '已结束'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      //TODO:record为表的row数据类型，创建接口
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            type={'link'}
            onClick={
              () => {
              }}
          >
            问诊
          </Button>
          <Button
            type={'link'}
            onClick={
              () => {
              }}
          >
            删除
          </Button>
          <Button
            type={'link'}
            onClick={
              () => {
              }}
          >
            详情
          </Button>
        </Space>
      ),
    },
  ];
  return <Table
  pagination={{
    position:['bottomCenter'],
    hideOnSinglePage: true,
    pageSize: 5
  }}
    columns={columns}
    // TODO : add data from database
/>
};

export default VaccineInfo;


