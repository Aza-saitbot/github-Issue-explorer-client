import {FC, useEffect, useRef, useState} from 'react';
import {useIntersectionObserver} from '@src/utils/hooks/use-intersection-observer';
import {LoaderPage} from '@src/components/loader-page/loader-page';
import {EmptyPage} from '@src/components/empty-page/empty-page';
import {ArrowIcon} from '@src/assets/icons/Arrow.icon';
import './list.scss';

const SCROLL_THRESHOLD = 200;

interface IListProps<T> {
  items: T[];
  fetchMore: () => void;
  renderItem: (item: T) => JSX.Element;
  isLoading: boolean;
  isEmpty: boolean;
  emptyPageContent?: JSX.Element;
  className?: string;
}

export const List: FC<IListProps<any>> = ({
                                            items,
                                            fetchMore,
                                            renderItem,
                                            isLoading,
                                            isEmpty,
                                            className = '',
                                            emptyPageContent = <div>Здесь пока пусто</div>
                                          }) => {
  const followScrollRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const bottomPointerRef = useIntersectionObserver(fetchMore);

  const handleScroll = () => {
    if (followScrollRef.current) {
      setShowScrollButton(followScrollRef.current.scrollTop > SCROLL_THRESHOLD);
    }
  };

  const scrollToTop = () => followScrollRef.current?.scrollTo({top: 0, behavior: 'smooth'});

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
    <div ref={followScrollRef} className={className}>
      {isLoading && <LoaderPage/>}
      {isEmpty ? (
        <EmptyPage>{emptyPageContent}</EmptyPage>
      ) : (
        <>
          {items.map(renderItem)}
          <div className={'bottom-pointer'} ref={bottomPointerRef}/>
        </>
      )}
      <button onClick={scrollToTop} className={`button-up ${showScrollButton ? 'show' : ''}`}>
        <ArrowIcon className={'button-up__icon'}/>
      </button>
    </div>
  );
};
