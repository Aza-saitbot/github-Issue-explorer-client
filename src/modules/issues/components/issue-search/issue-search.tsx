import {Button, TextField} from '@mui/material';
import './issue-search.scss';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import {fetchIssues, resetPage, searchIssues, clearIssues, setQueryIssues, setRepoName, setUserName} from '../../slice';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';

export const IssueSearch = () => {
  const {userName, repoName, query} = useAppSelector((state) => state.issues);
  const dispatch = useAppDispatch();
  const [search,setSearch]=useState('');
  const [isHideButton,setHideButton]=useState(false);

  const onSubmit = () => {
    if (query.length) {
      setSearch('');
      dispatch(setQueryIssues(''));
      dispatch(clearIssues());
    }
    if (!userName.length || !repoName.length) {
      return;
    }
    setHideButton(true);
    dispatch(resetPage());
    dispatch(fetchIssues({
      userName,
      repoName,
    }));
  };

  const onSearch = () => {
    if (userName.length && repoName.length) {
      dispatch(setUserName(''));
      dispatch(setRepoName(''));
      dispatch(clearIssues());
    }
    dispatch(setQueryIssues(search));
    dispatch(resetPage());
    dispatch(searchIssues(search));
  };

  const onChangeUserName = (value: string) => {
    dispatch(setUserName(value));
    setHideButton(false);
    if (isHideButton){
      setHideButton(false);
    }
    if (value.length === 0) {
      dispatch(clearIssues());
      dispatch(resetPage());
    }
  };

  const onChangeRepoName = (value: string) => {
    dispatch(setRepoName(value));
    if (isHideButton){
      setHideButton(false);
    }
    if (value.length === 0) {
      dispatch(clearIssues());
      dispatch(resetPage());
    }
  };

  const onReset = () => {
    setHideButton(false);
    dispatch(setUserName(''));
    dispatch(setRepoName(''));
    dispatch(clearIssues());
  };

  const onChangeSearch = (value:string) => {
    setSearch(value);
    if (value.length === 0){
      dispatch(clearIssues());
      dispatch(setQueryIssues(''));
    }
  };

  return (
    <div>
      <div className={'search'}>
        <TextField label="Имя пользователя" variant="outlined"
                   type="search"
                   className={'search__input'}
                   placeholder={'facebook'}
                   value={userName}
                   onChange={(e) => onChangeUserName(e.target.value)}
        />
        <TextField label="Название репозитория" variant="outlined"
                   type="search"
                   className={'search__input'}
                   placeholder={'react'}
                   value={repoName}
                   onChange={(e) => onChangeRepoName(e.target.value)}
        />
        <div className={'search__buttons'}>
          {!isHideButton && (
            <Button disabled={!repoName.length || !userName.length} onClick={onSubmit} variant="contained">
              <SearchIcon/>
            </Button>
          )}
          {userName || repoName ? <Button onClick={onReset} className={'delete_button'} variant="outlined">Reset</Button>: null}
        </div>
      </div>
      <div className={'search'}>
        <TextField label="Поиск по слову" variant="outlined"
                   className={'search__select_input'}
                   placeholder={'баг'}
                   type="search"
                   value={search}
                   onChange={e => onChangeSearch(e.target.value)}
        />
        {!query.length && (
          <Button disabled={search.length===0} onClick={onSearch} variant="contained">
            <SearchIcon/>
          </Button>
        )}
      </div>
    </div>

  );
};
