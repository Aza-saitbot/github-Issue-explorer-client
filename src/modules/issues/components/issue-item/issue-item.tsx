import {Link} from 'react-router-dom';
import './issue-item.scss'
import moment from 'moment/moment';
import {IIssue} from '@src/modules/issues/models';
import {memo} from 'react';

export const IssueItem = memo((issue: IIssue) => {
  const parts = issue.repository_url.split('/');
  const userName = parts[parts.length - 2];
  const repoName = parts[parts.length - 1];
  return (
    <Link className="issue-list__item" key={issue.id} to={`/issues/${userName}/${repoName}/${issue.number}`}>
      <div className="issue-list__item_title">
        <img className="avatar" src={issue.user.avatar_url} alt={'avatar'} />
        <div>
          <div>{issue.title}</div>
          <span>id: {issue.number}</span>
        </div>
      </div>
      <div className="issue-list__item_info">
        <p>{moment(issue.created_at).format('DD.MM.YYYY')}</p>
        <span>{`comments: ${issue.comments}`}</span>
      </div>
    </Link>
  );
});

IssueItem.displayName = 'IssueItem';