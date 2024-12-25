import {EStatisticType} from '@src/modules/statistics/models/enums/statistic-type.enum';

export interface IStatisticDto {
  id: number
  ip: string
  dt: string
  user: string
  type: EStatisticType
}