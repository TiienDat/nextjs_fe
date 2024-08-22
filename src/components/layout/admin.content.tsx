"use client"
import DashboardPage from '@/app/(admin)/dashboard/page';
import { Layout } from 'antd';
const AdminContent = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)=>{
    const { Content } = Layout;
    return(
        <Content style={{ margin: '24px 16px 0' }}>
        <div
            style={{
            padding: 24,
            minHeight: 360,
            background: "#ccc",
            borderRadius: "#ccc",
            }}
        >
            <DashboardPage/>
        </div>
    </Content>
    )
}
export default AdminContent;