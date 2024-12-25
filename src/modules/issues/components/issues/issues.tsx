import {IssueList, IssueSearch} from '@src/modules/issues';
import './issues.scss'

export const Issues = () => {

  return (
    <div className={'issues'}>
      <IssueSearch/>
      <IssueList/>
    </div>
  )
}