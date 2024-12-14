import {EIssueState} from '@src/modules/issues/models/enums/issue-state';
import {FC} from 'react';
import './issue-state.scss'


interface IIssueStateProps {
  state:EIssueState
}
export const IssueState:FC<IIssueStateProps> = ({state}) => (
  <div className={`state ${state ===  EIssueState.OPEN ? 'open' : 'closed'}`}>
    {state}
  </div>
)
