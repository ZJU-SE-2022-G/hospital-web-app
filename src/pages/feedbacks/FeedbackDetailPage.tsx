import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  PageHeader,
  Typography,
  Button,
  Skeleton,
  Divider,
  Modal,
  message,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Viewer from '../../components/Viewer';
import Editor from '../../components/Editor';
import {
  useGetCurrentUserQuery,
  useGetFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import pageStyles from '../../styles/Page.module.css';
import styles from './FeedbackDetailPage.module.css';

const { Title, Text } = Typography;
const { confirm } = Modal;

const FeedbackDetailPage: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const { feedbackId = '' } = useParams();
  const { data: user } = useGetCurrentUserQuery();
  const { data, isFetching } = useGetFeedbackQuery({ id: feedbackId });
  const [update, { isLoading }] = useUpdateFeedbackMutation();
  const [remove] = useDeleteFeedbackMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/feedbacks', breadcrumbName: '反馈列表' },
    { path: `/feedbacks/${feedbackId}`, breadcrumbName: '反馈详情' },
  ]);

  const onFinish = async () => {
    try {
      await update({ id: feedbackId, answer }).unwrap();
      message.success('回复成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  const onDelete = () =>
    confirm({
      title: '确认删除该反馈？',
      onOk: async () => {
        try {
          await remove({ id: feedbackId }).unwrap();
          navigate('/feedbacks');
          message.success('删除成功');
        } catch (err: any) {
          message.error(err.message || err.status);
        }
      },
    });

  return (
    <PageHeader
      className={pageStyles.largePage}
      title={
        data && (
          <>
            <Title className={styles.title} level={2}>
              {data.title}
            </Title>
            <Text className={styles.subTitle} type="secondary">
              反馈时间：{moment(data.askTime).format('YYYY-MM-DD HH:mm:ss')}
            </Text>
          </>
        )
      }
      breadcrumb={breadcrumb}
      extra={
        data && (user?.isAdmin || user?.uid === data.askerId) ? (
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={onDelete}
          >
            删除反馈
          </Button>
        ) : undefined
      }
    >
      <Skeleton active loading={isFetching}>
        {data ? (
          <>
            <Viewer initialValue={data.problem} />
            <Divider />
            {data.isAnswered ? (
              <>
                <Text strong>回复：</Text>
                <Viewer initialValue={data.answer} />
              </>
            ) : user?.isAdmin ? (
              <>
                <Editor onChange={value => setAnswer(value)} />
                <Button
                  className={styles.button}
                  type="primary"
                  loading={isLoading}
                  onClick={onFinish}
                >
                  回复
                </Button>
              </>
            ) : undefined}
          </>
        ) : (
          '加载失败'
        )}
      </Skeleton>
    </PageHeader>
  );
};

export default FeedbackDetailPage;
