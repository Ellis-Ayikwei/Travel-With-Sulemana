// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, Form, Input, Button, Switch, Divider, message, Tabs } from 'antd';
import { SaveOutlined, LockOutlined, BellOutlined, GlobalOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { TextArea } = Input;

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [generalForm] = Form.useForm();
  const [securityForm] = Form.useForm();

  const handleGeneralSave = async (values: any) => {
    setLoading(true);
    try {
      // TODO: API call to save general settings
      console.log('General settings:', values);
      message.success('General settings saved successfully');
    } catch (error) {
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySave = async (values: any) => {
    setLoading(true);
    try {
      // TODO: API call to save security settings
      console.log('Security settings:', values);
      message.success('Password updated successfully');
      securityForm.resetFields();
    } catch (error) {
      message.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    // @ts-ignore - antd type compatibility
    <div>
      <h1>Settings</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Manage your admin account settings and preferences
      </p>

      <Tabs defaultActiveKey="general">
        <TabPane
          tab={
            <span>
              <GlobalOutlined />
              General
            </span>
          }
          key="general"
        >
          <Card>
            <Form
              form={generalForm}
              layout="vertical"
              onFinish={handleGeneralSave}
              initialValues={{
                siteName: 'Travel With Sulemana',
                siteDescription: 'Explore Ghana with us',
                contactEmail: 'info@travelwithsulemana.com',
                contactPhone: '+233 XX XXX XXXX',
                maintenanceMode: false,
                allowRegistration: true,
                emailNotifications: true,
              }}
            >
              <Form.Item
                label="Site Name"
                name="siteName"
                rules={[{ required: true, message: 'Please enter site name' }]}
              >
                <Input placeholder="Enter site name" />
              </Form.Item>

              <Form.Item
                label="Site Description"
                name="siteDescription"
                rules={[{ required: true, message: 'Please enter site description' }]}
              >
                <TextArea
                  rows={3}
                  placeholder="Brief description of your travel platform"
                />
              </Form.Item>

              <Divider />

              <Form.Item
                label="Contact Email"
                name="contactEmail"
                rules={[
                  { required: true, message: 'Please enter contact email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="contact@example.com" />
              </Form.Item>

              <Form.Item
                label="Contact Phone"
                name="contactPhone"
              >
                <Input placeholder="+233 XX XXX XXXX" />
              </Form.Item>

              <Divider />

              <Form.Item
                label="Maintenance Mode"
                name="maintenanceMode"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Allow New User Registration"
                name="allowRegistration"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Email Notifications"
                name="emailNotifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  size="large"
                >
                  Save General Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <LockOutlined />
              Security
            </span>
          }
          key="security"
        >
          <Card>
            <h3>Change Password</h3>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Update your password to keep your account secure
            </p>

            <Form
              form={securityForm}
              layout="vertical"
              onFinish={handleSecuritySave}
            >
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  { required: true, message: 'Please enter your current password' },
                ]}
              >
                <Input.Password placeholder="Enter current password" />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: 'Please enter new password' },
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  size="large"
                >
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <BellOutlined />
              Notifications
            </span>
          }
          key="notifications"
        >
          <Card>
            <h3>Notification Preferences</h3>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Choose what notifications you want to receive
            </p>

            <Form layout="vertical">
              <Form.Item label="New Booking Notifications" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item label="Payment Notifications" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item label="User Registration Notifications" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item label="Blog Comment Notifications" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item label="System Updates" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item label="Weekly Reports" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  size="large"
                >
                  Save Notification Settings
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
}
