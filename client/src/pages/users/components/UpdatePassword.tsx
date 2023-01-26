import React, { useState } from 'react'
import {Button, ButtonProps, Row, message} from 'antd'
import IconMap from '@/components/IconMap'
import '../css/SmCodeLogin.less'
import {LoginRules} from '@/utils/rules'

const UpdatePassword: FC = ({form, FormItem, Input}) => {
  const confirmPassword = {
    validator: (rules, val) => {
      return new Promise((resolve, reject) => {
        const firstPassword = form.getFieldValue('password');
        firstPassword === val ? resolve() :  reject('密码不一致')
      })
    }
  }
  return (
    <>
      <FormItem name="password" rules={LoginRules.passwordRule} hasFeedback>
        <Input placeholder="请输入密码" prefix={IconMap.passwordIcon} />
      </FormItem>
      <FormItem name="passwordAgain" rules={[...LoginRules.passwordAgainRule, confirmPassword]} hasFeedback>
        <Input placeholder="再次输入密码" prefix={IconMap.passwordIcon} />
      </FormItem>
    </>
  )
}

export default UpdatePassword