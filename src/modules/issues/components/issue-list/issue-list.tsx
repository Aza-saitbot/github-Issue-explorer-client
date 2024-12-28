import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-list.scss';
import {fetchMoreIssues, incrementPage, IssueItem, searchIssues} from '@src/modules/issues';
import {List} from '@src/components/list/list';
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone';

export const IssueList = () => {
  const dispatch = useAppDispatch();
  const {issues, isLoading, query, repoName, userName} = useAppSelector(state => state.issues);
  const fetchMore = () => {
    dispatch(incrementPage());
    if (query.length) {
      dispatch(searchIssues(query));
    } else if (repoName.length && userName.length) {
      dispatch(fetchMoreIssues({
        userName,
        repoName,
      }));
    }
  };
  const emptyPageContent = <div>
    <ContentPasteSearchTwoToneIcon sx={{
      width: 120,
      height: 120
    }}/>
    <div>
      Здесь появиться последние результаты поиска
    </div>
  </div>;

  return (
    <List
      items={issues}
      className={'issue-list'}
      fetchMore={fetchMore}
      renderItem={(item) => <IssueItem key={item.id} {...item}/>}
      isLoading={isLoading}
      isEmpty={issues.length === 0}
      emptyPageContent={emptyPageContent}
    />
  );
};
