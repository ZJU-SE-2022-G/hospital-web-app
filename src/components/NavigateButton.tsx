import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import styles from './NavigateButton.module.css';

const { Title } = Typography;

interface NavigateButtonProps {
  href: string;
  label: string;
  img: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({
  href,
  label,
  img,
}) => (
  <Link to={href}>
    <div className={styles.button}>
      <img className={styles.img} src={img} />
      <Title className={styles.label} level={4}>
        {label}
      </Title>
    </div>
  </Link>
);

export default NavigateButton;
