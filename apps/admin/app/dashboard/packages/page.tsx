// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  message,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface TravelPackage {
  _id: string;
  name: string;
  destination: string;
  duration: number;
  price: number;
  maxTravelers: number;
  currentBookings: number;
  rating?: number;
}

export default function Packages() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/packages`
      );
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      message.error('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumnsType<TravelPackage> = [
    {
      title: 'Package Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration: number) => `${duration} days`,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Capacity',
      dataIndex: 'maxTravelers',
      key: 'maxTravelers',
    },
    {
      title: 'Bookings',
      dataIndex: 'currentBookings',
      key: 'currentBookings',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => rating?.toFixed(1) || 'N/A',
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

  const handleAddPackage = () => {
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
        <h1>Travel Packages</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPackage}>
          Add Package
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={packages}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Add New Package"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleModalClose}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Ghana Discovery Tour" />
          </Form.Item>
          <Form.Item name="destination" label="Destination" rules={[{ required: true }]}>
            <Input placeholder="e.g., Accra & Cape Coast" />
          </Form.Item>
          <Form.Item name="duration" label="Duration (days)" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="price" label="Price ($)" rules={[{ required: true }]}>
            <InputNumber min={0} step={100} />
          </Form.Item>
          <Form.Item name="maxTravelers" label="Max Travelers" rules={[{ required: true }]}>
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
