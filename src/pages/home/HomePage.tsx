import React from 'react';
import { Row, Col, Carousel, Space } from 'antd';
import NavigateButton from '../../components/NavigateButton';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const imgs = ['carousel1.png', 'carousel1.png'];

  const contents = imgs.map((img) => (
    <div>
      <div className={styles.content}>
        <img src={`/src/assets/home/${img}`} height="300" />
      </div>
    </div>
  ));

  return (
    <>
      <Row>
        <Col span="24">
          <Carousel>{contents}</Carousel>
        </Col>
      </Row>
      <Row>
        <Col className={styles.content} span="24">
          <div className={styles.noticeOuterWrapper}>
            <div className={styles.noticeInnerWrapper}>
              <div>院内通知</div>
              <div></div>
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
