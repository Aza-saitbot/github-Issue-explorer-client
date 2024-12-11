import React, { useEffect, useRef, useState } from 'react';
import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import {fetchIssues, Spinner} from '@src/modules/issues';


export const IssueList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { issues, isLoading, hasMore } = useAppSelector((state) => state.issues);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastIssueRef = (node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    dispatch(fetchIssues(page));
  }, [dispatch, page]);

  if (isLoading && page === 1) return <Spinner />;

  return (
    <div className="issue-list">
      {issues.map((issue, index) => (
        <div
          ref={issues.length === index + 1 ? lastIssueRef : null}
          key={issue.id}
          className="issue-item"
        >
          <h3>{issue.title}</h3>
          <p>{issue.body.substring(0, 100)}...</p>
        </div>
      ))}
      {isLoading && <Spinner />}
    </div>
  );
};

