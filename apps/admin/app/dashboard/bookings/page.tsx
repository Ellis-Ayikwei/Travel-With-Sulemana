'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tag,
  message,
  DatePicker,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';

interface Booking {
  _id: string;
  userId: string;
  packageId: string;
  numberOfTravelers: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`
      );
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      message.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const columns: TableColumnsType<Booking> = [
    {
      title: 'Booking ID',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => id.substring(0, 8),
    },
    {
      title: 'Travelers',
      dataIndex: 'numberOfTravelers',
      key: 'numberOfTravelers',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = {
          pending: 'orange',
          confirmed: 'blue',
          completed: 'green',
          cancelled: 'red',
        };
        // @ts-expect-error
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        // @ts-expect-error
        <Space>
          {/* @ts-expect-error */}
          <Button type="primary" size="small" icon={<EditOutlined />} />
          {/* @ts-expect-error */}
          <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  const handleAddBooking = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1>Bookings Management</h1>
        {/* @ts-expect-error */}
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBooking}>
          New Booking
        </Button>
      </div>

      {/* @ts-expect-error */}
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* @ts-expect-error */}
      <Modal
        title="Add New Booking"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleModalClose}
      >
        {/* @ts-expect-error */}
        <Form form={form} layout="vertical">
          {/* @ts-expect-error */}
          <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
            {/* @ts-expect-error */}
            <Input />
          </Form.Item>
          {/* @ts-expect-error */}
          <Form.Item name="packageId" label="Package ID" rules={[{ required: true }]}>
            {/* @ts-expect-error */}
            <Input />
          </Form.Item>
          {/* @ts-expect-error */}
          <Form.Item
            name="numberOfTravelers"
            label="Number of Travelers"
            rules={[{ required: true }]}
          >
            {/* @ts-expect-error */}
            <InputNumber min={1} />
          </Form.Item>
          {/* @ts-expect-error */}
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          {/* @ts-expect-error */}
          <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          {/* @ts-expect-error */}
          <Form.Item name="totalPrice" label="Total Price" rules={[{ required: true }]}>
            {/* @ts-expect-error */}
            <InputNumber min={0} step={100} />
          </Form.Item>
          {/* @ts-expect-error */}
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
            initialValue="pending"
          >
            {/* @ts-expect-error */}
            <Select
              options={[
                { label: 'Pending', value: 'pending' },
                { label: 'Confirmed', value: 'confirmed' },
                { label: 'Completed', value: 'completed' },
                { label: 'Cancelled', value: 'cancelled' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
