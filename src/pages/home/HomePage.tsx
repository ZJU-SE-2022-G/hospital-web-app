import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Row, Col, Carousel, List, Typography, Tag } from 'antd';
import { useListNoticesQuery } from '../../apis/apiSlice';
import NavigateButton from '../../components/NavigateButton';
import carousel1Img from '../../assets/home/carousel1.png';
import carousel2Img from '../../assets/home/carousel2.png';
import carousel3Img from '../../assets/home/carousel3.png';
import doctorImg from '../../assets/home/doctor.svg';
import departmentImg from '../../assets/home/department.svg';
import noticeImg from '../../assets/home/notice.svg';
import reserveImg from '../../assets/home/reserve.svg';
import styles from './HomePage.module.css';

const { Title, Text } = Typography;

const HomePage: React.FC = () => {
  const { data, isFetching } = useListNoticesQuery({
    p: 1,
    pageSize: 2,
    query: '',
  });

  const imgs = [carousel1Img, carousel2Img, carousel3Img];

  const contents = imgs.map(img => (
    <div key={img}>
      <div className={styles.content}>
        <img height="300" src={img} />
      </div>
    </div>
  ));

  return (
    <>
      <Row>
        <Col span="24">
          <Carousel autoplay>{contents}</Carousel>
        </Col>
      </Row>
      <Row>
        <Col className={styles.noticeOuterWrapper} span="24">
          <div className={styles.noticeInnerWrapper}>
            <Title className={styles.noticeTitle} level={4}>
              院内公告
            </Title>
            <List
              className={styles.noticeList}
              split={false}
              dataSource={data?.records}
              renderItem={item => (
                <List.Item
                  className={styles.noticeItem}
                  actions={[moment(item.updateTime).format('YYYY-MM-DD')]}
                >
                  <Link to={`/notices/${item.id}`}>
                    <Text>
                      <Tag color="red">NEW</Tag>
                      {item.title}
                    </Text>
                  </Link>
                </List.Item>
              )}
              loading={isFetching}
            />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col className={styles.navigate} xs={24} sm={16}>
          <NavigateButton href="/reserve" label="门诊预约" img={reserveImg} />
          <NavigateButton
            href="/epidemic/nucleic"
            label="核酸预约"
            img={reserveImg}
          />
          <NavigateButton
            href="/epidemic/vaccine"
            label="疫苗预约"
            img={reserveImg}
          />
          <NavigateButton
            href="/epidemic/map"
            label="疫情地图"
            img={reserveImg}
          />
          <NavigateButton href="/notices" label="院内公告" img={noticeImg} />
          <NavigateButton href="/help" label="预约指南" img={noticeImg} />
          <NavigateButton href="/feedback" label="问题反馈" img={noticeImg} />
          <NavigateButton href="/feedbacks" label="反馈列表" img={noticeImg} />
          <NavigateButton href="/doctors" label="医生介绍" img={doctorImg} />
          <NavigateButton
            href="/departments"
            label="科室介绍"
            img={departmentImg}
          />
          <NavigateButton
            href="/illnesses"
            label="病情介绍"
            img={departmentImg}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
