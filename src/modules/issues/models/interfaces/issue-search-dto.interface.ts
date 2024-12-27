import {IIssue} from '@src/modules/issues/models';

export interface IIssueSearchDto {
  incomplete_results: boolean
  items: IIssue[]
  total_count: number
}