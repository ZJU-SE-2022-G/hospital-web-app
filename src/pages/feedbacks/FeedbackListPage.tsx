import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PageHeader, Checkbox, List, Typography, Tag } from 'antd';
import {
  useGetCurrentUserQuery,
  useListFeedbacksQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const { Text } = Typography;

const FeedbackListPage: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [showMe, setShowMe] = useState(false);
  const { data: user } = useGetCurrentUserQuery();
  const { data, isFetching } = useListFeedbacksQuery({
    p: current,
    pageSize: 10,
    uid: showMe ? user?.uid : undefined,
  });
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/feedbacks', breadcrumbName: '反馈列表' },
  ]);

  return (
    <PageHeader
      className={styles.largePage}
      title="反馈列表"
      breadcrumb={breadcrumb}
      extra={
        user && (
          <Checkbox onChange={e => setShowMe(e.target.checked)}>
            只看我的
          </Checkbox>
        )
      }
    >
      <List
        size="small"
        dataSource={data?.records}
        renderItem={feedback => (
          <List.Item
            actions={[
              feedback.problemType,
              moment(feedback.askTime).format('YYYY-MM-DD'),
            ]}
          >
            <Link to={`/feedbacks/${feedback.id}`}>
              {feedback.isAnswered ? (
                <Tag color="green">已回复</Tag>
              ) : (
                <Tag color="red">未回复</Tag>
              )}
              <Text>{feedback.title}</Text>
            </Link>
          </List.Item>
        )}
        pagination={{
          showSizeChanger: false,
          total: data?.total,
          onChange: page => setCurrent(page),
        }}
        loading={isFetching}
      />
    </PageHeader>
  );
};

export default FeedbackListPage;
