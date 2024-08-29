'use client'
import { Modal, Steps,Button, message, notification, Row, Divider, Form, Input } from 'antd';
import { useHasMounted } from '@/utils/customHook';
import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';


const ModalReactive = (props:any) => {
    const router = useRouter()
    const {setIsModalOpen,email,isModalOpen} = props
    const [current, setCurrent] = useState(0);
    const [userId, setUserId] = useState("");
    const [codeId, setCodeId] = useState("");
    const hasMounted = useHasMounted();
    if(!hasMounted) return <></>

    const onFinishRetryActive = async () => {
        const {email} = props
        console.log("check values",props )
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/v1/auth/retry-active`,
            method:"POST",
            body:{
                email
            } 
        })
        if(res?.data){
            message.success("Mã kích hoạt đã được gửi vui lòng kiểm tra Email")
            setCurrent(1)
            setUserId(res?.data?._id)
        }else{
            notification.error({
                message:"server error retry",
                description:res?.message
            })
        }
    };
    const onFinishRetryVerify = async (values : any) => {
        const {code} = values
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/v1/auth/verify-user`,
            method:"POST",
            body:{
                _id:userId,
                code
            }
        })
        console.log("check values",code )
        if(res?.data){
            message.success("kích hoạt tài khoản thành công")
            setCurrent(2)
        }else{
            notification.error({
                message:"server error retry",
                description:res?.message
            })
        }
    };
    
    return(
        <>
      <Modal title="Tài khoản chưa được xác thực"
       open={isModalOpen}
       maskClosable={false}
       onCancel={()=>{setIsModalOpen(false)}}
       footer={null}
       >
        <Steps
        current={current}
    items={[
      {
        title: 'Login',
        icon: <UserOutlined />,
      },
      {
        title: 'Verification',
        // status: 'finish',
        icon: <SolutionOutlined />,
      },
      {
        title: 'Done',
        // status: 'wait',
        icon: <SmileOutlined />,
      },
    ]}
  />
        {current === 0 &&
        <div>
            <p>Tài khoản chưa được kích hoạt</p>
            <br />
            <input type="text" value={email} disabled />
            <br />
            <br />
            <Button type="primary" htmlType="submit" onClick={onFinishRetryActive}>Resend</Button>
        </div>
        }
        {current === 1 &&
        <div>
            <p>Vui lòng nhập mã kích hoạt</p>
            <Divider/>
                    <Form
                        name="basic"
                        onFinish={onFinishRetryVerify}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Code!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        </Form>
                        
        </div>
        }
                {current === 2 &&
        <div>
            <Divider/>
            <p>Kích hoạt tài khoản thành công, Vui lòng đăng nhập lại.</p>
        </div>
        }
      </Modal>
    </>
    )
};
export default ModalReactive;