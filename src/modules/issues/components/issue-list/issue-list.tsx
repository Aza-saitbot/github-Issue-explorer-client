import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-list.scss'
import moment from 'moment';
import {IIssue} from '@src/modules/issues/models';
import {useIntersectionObserver} from '@src/utils/hooks/use-intersection-observer';
import {updateVisibleList} from '@src/utils/methods/update-visible-list';
import {ArrowIcon} from '@src/assets/icons/Arrow.icon';
import {Link} from 'react-router-dom';
import {fetchIssues, IssueState} from '@src/modules/issues';
import {LoaderPage} from '@src/components/loader-page/loader-page';
import {EmptyPage} from '@src/components/empty-page/empty-page';
import {Button} from '@mui/material';


const SCROLL_THRESHOLD = 200;
export const IssueList: React.FC = () => {
  const dispatch = useAppDispatch();
  const {issues, isLoading, hasMore,repoName,userName} = useAppSelector((state) => state.issues);

  const pageRef = useRef(1);
  const followScrollRef = useRef<HTMLDivElement | null>(null);
  const [visibleIssues, setVisibleIssues] = useState<IIssue[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const loadMoreIssues = () => {
      pageRef.current += 1;
      dispatch(fetchIssues({repoName,userName, page: pageRef.current }));
  };

  const bottomPointerRef = useIntersectionObserver(()=>{
    console.log('КОЛБЕК СРАБОТАЛ')
    loadMoreIssues()
  });

  const scrollToTop = () => followScrollRef?.current?.scrollTo({top: 0, behavior: 'smooth'})


  const handleScroll = useCallback(() => {
    console.log('1111followScrollRef.current',followScrollRef.current)
    if (followScrollRef.current) {
      console.log('222followScrollRef.current.scrollTop > SCROLL_THRESHOLD',followScrollRef.current.scrollTop, SCROLL_THRESHOLD)
    setShowScrollButton(followScrollRef.current.scrollTop > SCROLL_THRESHOLD)
    }
  }, [followScrollRef]);

  useEffect(() => {
    updateVisibleList<IIssue>(issues, pageRef.current, setVisibleIssues);
  }, [issues]);

  useEffect(() => {
    if (followScrollRef.current) {
      followScrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (followScrollRef.current) {
        followScrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [followScrollRef.current]);


  // useEffect(() => {
  //   if (pageRef.current){
  //     dispatch(fetchIssues(pageRef.current));
  //   }
  // }, [pageRef.current]);
  if (isLoading) return <LoaderPage/>;

  if (!visibleIssues.length) return <EmptyPage/>

  return (
    <div ref={e => followScrollRef.current = e} className="list">
      {visibleIssues.map(issue => (
        <Link className="list__item" key={issue.id} to={`/issue/${issue.number}`}>
          <div className="list__item_title">
            <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'}/>
            <div>
              <div>{issue.title}</div>
              <span>id: {issue.number}</span>
            </div>
          </div>
          <div className={'list__item_info'}>
            <p>{moment(issue.created_at).format('DD.MM.YYYY')}</p>
            <IssueState state={issue.state}/>
            <span>{issue.comments}</span>
          </div>
        </Link>
      ))}
      <button onClick={scrollToTop} className={`button-up ${showScrollButton ? 'show' : ''}`}><ArrowIcon className={'button-up__icon'}/>
      </button>

      <div className={'list_bottomPointer'} ref={bottomPointerRef}></div>
    </div>
  );
};

