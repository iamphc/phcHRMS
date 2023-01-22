import React, {FC} from 'react'
import {Spin} from 'antd'
import './css/Loading.less'

interface Props {
  loading: boolean
}

const Loading: FC<Props> = (props) => {
  return (
    <Spin spinning={props.loading} tip="加载中"></Spin>
  )
}

export default Loading