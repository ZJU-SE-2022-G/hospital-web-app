import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import styles from './NavigateButton.module.css';

const { Title } = Typography;

interface NavigateButtonProps {
  href: string;
  label: string;
  imgSrc: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({
  href,
  label,
  imgSrc,
}) => {
  return (
    <Link to={href}>
      <div className={styles.button}>
        <img className={styles.img} src={imgSrc} />
        <Title className={styles.label} level={4}>
          {label}
        </Title>
      </div>
    </Link>
  );
};

export default NavigateButton;
