import React, { useState } from 'react';
import {
  Modal,
  PageHeader,
  Button,
  Skeleton,
  Collapse,
  Typography,
  message,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import TitleContentForm from '../../components/TitleContentForm';
import Viewer from '../../components/Viewer';
import {
  useGetCurrentUserQuery,
  useListHelpsQuery,
  useCreateHelpMutation,
  useDeleteHelpMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const { confirm } = Modal;
const { Panel } = Collapse;
const { Text } = Typography;

const HelpPage: React.FC = () => {
  const [formVisible, setFormVisible] = useState(false);
  const { data: user } = useGetCurrentUserQuery();
  const { data, isFetching } = useListHelpsQuery({ p: 1, pageSize: 100 });
  const [create, { isLoading }] = useCreateHelpMutation();
  const [remove] = useDeleteHelpMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/help', breadcrumbName: '预约指南' },
  ]);

  const onFinish = async (values: any) => {
    try {
      await create({
        title: values['title'],
        content: values['content'],
      }).unwrap();
      setFormVisible(false);
      message.success('创建成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  const onDelete = (id: number) =>
    confirm({
      title: '确认删除该问答？',
      onOk: async () => {
        try {
          await remove({ id }).unwrap();
          message.success('删除成功');
        } catch (err: any) {
          message.error(err.message || err.status);
        }
      },
    });

  return (
    <PageHeader
      className={styles.largePage}
      title="预约指南"
      breadcrumb={breadcrumb}
      extra={
        user?.isAdmin && !formVisible ? (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFormVisible(true)}
          >
            创建问答
          </Button>
        ) : undefined
      }
    >
      {formVisible && (
        <TitleContentForm
          name="help"
          titleLabel="问题"
          contentLabel="回答"
          submitLabel="创建"
          loading={isLoading}
          onFinish={onFinish}
          onCancel={() => setFormVisible(false)}
        />
      )}
      <Skeleton active loading={isFetching}>
        {data ? (
          <Collapse>
            {data.records.map(({ id, title, content }) => (
              <Panel
                key={id}
                header={
                  <>
                    <Text strong>问：</Text>
                    {title}
                  </>
                }
                extra={
                  user?.isAdmin ? (
                    <Button
                      type="link"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={e => {
                        e.stopPropagation();
                        onDelete(id);
                      }}
                    />
                  ) : undefined
                }
              >
                <Text strong>答：</Text>
                <Viewer initialValue={content} />
              </Panel>
            ))}
          </Collapse>
        ) : (
          '加载失败'
        )}
      </Skeleton>
    </PageHeader>
  );
};

export default HelpPage;
