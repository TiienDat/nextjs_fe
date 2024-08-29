'use client'
import React from 'react';
import { Button, Col, Divider, Form, Input, message, notification, Row } from 'antd';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';


const Verify = (props : any) => {
    const router = useRouter()
    const {id} = props
    const onFinish = async (values: any) => {
        const { _id, code }= values
        const res = await sendRequest<IBackendRes<any>>({
            url: `${process.env.NEXT_PUBLIC_URL_BACKEND}/api/v1/auth/verify-user`,
            method:"POST",
            body:{
                _id, code
            }
        })
        console.log(">>>> check res : ", res)
        if(res?.data){
            message.success("Kích hoạt tài khoản thành công")
            router.push(`/auth/login`);
        }else{
            notification.error({
                message:"Verify error",
                description:res?.message
            })
        }
        console.log(">>> check values :", values)
    };

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Vui Lòng Xác Thực Tài Khoản</legend>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Form.Item
                            label="Id"
                            name="_id"
                            hidden
                            initialValue={id}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <div>Mã xác thực đã được gửi vui lòng kiểm tra Email</div>
                        <Divider/>
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
                    <Divider />

                </fieldset>
            </Col>
        </Row>

    )
}
export default Verify;