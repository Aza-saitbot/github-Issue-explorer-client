import {Button, TextField} from '@mui/material';
import './issue-search.scss'
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import {fetchIssues, resetPage, searchIssues, setIssues, setQueryIssues, setRepoName, setUserName} from '../../slice';
import SearchIcon from '@mui/icons-material/Search';

export const IssueSearch = () => {
  const {userName,issues, repoName, query} = useAppSelector((state) => state.issues);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (query.length){
      dispatch(setQueryIssues(''))
      dispatch(setIssues([]))
    }
    dispatch(resetPage())
    dispatch(fetchIssues({}));
  };

  const onSearch = () => {
    if (userName.length && repoName.length) {
      dispatch(setUserName(''))
      dispatch(setRepoName(''))
      dispatch(setIssues([]))
    }
    dispatch(resetPage())
    dispatch(searchIssues({}));
  };

  const onChangeUserName = (value: string) => {
    dispatch(setUserName(value))
    if (value.length === 0) {
      dispatch(setIssues([]))
      dispatch(resetPage())
    }
  }

  const onChangeRepoName = (value: string) => {
    dispatch(setRepoName(value))
   if (value.length === 0) {
     dispatch(setIssues([]))
     dispatch(resetPage())
   }
  }

  const onChangeQuery = (value: string) => {
    dispatch(setQueryIssues(value))

    if (value.length === 0) {
      dispatch(resetPage())
    }
  }

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
        <Button disabled={(!repoName.length || !userName.length) || issues.length===30} onClick={onSubmit} variant="contained">
          <SearchIcon/>
        </Button>
      </div>
      <div className={'search'}>
        <TextField label="Поиск по слову" variant="outlined"
                   className={'search__select_input'}
                   placeholder={'баг'}
                   type="search"
                   value={query}
                   onChange={e => onChangeQuery(e.target.value)}
        />
        <Button disabled={!query.length || issues.length===30} onClick={onSearch} variant="contained">
          <SearchIcon/>
        </Button>
      </div>
    </div>

  );
};
