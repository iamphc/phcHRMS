import React, { useState } from 'react'
import {Button, ButtonProps, Row, message} from 'antd'
import IconMap from '@/components/IconMap'
import '../css/SmCodeLogin.less'
import {LoginRules} from '@/utils/rules'
const MAX_LEFT_TIME = 60
import Api from '@/apis'

const SmCodeLogin: FC = ({form, FormItem, Input}) => {
  const [btnDisable, setBtnDisable] = useState(false as boolean)
  const [timerStatus, setTimerStatus] = useState(true as boolean)
  let [leftTime, setLeftTime] = useState(MAX_LEFT_TIME - 1 as number)
  const sendMsg = async () => {
    try {
      const res = await form.validateFields(['mobile'])
      const {data, msg} = await Api.sendSmCode(res)
      message.success(msg)
      setBtnDisable(true)
      setTimerStatus(false)
      runTime()
    } catch (err) {
      setBtnDisable(false)
      setTimerStatus(true)
    }
  }
  const runTime = () => {
    const callback = () => {
      if(!leftTime) {
        clearInterval(timer)
        setBtnDisable(false)
        setTimerStatus(true)
        setLeftTime(MAX_LEFT_TIME - 1)
        console.log(timerStatus)
        return
      }
      setLeftTime(leftTime --)
    }
    callback()
    const timer = setInterval(callback, 1000)
  }
  const handleChange = async () => {
    try {
      const res = await form.validateFields(['mobile'])
      setBtnDisable(false)
    } catch (err) {
      setBtnDisable(true)
    }
  }

  return (
    <>
      <FormItem name="mobile" rules={LoginRules.mobileRule} hasFeedback>
        <Input placeholder="请输入手机号" prefix={IconMap.mobileIcon} onChange={handleChange} />
      </FormItem>
      <FormItem name="code" rules={LoginRules.codeRule} hasFeedback>
        {/* 写法一 */}
        {/* <Input.Group compact>
          <Input placeholder="请输入验证码" prefix={IconMap.codeIcon} style={{width: 'calc(100% - 102px)'}} />
          <Button type="primary" onClick={sendMsg} disabled={btnDisable}>发送验证码</Button>
        </Input.Group> */}
        {/* 写法二 */}
        <Input placeholder="请输入验证码" prefix={IconMap.codeIcon} 
          addonAfter={
            <Button onClick={sendMsg} disabled={btnDisable}>
              {timerStatus ? '发送验证码' : `${leftTime}s后再次发送`}
            </Button>
          } />
      </FormItem>
    </>
  )
}

export default SmCodeLogin