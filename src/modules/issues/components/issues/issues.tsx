import {IssueList, IssueSearch, IssueState} from '@src/modules/issues';
import './issues.scss'

export const Issues = () => {

  return (
    <div className={'issues'}>
      <IssueSearch/>
      <IssueList/>
    </div>
  )
}