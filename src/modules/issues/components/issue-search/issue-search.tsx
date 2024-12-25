import {Button, TextField} from '@mui/material';
import './issue-search.scss'
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import {fetchIssues, resetPage, searchIssues, setIssues, setQueryIssues, setRepoName, setUserName} from '../../slice';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const IssueSearch = () => {
  const {userName, repoName, issues, query} = useAppSelector((state) => state.issues);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(resetPage())
    dispatch(fetchIssues({}));
  };

  const onSearch = () => {
    dispatch(resetPage())
    dispatch(searchIssues({}));
  };

  const onReset = () => {
    dispatch(setUserName(''));
    dispatch(setRepoName(''));
    dispatch(setIssues([]));
    dispatch(setQueryIssues(''))
    dispatch(resetPage())
  };

  const onChangeQuery = (value: string) => {
    if (value.length === 0) {
      dispatch(setIssues([]));
      dispatch(resetPage())
      dispatch(setQueryIssues(''))
      dispatch(fetchIssues({}));
    } else {
      dispatch(setQueryIssues(value))
    }
  }

  return (
    <div>
      <div className={'search'}>
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
            userName || repoName
              ? <Button className={'delete_button'} onClick={onReset} variant="outlined">
                <DeleteOutlineIcon/>
              </Button>
              : null
          }
        </div>
      </div>
      <div className={'search'}>
        <TextField label="Поиск по слову" variant="outlined"
                   className={'search__select_input'}
                   placeholder={'баг'}
                   type="search"
                   value={query}
                   onChange={e => onChangeQuery(e.target.value)}
        />
        <Button disabled={!query.length} onClick={onSearch} variant="contained">
          <SearchIcon/>
        </Button>
      </div>
    </div>

  );
};
