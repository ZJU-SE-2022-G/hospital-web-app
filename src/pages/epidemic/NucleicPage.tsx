import React, { useState, useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  PageHeader,
  Button,
  Form,
  Input,
  Radio,
  DatePicker,
  Modal,
  Descriptions,
  message,
} from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  useGetCurrentUserQuery,
  useGetNucleicReservationQuery,
  useCreateNucleicReservationMutation,
  useDeleteNucleicReservationMutation,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const NucleicPage: React.FC = () => {
  const [infoVisible, setInfoVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data: user } = useGetCurrentUserQuery();
  const { data } = useGetNucleicReservationQuery(user?.id || skipToken);
  const [reserve, { isLoading: reserveLoading }] =
    useCreateNucleicReservationMutation();
  const [remove, { isLoading: removeLoading }] =
    useDeleteNucleicReservationMutation();
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/epidemic/nucleic', breadcrumbName: '核酸预约' },
  ]);

  useEffect(() => {
    form.setFieldsValue({ name: user?.name, id: user?.id });
  }, [user]);

  const onFinish = async (values: any) => {
    try {
      await reserve({
        usrId: values['id'],
        usrName: values['name'],
        testType: values['nucleic-type'],
        testDate: values['nucleic-date'].format('YYYY-MM-DD'),
      }).unwrap();
      setInfoVisible(true);
      message.success('预约成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  const onDelete = async () => {
    try {
      if (user) {
        await remove(user.id).unwrap();
        setInfoVisible(false);
        message.success('取消成功');
      }
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <>
      <PageHeader
        className={styles.page}
        title="核酸检测预约"
        breadcrumb={breadcrumb}
        extra={
          user && (
            <Button
              type="primary"
              icon={<FormOutlined />}
              onClick={() => setInfoVisible(true)}
            >
              我的预约
            </Button>
          )
        }
      >
        {user ? (
          <Form
            form={form}
            name="nucleic"
            labelAlign="left"
            labelCol={{ span: 6 }}
            validateTrigger="onBlur"
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                { required: true, message: '请输入真实姓名', whitespace: true },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="id"
              label="身份证号"
              rules={[
                { required: true, message: '请输入身份证号' },
                {
                  validator: (_, value) =>
                    !value || (value.length === 18 && /^\d+X?$/.test(value))
                      ? Promise.resolve()
                      : Promise.reject(new Error('请输入正确的身份证号')),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nucleic-type"
              label="检测类型"
              rules={[{ required: true, message: '请选择检测类型' }]}
            >
              <Radio.Group name="nucleic-type" options={['单检', '混检']} />
            </Form.Item>
            <Form.Item
              name="nucleic-date"
              label="检测日期"
              rules={[{ required: true, message: '请选择检测日期' }]}
            >
              <DatePicker
                disabledDate={current =>
                  current < moment().endOf('day') ||
                  current > moment().add(7, 'days').endOf('day')
                }
              />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button
                className={styles.button}
                htmlType="reset"
                type="dashed"
                shape="round"
                onClick={() => navigate(-1)}
              >
                取消
              </Button>
              <Button
                className={styles.button}
                htmlType="submit"
                type="primary"
                shape="round"
                loading={reserveLoading}
              >
                预约
              </Button>
            </Form.Item>
          </Form>
        ) : (
          '请先登录'
        )}
      </PageHeader>
      <Modal
        title="我的预约"
        footer={null}
        visible={infoVisible}
        onCancel={() => setInfoVisible(false)}
      >
        {data ? (
          <>
            <Descriptions contentStyle={{ background: '#ffffff' }} bordered>
              <Descriptions.Item label="姓名">{data.usrName}</Descriptions.Item>
              <Descriptions.Item label="身份证号">
                {data.usrId}
              </Descriptions.Item>
              <Descriptions.Item label="检测类型">
                {data.testType}
              </Descriptions.Item>
              <Descriptions.Item label="检测日期">
                {`${data.testDate[0]}-${data.testDate[1]}-${data.testDate[2]}`}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              loading={removeLoading}
              onClick={onDelete}
            >
              取消预约
            </Button>
          </>
        ) : (
          '暂无预约'
        )}
      </Modal>
    </>
  );
};

export default NucleicPage;
