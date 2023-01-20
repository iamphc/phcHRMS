import React from 'react'
import IconMap from '@/components/IconMap'
import {LoginRules} from '@/utils/rules'

const AcountLogin: FC = ({form, FormItem, Input}) => {
  return (
    <>
      <FormItem name="username" rules={LoginRules.usernameRule}>
        <Input placeholder="请输入用户名" prefix={IconMap.userIcon} />
      </FormItem>
      <FormItem name="password" rules={LoginRules.passwordRule}>
        <Input placeholder="请输入密码" prefix={IconMap.passwordIcon} />
      </FormItem>
    </>
  )
}

export default AcountLogin