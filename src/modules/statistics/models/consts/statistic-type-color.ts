import {EStatisticType} from '@src/modules/statistics/models/enums/statistic-type.enum';

export const STATISTIC_TYPE_COLOR: Record<EStatisticType, 'green' | 'blue' | 'orange' | 'red'> = {
  [EStatisticType.GET_ISSUES]: 'green',
  [EStatisticType.GET_ISSUE]: 'blue',
  [EStatisticType.SEARCH_ISSUES]: 'orange',
  [EStatisticType.UNKNOWN]: 'red'
}