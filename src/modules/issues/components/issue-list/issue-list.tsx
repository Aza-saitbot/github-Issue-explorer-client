import React, {useCallback, useEffect, useRef, useState } from 'react';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import {fetchIssues, Spinner} from '@src/modules/issues';
import './issue-list.scss'
import moment from 'moment';
import {EIssueState} from '@src/modules/issues/models/enums/issue-state';
import {IIssue} from '@src/modules/issues/models';
import {useIntersectionObserver} from '@src/utils/hooks/use-intersection-observer';
import {updateVisibleList} from '@src/utils/methods/update-visible-list';
import {ArrowIcon} from '@src/assets/icons/Arrow.icon';

const SCROLL_THRESHOLD = 200;
export const IssueList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { issues, isLoading, hasMore } = useAppSelector((state) => state.issues);
console.log('issues',issues[0])

  const pageRef = useRef(1);
  const followScrollRef = useRef<HTMLDivElement | null>(null);
  const [visibleIssues, setVisibleIssues] = useState<IIssue[]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);


  const bottomPointerRef = useIntersectionObserver(() => {
    pageRef.current += 1;
    updateVisibleList<IIssue>(issues, pageRef.current, setVisibleIssues);
  });
console.log('issues',issues.length)

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
  
  console.log('showScrollButton',showScrollButton)

  if (isLoading) return <Spinner />;

  return (
    <div ref={followScrollRef} className="list">
      {visibleIssues.map(issue => (
        <div className="list__item" key={issue.id}>
          <div className="list__item_title">
            <img className={'avatar'} src={issue.user.avatar_url} alt={'avatar'} />
            <div>
              <div>{issue.title}</div>
              <span>id: {issue.number}</span>
            </div>
          </div>
          <div className={'list__item_info'}>
            <p>{moment(issue.created_at).format('DD.MM.YYYY')}</p>
            <div className={issue.state !==  EIssueState.OPEN ? 'open' : 'closed'}>
              {issue.state}
            </div>
          </div>
        </div>
      ))}
      <button className={`button-up ${showScrollButton ? 'show' : ''}`}><ArrowIcon className={'button-up__icon'} /></button>
      <div className={'list__bottomPointer'} ref={bottomPointerRef}></div>
    </div>
  );
};

