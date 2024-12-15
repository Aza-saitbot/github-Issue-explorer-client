import {CircularProgress} from '@mui/material';
import './loader-page.scss'

export const LoaderPage = () => {
  return <div className={'loader-page'}>
    <CircularProgress/>
  </div>
}