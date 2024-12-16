import {Alert, Button, TextField} from '@mui/material';
import './issue-search.scss'
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import {fetchIssues, setError, setIssues, setRepoName, setUserName} from '../../store';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect} from 'react';

export const IssueSearch = () => {
  const {userName, repoName,error } = useAppSelector((state) => state.issues);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (!userName || !repoName) {
      return
    }
    dispatch(fetchIssues({userName, repoName}));
  };

  const onReset = () => {
    dispatch(setUserName(''));
    dispatch(setRepoName(''));
    dispatch(setIssues([]));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={'search'}>
      {error ? <Alert className={'error'} severity="error">{error}</Alert>: null}
      <TextField label="Имя пользователя" variant="outlined"
                 type="text"
                 className={'search__input'}
                 placeholder={'facebook'}
                 value={userName}
                 onChange={(e) => dispatch(setUserName(e.target.value))}
      />
      <TextField label="Название репозитория" variant="outlined"
                 type="text"
                 className={'search__input'}
                 placeholder={'react'}
                 value={repoName}
                 onChange={(e) => dispatch(setRepoName(e.target.value))}
      />
      <div className={'search__buttons'}>
        <Button disabled={!repoName.length || !userName.length} onClick={onSubmit} variant="contained">
          <SearchIcon/>
        </Button>
        {
          userName || repoName ? <Button onClick={onReset} variant="outlined">Очистить</Button> : null
        }
      </div>
    </div>
  );
};
