import React, {FC} from 'react'

const BaseLayout: FC = ({children, history}: any) => {
  return (
    <div>
      <div>BaseLayout</div>
      {children}
    </div>
  )
}

export default BaseLayout