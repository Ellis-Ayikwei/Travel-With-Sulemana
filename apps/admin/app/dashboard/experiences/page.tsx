// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, InputNumber, Space, Tag, Popconfirm, Spin, message, Tabs, Checkbox, Input as AntInput } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { API_URL } from '@/lib/api';

interface Experience {
  _id: string;
  name: string;
  category: string;
  region: string;
  description: string;
  longDescription?: string;
  aboutExpedition?: string;
  startDate: string;
  duration: string;
  groupSize: string;
  price: number;
  availability: number;
  tag: string;
  highlights: string[];
  thingsToDo?: string[];
  itinerary?: string[];
  inclusions?: string[];
  testimonials?: Array<{name: string; text: string; rating: number}>;
  howToGetThere?: string;
  whereToStay?: string[];
  localTips?: string[];
  gallery?: string[];
  image: string;
  rating?: number;
  reviews?: number;
  destinationIds?: string[];
  published: boolean;
}

interface Destination {
  id: string;
  name: string;
}

const destinations: Destination[] = [
  { id: 'mole', name: 'Mole National Park' },
  { id: 'larabanga', name: 'Larabanga Mosque' },
  { id: 'salaga', name: 'Salaga Slave Wells' },
  { id: 'cape-coast', name: 'Cape Coast Castle' },
];

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/experiences`);
      const data = await response.json();
      setExperiences(Array.isArray(data) ? data : []);
    } catch (error) {
      message.error('Failed to fetch experiences');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (experience?: Experience) => {
    if (experience) {
      setEditingId(experience._id);
      form.setFieldsValue({
        name: experience.name,
        category: experience.category,
        region: experience.region,
        description: experience.description,
        longDescription: experience.longDescription,
        aboutExpedition: experience.aboutExpedition,
        rating: experience.rating,
        reviews: experience.reviews,
        tag: experience.tag,
        startDate: experience.startDate,
        duration: experience.duration,
        groupSize: experience.groupSize,
        price: experience.price,
        availability: experience.availability,
        itinerary: experience.itinerary?.join('\n') || '',
        inclusions: experience.inclusions?.join('\n') || '',
        testimonials: experience.testimonials || [],
        whereToStay: experience.whereToStay?.join('\n') || '',
        image: experience.image,
        gallery: experience.gallery?.join('\n') || '',
        destinationIds: experience.destinationIds || [],
        published: experience.published,
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
      const url = editingId
        ? `${API_URL}/api/experiences/${editingId}`
        : `${API_URL}/api/experiences`;
      const method = editingId ? 'PUT' : 'POST';

      const payload = {
        name: values.name,
        category: values.category,
        region: values.region,
        description: values.description,
        longDescription: values.longDescription,
        aboutExpedition: values.aboutExpedition,
        rating: values.rating || 4.8,
        reviews: values.reviews || 0,
        tag: values.tag,
        startDate: values.startDate,
        duration: values.duration,
        groupSize: values.groupSize,
        price: values.price,
        availability: values.availability,
        itinerary: values.itinerary ? values.itinerary.split('\n').map((i: string) => i.trim()).filter((i: string) => i) : [],
        inclusions: values.inclusions ? values.inclusions.split('\n').map((i: string) => i.trim()).filter((i: string) => i) : [],
        testimonials: values.testimonials || [],
        whereToStay: values.whereToStay ? values.whereToStay.split('\n').map((w: string) => w.trim()).filter((w: string) => w) : [],
        image: values.image,
        gallery: values.gallery ? values.gallery.split('\n').map((g: string) => g.trim()).filter((g: string) => g) : [],
        destinationIds: values.destinationIds || [],
        published: values.published || false,
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
        message.success(editingId ? 'Experience updated successfully' : 'Experience created successfully');
        handleCloseModal();
        fetchExperiences();
      } else {
        message.error('Failed to save experience');
      }
    } catch (error) {
      message.error('Error saving experience');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/api/experiences/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        message.success('Experience deleted successfully');
        fetchExperiences();
      } else {
        message.error('Failed to delete experience');
      }
    } catch (error) {
      message.error('Error deleting experience');
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (text: string) => (
        // @ts-expect-error
        <Tag>{text}</Tag>
      ),
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      width: 120,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Available',
      dataIndex: 'availability',
      key: 'availability',
      width: 100,
    },
    {
      title: 'Destinations',
      dataIndex: 'destinationIds',
      key: 'destinationIds',
      width: 150,
      render: (ids: string[]) => (
        // @ts-expect-error
        <>
          {ids && ids.length > 0 ? (
            ids.slice(0, 2).map((id) => {
              const dest = destinations.find((d) => d.id === id);
              // @ts-expect-error
              return <Tag key={id}>{dest?.name.split(' ')[0]}</Tag>;
            })
          ) : (
            <span className="text-gray-400">Not mapped</span>
          )}
          {/* @ts-expect-error */}
          {ids && ids.length > 2 && <Tag>+{ids.length - 2}</Tag>}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'published',
      key: 'published',
      width: 100,
      render: (published: boolean) => (
        // @ts-expect-error
        <Tag color={published ? 'green' : 'red'}>{published ? 'Published' : 'Draft'}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Experience) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal(record)}
          />
          <Popconfirm
            title="Delete experience"
            description="Are you sure you want to delete this experience?"
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
            label="Experience Name"
            name="name"
            rules={[{ required: true, message: 'Please enter experience name' }]}
          >
            <Input placeholder="e.g., Northern Ghana Safari Explorer" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Select>
              <Select.Option value="Adventure">Adventure</Select.Option>
              <Select.Option value="Culture">Culture</Select.Option>
              <Select.Option value="History">History</Select.Option>
              <Select.Option value="Leisure">Leisure</Select.Option>
              <Select.Option value="Creative">Creative</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Photography">Photography</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Region"
            name="region"
            rules={[{ required: true, message: 'Please enter region' }]}
          >
            <Input placeholder="e.g., Northern Ghana" />
          </Form.Item>

          <Form.Item
            label="Tag/Theme"
            name="tag"
            rules={[{ required: true, message: 'Please enter tag' }]}
          >
            <Input placeholder="e.g., Wildlife & Safari" />
          </Form.Item>

          <Form.Item
            label="Short Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea 
              placeholder="Brief engaging description for experience cards and listings" 
              rows={2} 
            />
          </Form.Item>

          <Form.Item
            label="Long Description"
            name="longDescription"
          >
            <Input.TextArea 
              placeholder="Detailed overview for the experience detail page" 
              rows={4} 
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Duration"
              name="duration"
              rules={[{ required: true, message: 'Please enter duration' }]}
            >
              <Input placeholder="e.g., 7 Days / 6 Nights" />
            </Form.Item>

            <Form.Item
              label="Group Size"
              name="groupSize"
              rules={[{ required: true, message: 'Please enter group size' }]}
            >
              <Input placeholder="e.g., 8-12 Guests" />
            </Form.Item>

            <Form.Item
              label="Price (per person)"
              name="price"
              rules={[{ required: true, message: 'Please enter price' }]}
            >
              <InputNumber placeholder="0" min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Availability"
              name="availability"
              rules={[{ required: true, message: 'Please enter availability' }]}
            >
              <InputNumber placeholder="Spots available" min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Please enter start date' }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
            >
              <InputNumber min={0} max={5} step={0.1} defaultValue={4.8} />
            </Form.Item>
          </div>

          <Form.Item
            label="Number of Reviews"
            name="reviews"
          >
            <InputNumber min={0} defaultValue={0} />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'journey',
      label: 'The Journey',
      children: (
        <>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <p className="text-sm text-blue-900">
              <strong>The Journey:</strong> Describe the day-by-day itinerary or journey highlights. 
              Enter one item per line (e.g., "Day 1: Arrival in Accra and transfer to hotel").
            </p>
          </div>

          <Form.Item
            label="Itinerary / Journey (one per line)"
            name="itinerary"
          >
            <Input.TextArea
              placeholder="Day 1: Arrival in Accra and welcome dinner&#10;Day 2: Drive to Kumasi via Aburi Botanical Gardens&#10;Day 3: Visit Manhyia Palace and Kejetia Market&#10;Day 4: Journey to Mole National Park"
              rows={8}
            />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'inclusions',
      label: 'Inclusions',
      children: (
        <>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <p className="text-sm text-blue-900">
              <strong>Inclusions:</strong> What's included in the experience price? 
              List one item per line (e.g., "All meals (breakfast, lunch, dinner)").
            </p>
          </div>

          <Form.Item
            label="What's Included (one per line)"
            name="inclusions"
          >
            <Input.TextArea
              placeholder="All accommodation (hotels/lodges)&#10;All meals (breakfast, lunch, dinner)&#10;Airport transfers and ground transportation&#10;Professional safari guide&#10;Park entrance fees&#10;Bottled water throughout the trip"
              rows={8}
            />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'accommodations',
      label: 'Accommodations',
      children: (
        <>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <p className="text-sm text-blue-900">
              <strong>Accommodations:</strong> Where will guests stay during this experience? 
              One accommodation per line.
            </p>
          </div>

          <Form.Item
            label="Where to Stay (one per line)"
            name="whereToStay"
          >
            <Input.TextArea
              placeholder="Mole Motel - Inside the park with stunning savannah views&#10;Zaina Lodge - Luxury eco-lodge near park entrance&#10;Larabanga Village Guesthouse - Traditional northern hospitality"
              rows={6}
            />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'stories',
      label: 'Guest Stories',
      children: (
        <>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <p className="text-sm text-blue-900">
              <strong>Guest Stories:</strong> Add testimonials from past travelers. 
              Click "Add Testimonial" to create new entries.
            </p>
          </div>

          <Form.List name="testimonials">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key} className="bg-gray-50 p-4 rounded mb-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-700">Testimonial {index + 1}</h4>
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      >
                        Remove
                      </Button>
                    </div>

                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Guest Name & Location"
                      rules={[{ required: true, message: 'Please enter guest name' }]}
                    >
                      <Input placeholder="e.g., Sarah M., USA" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      label="Testimonial"
                      rules={[{ required: true, message: 'Please enter testimonial text' }]}
                    >
                      <Input.TextArea
                        placeholder="Share what the guest loved about their experience..."
                        rows={3}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'rating']}
                      label="Rating"
                      rules={[{ required: true, message: 'Please select rating' }]}
                      initialValue={5}
                    >
                      <InputNumber
                        min={1}
                        max={5}
                        step={0.5}
                        placeholder="5"
                        style={{ width: '100px' }}
                      />
                    </Form.Item>
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Testimonial
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </>
      ),
    },
    {
      key: 'about',
      label: 'About the Expedition',
      children: (
        <>
          <div className="bg-blue-50 p-4 rounded mb-4">
            <p className="text-sm text-blue-900">
              <strong>About the Expedition:</strong> Provide comprehensive details about the experience, 
              what makes it special, difficulty level, what to expect, etc.
            </p>
          </div>

          <Form.Item
            label="About This Experience"
            name="aboutExpedition"
          >
            <Input.TextArea
              placeholder="Experience the thrill of encountering elephants, antelopes, and exotic bird species in their natural habitat. This journey takes you deep into the heart of the savannah for an authentic wildlife immersion.

This carefully curated expedition combines wildlife encounters with cultural experiences, offering you a complete picture of Northern Ghana's rich heritage. You'll visit ancient mosques, traditional villages, and witness centuries-old customs alongside your safari adventures.

Perfect for nature enthusiasts, photographers, and cultural explorers seeking an authentic African adventure off the beaten path."
              rows={10}
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
            <Input placeholder="/assets/images/experience.jpg" />
          </Form.Item>

          <Form.Item
            label="Gallery Images (one per line)"
            name="gallery"
          >
            <Input.TextArea
              placeholder="/assets/images/safari1.jpg&#10;/assets/images/safari2.jpg&#10;/assets/images/safari3.jpg"
              rows={5}
            />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'destinations',
      label: 'Map to Destinations',
      children: (
        <>
          <Form.Item
            label="Linked Destinations"
            name="destinationIds"
            help="Select which destinations this experience visits or is available at"
          >
            <Checkbox.Group>
              {destinations.map((dest) => (
                <div key={dest.id} style={{ marginBottom: '8px' }}>
                  <Checkbox value={dest.id}>{dest.name}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <div className="bg-blue-50 p-4 rounded mt-4">
            <p className="text-sm text-blue-900">
              <strong>Info:</strong> Map this experience to destinations it includes or visits. 
              When users view these destination pages, they'll see this experience as a booking option.
            </p>
          </div>
        </>
      ),
    },
  ];


  return (
    // @ts-ignore - antd type compatibility
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experiences Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
          New Experience
        </Button>
      </div>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={experiences}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Spin>

      <Modal
        title={editingId ? 'Edit Experience' : 'Create Experience'}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCloseModal}
        width={900}
        style={{ maxHeight: '90vh' }}
      >
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Tabs items={tabItems} />

            <Form.Item
              label="Published"
              name="published"
              valuePropName="checked"
              style={{ marginTop: '20px' }}
            >
              <Checkbox>Publish this experience</Checkbox>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
