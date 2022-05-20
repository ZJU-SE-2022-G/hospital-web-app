import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DepartmentListPage.module.css'

const { Content, Sider } = Layout;

const departmentList = [...new Array(10).keys()].map(
    (index) => (
        <Menu.Item key={`${index}`} icon={React.createElement(UserOutlined)}>
            <Link to={`/departments/${index}`}>
                department {index}
            </Link>
        </Menu.Item>
    ));

const DepartmentListPage: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate("/departments");
    return (
        <Layout>
            <Sider>
                <Menu
                    mode="inline"
                    className={styles.menu}
                >
                    <Menu.Item key="index" onClick={handleClick}>
                        <span> 科室首页 </span>
                    </Menu.Item>
                    { departmentList }
                </Menu>
            </Sider>
            <Content className={styles.content}>
                Content Start
            </Content>
        </Layout>
    );
};

export default DepartmentListPage;
