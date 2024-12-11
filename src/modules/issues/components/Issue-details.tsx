import React from 'react';
import { useParams } from 'react-router-dom';
import {useAppSelector} from '@src/modules/issues/hooks/hooks';


export const IssueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const issue = useAppSelector((state) =>
    state.issues.issues.find((issue) => issue.id === Number(id))
  );

  if (!issue) return <p>Issue not found</p>;

  return (
    <div className="issue-details">
      <h2>{issue.title}</h2>
      <p>{issue.body}</p>
    </div>
  );
};

