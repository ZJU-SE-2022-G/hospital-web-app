import React from 'react';
import { Row, Col, Carousel, Space } from 'antd';
import styles from './Homepage.module.css';

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
          院内公告
        </Col>
      </Row>
      <Row>
        <Col className={styles.content} span="24">
          <Space>
            <div>专家介绍</div>
            <div>科室介绍</div>
            <div>院内介绍</div>
            <div>门诊预约</div>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
