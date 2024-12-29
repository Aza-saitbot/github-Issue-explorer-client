import {IssueList, IssueSearch} from '@src/modules/issues';
import { IssueDrawerSearch } from '../issue-drawer-search/issue-drawer-search';
import './issues.scss'

export const Issues = () => {

  return (
    <div className={'issues'}>
      <div className={'issues__mobile'}>
        <IssueDrawerSearch/>
      </div>
      <div className={'issues__desktop'}><IssueSearch/></div>
      <IssueList/>
    </div>
  )
}