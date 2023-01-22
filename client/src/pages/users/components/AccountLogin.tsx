import React from 'react'
import IconMap from '@/components/IconMap'
import {LoginRules} from '@/utils/rules'

const AcountLogin: FC = ({form, FormItem, Input}) => {
  return (
    <>
      <FormItem name="accountName" rules={LoginRules.usernameRule} hasFeedback>
        <Input placeholder="请输入用户名" prefix={IconMap.userIcon} />
      </FormItem>
      <FormItem name="password" rules={LoginRules.passwordRule} hasFeedback>
        <Input placeholder="请输入密码" prefix={IconMap.passwordIcon} />
      </FormItem>
    </>
  )
}

export default AcountLogin