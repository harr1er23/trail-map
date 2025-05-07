import React, { type ReactNode } from 'react'
import { Sidebar } from '../shared/ui/Sidebar/Sidebar';

interface Props {
    children?: ReactNode;
}

export const AppLayout:React.FC<Props> = ({children}) => {
  return (
    <div className="flex">
        <Sidebar />
        {children}
    </div>
  )
}