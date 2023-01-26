import React, { FC, useState } from 'react';
import AccountLogin from './components/AccountLogin'
import SmCodeLogin from './components/SmCodeLogin'
import {Form, Input, Row, Col, Button, message} from 'antd'
const FormItem = Form.Item
import './css/forgetPassword.less'
import {useSelector} from 'umi';
import IconMap from '@/components/IconMap'
import UpdatePassword from './components/UpdatePassword';
import Api from '@/apis'

const ForgetPassword: FC = ({history}) => {
  const [canIReset, setCanIReset] = useState(false)
  const [form] = Form.useForm()
  const loading = useSelector(state => state.loading)
  const handleSubmit = (data) => canIReset ? resetPassword(data) : checkSmCode(data)
  const ComponentSelect = (props: any) => canIReset ? <UpdatePassword {...props} /> :<SmCodeLogin {...props} />
  const back = () => history.replace(`/users/login`)
  const checkSmCode = async (data) => {
    const {code} = data;
    if (!code) return
    try {
      const res = await Api.checkSmCode({smCode: code})
      setCanIReset(true)
    } catch(err) {
      console.log(err)
    } finally {
      form.resetFields()
    }
  }
  const resetPassword = async (data) => {
    const {password} = data
    if (!password) return
    try {
      const res = await Api.resetPassword({newPassword: password})
      history.push('/users/login')
      message.success('密码修改成功')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="form">
      <Form form={form} onFinish={handleSubmit}>
        <Row className="head" onClick={back}>
          <h2 className="forget-password">{!canIReset?'忘记密码':'重置密码'}</h2>
          {IconMap.arrRowLeft}
        </Row>
        {ComponentSelect({form, FormItem, Input})}
        <Row>
          <Button type="primary" 
          className="login" 
          htmlType="submit" 
          loading={loading.effects['user/login']}
          onClick={handleSubmit}>{!canIReset?'提交':'重置'}</Button>
        </Row>
      </Form>
    </div>
  )
}

export default ForgetPassword