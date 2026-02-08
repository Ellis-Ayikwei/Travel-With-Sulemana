'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Checkbox, Space, Tag, Popconfirm, Spin, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { API_URL } from '@/lib/api';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string;
  featured: boolean;
  readTime: number;
  published: boolean;
  date: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/blogs`);
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error('Failed to fetch blogs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (blog?: BlogPost) => {
    if (blog) {
      setEditingId(blog._id);
      form.setFieldsValue({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        author: blog.author,
        image: blog.image,
        featured: blog.featured,
        readTime: blog.readTime,
        published: blog.published,
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    form.resetFields();
  };

  const handleSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingId ? `${API_URL}/api/blogs/${editingId}` : `${API_URL}/api/blogs`;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success(editingId ? 'Blog updated successfully' : 'Blog created successfully');
        handleCloseModal();
        fetchBlogs();
      } else {
        message.error('Failed to save blog');
      }
    } catch (error) {
      message.error('Error saving blog');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        message.success('Blog deleted successfully');
        fetchBlogs();
      } else {
        message.error('Failed to delete blog');
      }
    } catch (error) {
      message.error('Error deleting blog');
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (text: string) => React.createElement(Tag as any, { color: 'default' }, text),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 120,
    },
    {
      title: 'Read Time',
      dataIndex: 'readTime',
      key: 'readTime',
      width: 100,
      render: (time: number) => `${time} min`,
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      width: 100,
      render: (featured: boolean) => featured ? React.createElement(Tag as any, { color: 'blue' }, 'Yes') : React.createElement(Tag as any, { color: 'default' }, 'No'),
    },
    {
      title: 'Status',
      dataIndex: 'published',
      key: 'published',
      width: 100,
      render: (published: boolean) => React.createElement(Tag as any, { color: published ? 'green' : 'red' }, published ? 'Published' : 'Draft'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: BlogPost) => React.createElement(Space as any, {}, 
        React.createElement(Button as any, { type: 'primary', size: 'small', icon: React.createElement(EditOutlined as any), onClick: () => handleOpenModal(record) }),
        React.createElement(Popconfirm as any, { title: 'Delete blog post', description: 'Are you sure you want to delete this blog post?', onConfirm: () => handleDelete(record._id), okText: 'Yes', cancelText: 'No' }, 
          React.createElement(Button as any, { type: 'primary', danger: true, size: 'small', icon: React.createElement(DeleteOutlined as any) })
        )
      ),
    },
  ];

  return (
    // @ts-ignore - antd type compatibility
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          {/* @ts-expect-error */}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
            New Blog Post
          </Button>
        </div>

        {/* @ts-expect-error */}
        <Spin spinning={loading}>
          {/* @ts-expect-error */}
          <Table
            columns={columns}
            dataSource={blogs}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        </Spin>

        {/* @ts-expect-error */}
        <Modal
          title={editingId ? 'Edit Blog Post' : 'Create Blog Post'}
          open={isModalOpen}
          onOk={() => form.submit()}
          onCancel={handleCloseModal}
          width={800}
        >
          {/* @ts-expect-error */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* @ts-expect-error */}
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please enter title' }]}
            >
              {/* @ts-expect-error */}
              <Input placeholder="Blog post title" />
            </Form.Item>

            {/* @ts-expect-error */}
            <Form.Item
              label="Excerpt"
              name="excerpt"
              rules={[{ required: true, message: 'Please enter excerpt' }]}
            >
              {/* @ts-expect-error */}
              <Input.TextArea placeholder="Brief excerpt" rows={2} />
            </Form.Item>

            {/* @ts-expect-error */}
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please enter content' }]}
            >
              {/* @ts-expect-error */}
              <Input.TextArea placeholder="Full blog content" rows={6} />
            </Form.Item>

            {/* @ts-expect-error */}
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              {/* @ts-expect-error */}
              <Select>
                {/* @ts-expect-error */}
                <Select.Option value="Travel Tips">Travel Tips</Select.Option>
                {/* @ts-expect-error */}
                <Select.Option value="Guide">Guide</Select.Option>
                {/* @ts-expect-error */}
                <Select.Option value="Culture">Culture</Select.Option>
                {/* @ts-expect-error */}
                <Select.Option value="Adventure">Adventure</Select.Option>
                {/* @ts-expect-error */}
                <Select.Option value="Food">Food</Select.Option>
                {/* @ts-expect-error */}
                <Select.Option value="Photography">Photography</Select.Option>
                {/* @ts-expect-error */}
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>

            {/* @ts-expect-error */}
            <Form.Item label="Author" name="author">
              {/* @ts-expect-error */}
              <Input placeholder="Author name" defaultValue="Sulemana" />
            </Form.Item>

            {/* @ts-expect-error */}
            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ required: true, message: 'Please enter image URL' }]}
            >
              {/* @ts-expect-error */}
              <Input placeholder="https://..." />
            </Form.Item>

            {/* @ts-expect-error */}
            <Form.Item
              label="Read Time (minutes)"
              name="readTime"
              rules={[{ required: true, message: 'Please enter read time' }]}
            >
              {/* @ts-expect-error */}
              <Input type="number" placeholder="5" />
            </Form.Item>

            <div className="flex gap-4">
              {/* @ts-expect-error */}
              <Form.Item label="Featured" name="featured" valuePropName="checked">
                {/* @ts-expect-error */}
                <Checkbox />
              </Form.Item>

              {/* @ts-expect-error */}
              <Form.Item label="Published" name="published" valuePropName="checked">
                {/* @ts-expect-error */}
                <Checkbox />
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
  );
}
