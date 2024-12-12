import React from 'react';
import { useParams } from 'react-router-dom';
import {useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-details.scss'


export const IssueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const issue = useAppSelector((state) =>
    state.issues.issues.find((i) => i.id === Number(id))
  );

  if (!issue) return <p>Issue not found</p>;

  return (
    <div className="details">
    <div>
      <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'} />
      <h3>{issue.title}</h3>
    </div>
      <div>
        <p>{issue.body}</p>
        <p>{issue.user.login}</p>
        <p>{issue.state}</p>
      </div>
    </div>
  );
};

