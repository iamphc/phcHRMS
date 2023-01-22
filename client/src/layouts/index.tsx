import React, {FC} from 'react'
import { Link } from 'umi'
import selectLayout from '@/utils/selectLayout'
import Loading from '@/components/Loading'
import LoginLayout from './LoginLayout'
import BaseLayout from './BaseLayout'
import {useSelector} from 'umi'

const Layout: FC = ({children, history, location}) => {
  const layoutMap = {LoginLayout, BaseLayout} as any
  const Container = layoutMap[selectLayout(location.pathname)]
  const loading = useSelector(state => state.loading)
  return (
    <div className="layout-container">
      <Loading loading={!!loading.effects['user/login']} />
      <Container>{!!loading.effects['user/login'] ? null : children}</Container>
    </div>
  )
}

export default Layout