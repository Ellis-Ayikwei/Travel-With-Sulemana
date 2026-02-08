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
  Tabs,
  InputNumber,
  Checkbox,
  Popconfirm,
  Tag,
  Spin,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { API_URL } from '@/lib/api';

interface Destination {
  _id: string;
  slug: string;
  name: string;
  region: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  image: string;
  gallery?: string[];
  highlights?: string[];
  duration?: string;
  bestTime?: string;
  thingsToDo?: string[];
  howToGetThere?: string;
  whereToStay?: string[];
  localTips?: string[];
  estimatedCost?: string;
  rating?: number;
  reviews?: number;
  experienceIds?: string[];
}

interface Experience {
  id: string;
  name: string;
}

const availableExperiences: Experience[] = [
  { id: '1', name: 'Northern Ghana Safari Explorer' },
  { id: '2', name: 'Cape Coast Historical Journey' },
  { id: '3', name: 'Kakum & Waterfall Adventure' },
  { id: '4', name: 'West Coast Cultural Experience' },
];

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/destinations`);
      const data = await response.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error('Failed to fetch destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (destination?: Destination) => {
    if (destination) {
      setEditingId(destination._id);
      form.setFieldsValue({
        slug: destination.slug,
        name: destination.name,
        region: destination.region,
        tagline: destination.tagline,
        description: destination.description,
        longDescription: destination.longDescription,
        image: destination.image,
        gallery: destination.gallery?.join('\n') || '',
        highlights: destination.highlights?.join(', ') || '',
        duration: destination.duration,
        bestTime: destination.bestTime,
        thingsToDo: destination.thingsToDo?.join('\n') || '',
        howToGetThere: destination.howToGetThere,
        whereToStay: destination.whereToStay?.join('\n') || '',
        localTips: destination.localTips?.join('\n') || '',
        estimatedCost: destination.estimatedCost,
        rating: destination.rating,
        reviews: destination.reviews,
        experienceIds: destination.experienceIds || [],
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingId(null);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingId
        ? `${API_URL}/api/destinations/${editingId}`
        : `${API_URL}/api/destinations`;
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        slug: values.slug,
        name: values.name,
        region: values.region,
        tagline: values.tagline,
        description: values.description,
        longDescription: values.longDescription,
        image: values.image,
        gallery: values.gallery ? values.gallery.split('\n').map((g: string) => g.trim()).filter((g: string) => g) : [],
        highlights: values.highlights ? values.highlights.split(',').map((h: string) => h.trim()).filter((h: string) => h) : [],
        duration: values.duration,
        bestTime: values.bestTime,
        thingsToDo: values.thingsToDo ? values.thingsToDo.split('\n').map((t: string) => t.trim()).filter((t: string) => t) : [],
        howToGetThere: values.howToGetThere,
        whereToStay: values.whereToStay ? values.whereToStay.split('\n').map((w: string) => w.trim()).filter((w: string) => w) : [],
        localTips: values.localTips ? values.localTips.split('\n').map((t: string) => t.trim()).filter((t: string) => t) : [],
        estimatedCost: values.estimatedCost,
        rating: values.rating || 4.8,
        reviews: values.reviews || 0,
        experienceIds: values.experienceIds || [],
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success(editingId ? 'Destination updated successfully' : 'Destination created successfully');
        handleModalClose();
        fetchDestinations();
      } else {
        message.error('Failed to save destination');
      }
    } catch (error) {
      message.error('Error saving destination');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/api/destinations/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        message.success('Destination deleted successfully');
        fetchDestinations();
      } else {
        message.error('Failed to delete destination');
      }
    } catch (error) {
      message.error('Error deleting destination');
      console.error(error);
    }
  };

  const columns: TableColumnsType<Destination> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      width: 150,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      width: 120,
      render: (slug: string) => (
        <Tag>{slug}</Tag>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 80,
      render: (rating: number) => rating?.toFixed(1) || 'N/A',
    },
    {
      title: 'Experiences',
      dataIndex: 'experienceIds',
      key: 'experienceIds',
      width: 120,
      render: (ids: string[]) => (
        <>
          {ids && ids.length > 0 ? (
            <Tag>{ids.length} linked</Tag>
          ) : (
            <span className="text-gray-400">None</span>
          )}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_: any, record: Destination) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title="Delete destination"
            description="Are you sure you want to delete this destination?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'overview',
      label: 'Overview',
      children: (
        <>
          <Form.Item
            label="Slug (URL ID)"
            name="slug"
            rules={[{ required: true, message: 'Please enter slug' }]}
            help="e.g., mole, cape-coast, larabanga"
          >
            <Input placeholder="mole" />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter destination name' }]}
          >
            <Input placeholder="e.g., Mole National Park" />
          </Form.Item>

          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: 'Please enter region' }]}
          >
            <Input placeholder="e.g., Northern Ghana" />
          </Form.Item>

          <Form.Item label="Tagline" name="tagline">
            <Input placeholder="e.g., Ghana's Premier Wildlife Safari Destination" />
          </Form.Item>

          <Form.Item
            label="Short Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea placeholder="Brief description for listings" rows={2} />
          </Form.Item>

          <Form.Item label="Long Description" name="longDescription">
            <Input.TextArea placeholder="Detailed description for detail page" rows={4} />
          </Form.Item>

          <Form.Item label="Duration" name="duration">
            <Input placeholder="e.g., 2-3 days, Half day" />
          </Form.Item>

          <Form.Item label="Best Time to Visit" name="bestTime">
            <Input placeholder="e.g., November - April (Dry season)" />
          </Form.Item>

          <Form.Item label="Estimated Cost" name="estimatedCost">
            <Input placeholder="e.g., $150-300 per person for 2 days" />
          </Form.Item>

          <Form.Item label="Rating" name="rating">
            <InputNumber min={0} max={5} step={0.1} defaultValue={4.8} />
          </Form.Item>

          <Form.Item label="Number of Reviews" name="reviews">
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'activities',
      label: 'Things to Do',
      children: (
        <>
          <Form.Item label="Highlights (comma separated)" name="highlights">
            <Input.TextArea
              placeholder="Elephant Safari, Bird Watching, Canopy Walkways, Nature Walks"
              rows={2}
            />
          </Form.Item>

          <Form.Item label="Things to Do (one per line)" name="thingsToDo">
            <Input.TextArea
              placeholder="Morning walking safaris with armed rangers&#10;Evening game drives to spot wildlife&#10;Visit the museum to learn about park ecology"
              rows={5}
            />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'practical',
      label: 'Practical Info',
      children: (
        <>
          <Form.Item label="How to Get There" name="howToGetThere">
            <Input.TextArea
              placeholder="Detailed directions and transportation options"
              rows={3}
            />
          </Form.Item>

          <Form.Item label="Where to Stay (one per line)" name="whereToStay">
            <Input.TextArea
              placeholder="Mole Motel - Inside the park with stunning views&#10;Zaina Lodge - Luxury eco-lodge near park entrance"
              rows={3}
            />
          </Form.Item>

          <Form.Item label="Local Tips (one per line)" name="localTips">
            <Input.TextArea
              placeholder="Book walking safaris in advance, especially during peak season&#10;Bring binoculars for wildlife viewing&#10;Wear neutral colors (khaki, green, brown)"
              rows={4}
            />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'gallery',
      label: 'Gallery & Media',
      children: (
        <>
          <Form.Item
            label="Primary Image URL"
            name="image"
            rules={[{ required: true, message: 'Please enter primary image URL' }]}
          >
            <Input placeholder="/assets/images/mole.jpg" />
          </Form.Item>

          <Form.Item label="Gallery Images (one per line)" name="gallery">
            <Input.TextArea
              placeholder="/assets/images/mole.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
              rows={4}
            />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'experiences',
      label: 'Link Experiences',
      children: (
        <>
          <Form.Item
            label="Available Experiences"
            name="experienceIds"
            help="Select which experiences include this destination"
          >
            <Checkbox.Group>
              {availableExperiences.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '8px' }}>
                  <Checkbox value={exp.id}>{exp.name}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <div className="bg-blue-50 p-4 rounded mt-4">
            <p className="text-sm text-blue-900">
              <strong>Info:</strong> These are the experiences that will show this destination
              in their itinerary. The relationship is bidirectional - destinations can also
              show linked experiences.
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    // @ts-ignore - antd type compatibility
    <div className="p-6">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <h1 className="text-3xl font-bold">Destinations Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          Add Destination
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={destinations}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Spin>

      <Modal
        title={editingId ? 'Edit Destination' : 'Create Destination'}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleModalClose}
        width={900}
        style={{ maxHeight: '90vh' }}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Tabs items={tabItems} />
          </Form>
        </div>
      </Modal>
    </div>
  );
}
