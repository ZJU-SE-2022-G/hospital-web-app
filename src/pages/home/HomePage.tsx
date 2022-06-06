import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Carousel, List, Typography, Tag, Space } from 'antd';
import NavigateButton from '../../components/NavigateButton';
import carousel1Img from '../../assets/home/carousel1.png';
import doctorImg from '../../assets/home/doctor.svg';
import departmentImg from '../../assets/home/department.svg';
import noticeImg from '../../assets/home/notice.svg';
import reserveImg from '../../assets/home/reserve.svg';
import styles from './HomePage.module.css';

const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  const imgs = [carousel1Img, carousel1Img];

  const contents = imgs.map(img => (
    <div>
      <div className={styles.content}>
        <img height="300" src={img} />
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
            <NavigateButton href="/doctors" label="专家介绍" img={doctorImg} />
            <NavigateButton
              href="/departments"
              label="科室介绍"
              img={departmentImg}
            />
            <NavigateButton href="/notices" label="院内公告" img={noticeImg} />
            <NavigateButton href="/reserve" label="门诊预约" img={reserveImg} />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
