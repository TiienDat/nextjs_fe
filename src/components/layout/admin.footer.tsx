'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                TiienDat ©{new Date().getFullYear()} Created by @TiienDat
            </Footer>
        </>
    )
}

export default AdminFooter;