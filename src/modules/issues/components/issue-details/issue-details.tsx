import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-details.scss';
import {ArrowIcon} from '@src/assets/icons/Arrow.icon';
import moment from 'moment/moment';
import ReactMarkdown from 'react-markdown';
import {fetchIssue, IssueState} from '@src/modules/issues';
import {LoaderPage} from '@src/components/loader-page/loader-page';
import {Button} from '@mui/material';


export const IssueDetails = () => {
  const {id,repoName,userName} = useParams<{ id: string; userName: string; repoName: string }>();
  const dispatch = useAppDispatch();
  const {issue, isLoading} = useAppSelector((state) => state.issues);

  useEffect(() => {
    if (id && userName && repoName) {
      dispatch(fetchIssue({
        issueId: Number(id),
        userName,
        repoName,
      }));
    }
  }, [id, userName, repoName]);

  if (isLoading || !issue) return <LoaderPage/>;

  return (
    <div className="details">
      <div className={'details__header'}>
        <div className={'colm'}>
          <div className={'flex'}>
            <Button variant={'text'} className={'comeback-icon'}><Link to={'/'}><ArrowIcon /></Link></Button>
            <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'}/>
            <h4>{issue.title}</h4>
          </div>

          <div className={'details__header__title'}>
            <IssueState state={issue.state}/>
            <span>{issue.user.login}</span>
            <span>{moment(issue.updated_at).format('DD.MM.YYYY HH:mm')}</span>
            <span>Comments: {issue.comments}</span>
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
      {issue.body && (
        <div className={'details__content'}>
          <div className={'details__content__body'}>
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

