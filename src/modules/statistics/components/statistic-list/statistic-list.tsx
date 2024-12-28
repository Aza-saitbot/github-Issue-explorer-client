import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import moment from 'moment/moment';
import './statistic-list.scss';
import {List} from '@src/components/list/list';
import {clearStatistics, fetchStatistics, incrementPage} from '@src/modules/statistics';
import {useEffect} from 'react';
import {IStatisticDto, STATISTIC_TYPE_COLOR} from '@src/modules/statistics/models';

export const StatisticList = () => {
  const dispatch = useAppDispatch();
  const {statistics, isLoading} = useAppSelector(state => state.statistics);

  const fetchMore = () => {
    dispatch(incrementPage());
    dispatch(fetchStatistics({}));
  };

  const renderItem = (statistic: IStatisticDto) => (
    <div className="statistic-list__item" key={statistic._id}>
      <div className="statistic-list__item_type">
        <span>ip: {statistic.ip}</span>
        <span className={`statistic-list__item_type ${STATISTIC_TYPE_COLOR[statistic.type]}`}>type: {statistic.type}</span>
      </div>
      <div className={'statistic-list_date'}>
        {moment(statistic.dt).format('DD.MM.YYYY - HH:mm:ss')}
      </div>
    </div>
  );


  useEffect(() => {
    dispatch(fetchStatistics({page: 1}));
    return () => {
      dispatch(clearStatistics());
    };
  }, [dispatch]);

  return (
    <List
      items={statistics}
      className={'statistic-list'}
      fetchMore={fetchMore}
      renderItem={renderItem}
      isLoading={isLoading}
      isEmpty={statistics.length === 0}
    />
  );
};