import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import './issue-list.scss';
import moment from 'moment';
import {IIssue} from '@src/modules/issues/models';
import {useIntersectionObserver} from '@src/utils/hooks/use-intersection-observer';
import {updateVisibleList} from '@src/utils/methods/update-visible-list';
import {ArrowIcon} from '@src/assets/icons/Arrow.icon';
import {Link} from 'react-router-dom';
import {LoaderPage} from '@src/components/loader-page/loader-page';
import {EmptyPage} from '@src/components/empty-page/empty-page';
import {fetchMoreIssues, incrementPage} from '@src/modules/issues';

const SCROLL_THRESHOLD = 200;

export const IssueList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { issues, isLoading,currentPage } = useAppSelector(state => state.issues);

  const followScrollRef = useRef<HTMLDivElement | null>(null);
  const [visibleIssues, setVisibleIssues] = useState<IIssue[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const bottomPointerRef = useIntersectionObserver(()=>{
    dispatch(incrementPage());
    dispatch(fetchMoreIssues());
  });

  const scrollToTop = () => followScrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });

  const handleScroll = () => {
    if (followScrollRef.current) {
      setShowScrollButton(followScrollRef.current.scrollTop > SCROLL_THRESHOLD);
    }
  };

  useEffect(() => {
    if (issues !== null) {
      if (issues.length === 0) {
        setVisibleIssues([]);
        return;
      }
      updateVisibleList<IIssue>(issues, currentPage, setVisibleIssues);
    }
  }, [issues, currentPage]);

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

  return (
    <div ref={followScrollRef} className="list">
      {isLoading && <LoaderPage />}
      {issues && issues.length ? (
        <>
          {visibleIssues.map(issue => (
            <Link className="list__item" key={issue.id} to={`/issue/${issue.number}`}>
              <div className="list__item_title">
                <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'} />
                <div>
                  <div>{issue.title}</div>
                  <span>id: {issue.number}</span>
                </div>
              </div>
              <div className={'list__item_info'}>
                <p>{moment(issue.created_at).format('DD.MM.YYYY')}</p>
                <span>{issue.comments}</span>
              </div>
            </Link>
          ))}
          <div className={'list_bottomPointer'} ref={bottomPointerRef}></div>
        </>
      ) : (
        <EmptyPage />
      )}
      <button onClick={scrollToTop} className={`button-up ${showScrollButton ? 'show' : ''}`}>
        <ArrowIcon className={'button-up__icon'} />
      </button>
    </div>
  );
};
