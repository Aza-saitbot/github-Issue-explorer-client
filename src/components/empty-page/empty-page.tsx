import './empty-page.scss'
import {FC} from 'react';


interface IEmptyPageProps {
  children?: JSX.Element
}
export const EmptyPage:FC<IEmptyPageProps> = ({children}) => {

  return (
    <div className={'empty-page'}>
      {children}
    </div>
  )
}