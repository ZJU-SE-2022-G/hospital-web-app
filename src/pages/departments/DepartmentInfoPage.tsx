import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Departmentinfopage.module.css'

const { Content, Sider } = Layout;

const departmentList = [...new Array(10).keys()].map(
    (index) => (
        <Menu.Item key={`${index}`} icon={React.createElement(UserOutlined)}>
            <Link to={`/departments/${index}`}>
                department {index}
            </Link>
        </Menu.Item>
    ));

const DepartmentInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const { departmentId } = useParams();
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
                Content {departmentId}
            </Content>
        </Layout>
    );
};

export default DepartmentInfoPage;
