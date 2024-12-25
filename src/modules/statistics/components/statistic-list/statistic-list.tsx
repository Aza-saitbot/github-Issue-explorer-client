import {useAppDispatch, useAppSelector} from '@src/modules/issues/hooks/hooks';
import moment from 'moment/moment';
import './statistic-list.scss'
import {List} from '@src/components/list/list';
import {fetchStatistics} from '@src/modules/statistics';
import {useEffect, useState} from 'react';
import {IStatisticDto, STATISTIC_TYPE_COLOR} from '@src/modules/statistics/models';

export const StatisticList = () => {
  const dispatch = useAppDispatch();
  const { statistics, isLoading } = useAppSelector(state => state.statistics);
  const [page,setPage]=useState(0);
  const fetchMore = () => {
    setPage(prevState => prevState + 1);
    dispatch(fetchStatistics({
      page: page + 1
    }));
  };

  const renderItem = (statistic: IStatisticDto ) => (
    <div className="statistic-list__item" key={statistic.id}>
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
    setPage(prevState => prevState + 1);
    dispatch(fetchStatistics({page: 1}))
  },[])

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