import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Carousel, List, Typography, Tag, Space } from 'antd';
import NavigateButton from '../../components/NavigateButton';
import styles from './HomePage.module.css';

const { Title, Text } = Typography;

interface Notice {
  id: number;
  title: string;
  date: Date;
}

const HomePage: React.FC = () => {
  const imgs = ['carousel1.png', 'carousel1.png'];

  const contents = imgs.map(img => (
    <div>
      <div className={styles.content}>
        <img src={`/src/assets/home/${img}`} height="300" />
      </div>
    </div>
  ));

  const notices: Notice[] = [
    { id: 1, title: '软件工程本周周末前上传需求报告', date: new Date() },
    { id: 2, title: '软件工程本周周末前上传设计报告', date: new Date() },
  ];

  return (
    <>
      <Row>
        <Col span="24">
          <Carousel>{contents}</Carousel>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div className={styles.noticeOuterWrapper}>
            <div className={styles.noticeInnerWrapper}>
              <Title className={styles.noticeTitle} level={4}>
                院内公告
              </Title>
              <List
                className={styles.noticeList}
                split={false}
                dataSource={notices}
                renderItem={item => (
                  <List.Item className={styles.noticeItem}>
                    <Link to={`/notices/${item.id}`}>
                      <Text>
                        <Tag color="red">NEW</Tag> {item.title}
                      </Text>
                    </Link>
                    <Text type="secondary">
                      {moment(item.date).format('YYYY-MM-DD')}
                    </Text>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className={styles.content} span="24">
          <Space size="large">
            <NavigateButton
              href="/doctors"
              label="专家介绍"
              imgSrc="/src/assets/home/doctor.svg"
            />
            <NavigateButton
              href="/departments"
              label="科室介绍"
              imgSrc="/src/assets/home/department.svg"
            />
            <NavigateButton
              href="/notices"
              label="院内公告"
              imgSrc="/src/assets/home/notice.svg"
            />
            <NavigateButton
              href="/reserve"
              label="门诊预约"
              imgSrc="/src/assets/home/reserve.svg"
            />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
