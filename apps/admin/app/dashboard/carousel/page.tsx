<<<<<<< HEAD
=======
// @ts-nocheck
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  message,
  Space,
  Upload,
  Image as AntImage,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd';
import { API_URL } from '@/lib/api';

interface CarouselImage {
  id: string;
  imageUrl: string;
  alt: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CarouselPage() {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Fetch carousel images
  const fetchImages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/carousel/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setImages(data);
    } catch (error) {
      message.error('Failed to fetch carousel images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle save (create or update)
  const handleSave = async (values: any) => {
    try {
      const token = localStorage.getItem('adminToken');
      const imageUrl = values.imageUrl || fileList[0]?.response?.url;

      if (!imageUrl) {
        message.error('Please provide an image URL or upload an image');
        return;
      }

      const payload = {
        imageUrl,
        alt: values.alt,
        order: values.order || 0,
        active: values.active !== false,
      };

      const method = editingId ? 'PUT' : 'POST';
      const endpoint = editingId
        ? `${API_URL}/api/carousel/admin/${editingId}`
        : `${API_URL}/api/carousel/admin`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success(editingId ? 'Image updated successfully' : 'Image added successfully');
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
        setEditingId(null);
        fetchImages();
      } else {
        message.error('Failed to save image');
      }
    } catch (error) {
      message.error('Error saving image');
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this carousel image?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        try {
          const token = localStorage.getItem('adminToken');
          const response = await fetch(`${API_URL}/api/carousel/admin/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            message.success('Image deleted successfully');
            fetchImages();
          } else {
            message.error('Failed to delete image');
          }
        } catch (error) {
          message.error('Error deleting image');
        }
      },
    });
  };

  // Handle edit
  const handleEdit = (record: CarouselImage) => {
    setEditingId(record.id);
    form.setFieldsValue({
      imageUrl: record.imageUrl,
      alt: record.alt,
      order: record.order,
      active: record.active,
    });
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingId(null);
    form.resetFields();
    setFileList([]);
  };

  const columns = [
    {
      title: 'Preview',
      dataIndex: 'imageUrl',
      key: 'preview',
      width: 100,
      render: (text: string) => (
<<<<<<< HEAD
        // @ts-expect-error
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
        <AntImage src={text} alt="carousel" style={{ maxHeight: '60px' }} />
      ),
    },
    {
      title: 'Alt Text',
      dataIndex: 'alt',
      key: 'alt',
      ellipsis: true,
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      width: 80,
      render: (active: boolean) => (active ? 'Yes' : 'No'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (text: string, record: CarouselImage) => (
<<<<<<< HEAD
        // @ts-expect-error
        <Space>
          {/* @ts-expect-error */}
          <Button
            // @ts-expect-error
=======
        <Space>
          <Button
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
            size="small"
          />
<<<<<<< HEAD
          {/* @ts-expect-error */}
          <Button
            // @ts-expect-error
=======
          <Button
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Carousel Management</h1>
<<<<<<< HEAD
        {/* @ts-expect-error */}
        <Button
          type="primary"
          // @ts-expect-error
=======
        <Button
          type="primary"
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Image
        </Button>
      </div>

<<<<<<< HEAD
      {/* @ts-expect-error */}
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
      <Table
        columns={columns}
        dataSource={images}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

<<<<<<< HEAD
      {/* @ts-expect-error */}
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
      <Modal
        title={editingId ? 'Edit Carousel Image' : 'Add Carousel Image'}
        open={isModalVisible}
        onCancel={handleModalClose}
        onOk={() => form.submit()}
      >
<<<<<<< HEAD
        {/* @ts-expect-error */}
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
<<<<<<< HEAD
          {/* @ts-expect-error */}
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
          <Form.Item
            label="Image URL"
            name="imageUrl"
            rules={[{ required: false, message: 'Please enter image URL' }]}
            tooltip="Either upload an image or provide a URL"
          >
<<<<<<< HEAD
            {/* @ts-expect-error */}
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          {/* @ts-expect-error */}
=======
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
          <Form.Item label="Or Upload Image">
            <Upload
              maxCount={1}
              fileList={fileList}
              onChange={(info) => setFileList(info.fileList)}
              beforeUpload={() => false}
            >
<<<<<<< HEAD
              {/* @ts-expect-error */}
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
              <Button>Select Image</Button>
            </Upload>
          </Form.Item>

<<<<<<< HEAD
          {/* @ts-expect-error */}
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
          <Form.Item
            label="Alt Text"
            name="alt"
            rules={[{ required: true, message: 'Please enter alt text' }]}
          >
<<<<<<< HEAD
            {/* @ts-expect-error */}
            <Input placeholder="Describing the image for accessibility" />
          </Form.Item>

          {/* @ts-expect-error */}
=======
            <Input placeholder="Describing the image for accessibility" />
          </Form.Item>

>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
          <Form.Item
            label="Order"
            name="order"
            initialValue={0}
          >
<<<<<<< HEAD
            {/* @ts-expect-error */}
            <InputNumber min={0} />
          </Form.Item>

          {/* @ts-expect-error */}
=======
            <InputNumber min={0} />
          </Form.Item>

>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
          <Form.Item
            label="Active"
            name="active"
            valuePropName="checked"
            initialValue={true}
          >
<<<<<<< HEAD
            {/* @ts-expect-error */}
=======
>>>>>>> 47b07d669aa6b92cd2509c6b42730bdd3cb8c4f6
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
