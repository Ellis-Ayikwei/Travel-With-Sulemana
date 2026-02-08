// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  license: string;
  vehicle: string;
  status: 'active' | 'inactive' | 'suspended';
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/drivers');
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      message.error('Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumnsType<Driver> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'License',
      dataIndex: 'license',
      key: 'license',
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button type="primary" size="small" icon={<EditOutlined />} />
          <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const handleAddDriver = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    // @ts-ignore - antd type compatibility
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1>Drivers Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDriver}>
          Add Driver
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={drivers}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Add New Driver"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleModalClose}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="license" label="License" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="vehicle" label="Vehicle" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
