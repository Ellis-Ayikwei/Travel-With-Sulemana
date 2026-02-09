// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Button, Dropdown, Spin, message } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  FileTextOutlined,
  StarOutlined,
  CarOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('admin_token');
    const userData = localStorage.getItem('admin_user');
    
    if (!token || !userData) {
      router.push('/login');
    } else {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        router.push('/login');
      }
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    message.success('Logged out successfully');
    router.push('/login');
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard'),
    },
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: 'Bookings',
      onClick: () => router.push('/dashboard/bookings'),
    },
    {
      key: '3',
      icon: <ShoppingOutlined />,
      label: 'Packages',
      onClick: () => router.push('/dashboard/packages'),
    },
    {
      key: '4',
      icon: <EnvironmentOutlined />,
      label: 'Destinations',
      onClick: () => router.push('/dashboard/destinations'),
    },
    {
      key: '5',
      icon: <FileTextOutlined />,
      label: 'Blogs',
      onClick: () => router.push('/dashboard/blogs'),
    },
    {
      key: '6',
      icon: <StarOutlined />,
      label: 'Experiences',
      onClick: () => router.push('/dashboard/experiences'),
    },
    // Optional routes - uncomment if needed
    // {
    //   key: '6.5',
    //   icon: <PictureOutlined />,
    //   label: 'Carousel',
    //   onClick: () => router.push('/dashboard/carousel'),
    // },
    // {
    //   key: '8',
    //   icon: <CarOutlined />,
    //   label: 'Drivers',
    //   onClick: () => router.push('/dashboard/drivers'),
    // },
    {
      key: '7',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => router.push('/dashboard/users'),
    },
    {
      key: '9',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/dashboard/settings'),
    },
  ];

  const profileMenu: MenuProps['items'] = [
    {
      key: 'profile',
      label: user?.email || 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200}>
        <div
          style={{
            height: '64px',
            background: 'rgba(255, 255, 255, 0.2)',
            margin: '16px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Travel Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Dropdown menu={{ items: profileMenu }}>
            <Button type="text" icon={<UserOutlined />} size="large" />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            borderRadius: '6px',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
