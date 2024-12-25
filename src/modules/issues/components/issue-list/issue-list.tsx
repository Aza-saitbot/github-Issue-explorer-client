import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-list.scss';
import moment from 'moment';
import {IIssue} from '@src/modules/issues/models';
import {Link} from 'react-router-dom';
import {fetchMoreIssues, incrementPage, searchIssues} from '@src/modules/issues';
import {List} from '@src/components/list/list';
import ContentPasteSearchTwoToneIcon from '@mui/icons-material/ContentPasteSearchTwoTone';

export const IssueList= () => {
  const dispatch = useAppDispatch();
  const { issues, isLoading,query } = useAppSelector(state => state.issues);
  const fetchMore = () => {
    dispatch(incrementPage());
    if (query.length > 0) {
      dispatch(searchIssues({ query}));
    }else {
      dispatch(fetchMoreIssues({}));
    }

  }

  const renderItem = (issue: IIssue) => (
    <Link className="issue-list__item" key={issue.id} to={`/issue/${issue.number}`}>
      <div className="issue-list__item_title">
        <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'} />
        <div>
          <div>{issue.title}</div>
          <span>id: {issue.number}</span>
        </div>
      </div>
      <div className={'issue-list__item_info'}>
        <p>{moment(issue.created_at).format('DD.MM.YYYY')}</p>
        <span>{issue.comments}</span>
      </div>
    </Link>
  );

  return (
    <List
      items={issues}
      className={'issue-list'}
      fetchMore={fetchMore}
      renderItem={renderItem}
      isLoading={isLoading}
      isEmpty={issues.length === 0}
      emptyPageContent={<div>
        <ContentPasteSearchTwoToneIcon sx={{
          width:120,
          height:120
        }}/>
        <div>
          Здесь появиться последние результаты поиска
        </div>
      </div>}
    />
  );
};
