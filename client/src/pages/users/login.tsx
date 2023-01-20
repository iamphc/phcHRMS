import React, { FC, useState } from 'react';
import AcountLogin from './components/AcountLogin'
import SmCodeLogin from './components/SmCodeLogin'
import {Form, Input, Row, Col, Button} from 'antd'
const FormItem = Form.Item
import './css/login.less'
import IconMap from '@/components/IconMap';

const Login: FC = () => {
  const [form] = Form.useForm()
  const [type, setType] = useState('acount')
  const submitUserInfo = (data) => {}
  const ComponentSelect = (props: any) => type === 'acount' ? <AcountLogin {...props} /> : <SmCodeLogin {...props} />
  const toggleLoginType = () => setType(type === 'acount' ? 'smCode' : 'acount')

  return (
    <div className="form">
      <div className="logo">
        {/* <img src="" alt=""/> */}
        <span>人事管理系统</span>
      </div>
      <Form form={form} onFinish={submitUserInfo}>
        {ComponentSelect({form, FormItem, Input})}
        <Row>
          <Button type="primary" className="login">登录</Button>
        </Row>
        <Row className="bottom">
          <Col span={6}>
            忘记密码?
          </Col>
          <Col span={18} onClick={toggleLoginType} className="right">
            {type === 'acount' ? '使用用户名和密码登录' : '使用短信验证码登录'}
            {IconMap.arrRowRight}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Login