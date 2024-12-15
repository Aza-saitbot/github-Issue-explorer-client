import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone';
import './empty-page.scss'
export const EmptyPage = () => {
  const settingIcon = {
    width:120,
    height:120
  }
  return (
    <div className={'empty-page'}>
      <div>
        <ContentPasteSearchTwoToneIcon sx={settingIcon}/>
        <div className={'empty-page__title'}>
          Здесь появиться последние результаты поиска
        </div>
      </div>
    </div>
  )
}