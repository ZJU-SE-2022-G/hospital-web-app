import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigateButton.module.css';

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
        <span className={styles.label}>{label}</span>
      </div>
    </Link>
  );
};

export default NavigateButton;
