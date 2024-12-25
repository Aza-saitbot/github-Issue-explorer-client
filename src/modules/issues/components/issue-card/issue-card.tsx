import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-card.scss'
import {ArrowIcon} from '@src/assets/icons/Arrow.icon';
import moment from 'moment/moment';
import ReactMarkdown from 'react-markdown';
import {fetchIssue, IssueState} from '@src/modules/issues';
import {LoaderPage} from '@src/components/loader-page/loader-page';


export const IssueCard: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch()
  const {issue, error, isLoading} = useAppSelector((state) => state.issues);

  useEffect(()=>{
    if (id){
      dispatch(fetchIssue(Number(id)))
    }
  },[id])

  if (isLoading || !issue) return <LoaderPage />;

  return (
    <div className="details">
      <div className={'details__header'}>
        <Link to={'/'} className={'come-back'}><ArrowIcon className={'button-up__icon'}/></Link>
        <div>
          <h4>{issue.title}</h4>
          <div className={'details__header__title'}>
            <IssueState state={issue.state}/>
            <span>{issue.user.login}</span>
            <span>{moment(issue.updated_at).format('DD.MM.YYYY HH:mm')}</span>
            <span>Comments: {issue.comments}</span>
          </div>
        </div>
      </div>
      <div className={'details__content'}>
        <div className={'details__content__body'}>
          <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'}/>
          <div className={'details__content__body__text'}>
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </div>
        </div>
        <div className={'details__content__sidebar'}>
          <div className={'details__content__sidebar__item'}>
            <h3>Assignees:</h3>
            <div>
              {issue.assignees.length ? issue.assignees.map((assignee) => (
                <div key={assignee.id} className={'colm'}>
                  <img
                    className={'avatar'}
                    src={assignee.avatar_url}
                    alt={'avatar'}
                  />
                  {assignee.login}
                </div>
              )) : 'No assignees'}
            </div>
          </div>
          <div className={'details__content__sidebar__item'}>
            <h3>labels</h3>
            <div className={'details__content__sidebar__labels'}>
              {issue.labels.map((label) => (
                <div
                  style={{
                    backgroundColor: `#${label.color}`,
                  }}
                  className={'label'}
                  key={label.id}
                >
                  {label.name}
                </div>
              ))
              }
            </div>
          </div>
          <div className={'details__content__sidebar__item'}>
            <h3>Millstone:</h3>
            <div>
              {issue.milestone ? issue.milestone.title : 'No milestone'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

