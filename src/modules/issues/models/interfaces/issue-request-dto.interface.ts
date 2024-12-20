import {IIssuesRequestDTO} from '@src/modules/issues/models';


export interface IIssueRequestDTO extends IIssuesRequestDTO {
  issueId: number
}