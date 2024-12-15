import React, {useState} from 'react';
import {TextField} from '@mui/material';
import './issue-search.scss'
import {useAppDispatch} from '@src/modules/issues/hooks/hooks';
import { fetchIssues } from '../../store';

export const IssueSearch = () => {
  const [userName, setUserName] = useState<string>('');
  const [repoName, setRepoName] = useState<string>('');
  const dispatch = useAppDispatch();

  const getIssues = async () => {
    if (!userName || !repoName) return;

    dispatch(fetchIssues({userName, repoName}));
  };
  return (
    <div className={'input-search'}>
      <TextField label="Имя пользователя" variant="outlined"
                 type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField label="Название репозитория" variant="outlined"
                 type="text"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
    </div>
  );
};
