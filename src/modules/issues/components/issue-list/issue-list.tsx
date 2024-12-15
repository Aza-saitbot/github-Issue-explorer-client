import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-list.scss'
import moment from 'moment';
import {IIssue} from '@src/modules/issues/models';
import {useIntersectionObserver} from '@src/utils/hooks/use-intersection-observer';
import {updateVisibleList} from '@src/utils/methods/update-visible-list';
import {ArrowIcon} from '@src/assets/icons/Arrow.icon';
import {Link} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {IssueSearch, IssueState} from '@src/modules/issues';
import {LoaderPage} from '@src/components/loader-page/loader-page';
import {EmptyPage} from '@src/components/empty-page/empty-page';


const SCROLL_THRESHOLD = 200;
export const IssueList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { issues, isLoading, hasMore } = useAppSelector((state) => state.issues);

  const pageRef = useRef(1);
  const followScrollRef = useRef<HTMLDivElement | null>(null);
  const [visibleIssues, setVisibleIssues] = useState<IIssue[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);


  const bottomPointerRef = useIntersectionObserver(() => {
    pageRef.current += 1;
    updateVisibleList<IIssue>(issues, pageRef.current, setVisibleIssues);
  });

  const scrollToTop = ()=> followScrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })


  const handleScroll = useCallback(() => {
    if (followScrollRef.current) {
      setShowScrollButton(followScrollRef.current.scrollTop > SCROLL_THRESHOLD)
    }
  },[followScrollRef.current]);

  useEffect(() => {
    pageRef.current = 1;
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


  if (!isLoading) return <EmptyPage/>
  if (isLoading) return <LoaderPage/>;

  return (
    <div className={'content'}>
      <IssueSearch/>
      <div ref={followScrollRef} className="list">
        {visibleIssues.map(issue => (
          <Link className="list__item" key={issue.id} to={`/issues/${issue.number}`} >
            <div className="list__item_title">
              <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'} />
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
        <button onClick={scrollToTop} className={`button-up ${showScrollButton ? 'show' : ''}`}><ArrowIcon className={'button-up__icon'} /></button>

        <div className={'list_bottomPointer'} ref={bottomPointerRef}></div>
      </div>
    </div>
  );
};

