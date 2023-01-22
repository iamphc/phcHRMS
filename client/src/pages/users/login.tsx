import React, { FC, useState } from 'react';
import AccountLogin from './components/AccountLogin'
import SmCodeLogin from './components/SmCodeLogin'
import {Form, Input, Row, Col, Button} from 'antd'
const FormItem = Form.Item
import './css/login.less'
import IconMap from '@/components/IconMap';
import {useDispatch, useSelector} from 'umi';
const LOGIN_TYPE = { 'account': 0, 'smCode': 1 }

type LoginType = 'account' | 'smCode'

const Login: FC = () => {
  const [form] = Form.useForm()
  const [type, setType] = useState('account' as LoginType)
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
  console.log(loading)
  const submitUserInfo = (data) => {
    dispatch({
      type: 'user/login',
      payload: { 
        ...data, 
        type: LOGIN_TYPE[type]
      }
    })
  }
  const ComponentSelect = (props: any) => type === 'account' ? <AccountLogin {...props} /> : <SmCodeLogin {...props} />
  const toggleLoginType = () => setType(type === 'account' ? 'smCode' : 'account')

  return (
    <div className="form">
      <div className="logo">
        {/* <img src="" alt=""/> */}
        <span>人事管理系统</span>
      </div>
      <Form form={form} onFinish={submitUserInfo}>
        {ComponentSelect({form, FormItem, Input})}
        <Row>
          <Button type="primary" className="login" htmlType="submit" loading={loading.effects['user/login']}>登录</Button>
        </Row>
        <Row className="bottom">
          <Col span={6}>
            忘记密码 ?
          </Col>
          <Col span={18} onClick={toggleLoginType} className="right">
            {type === 'account' ? '使用短信验证码登录' : '使用用户名和密码登录'}
            {IconMap.arrRowRight}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Login