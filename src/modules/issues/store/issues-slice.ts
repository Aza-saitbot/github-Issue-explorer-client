import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {IIssue} from '@src/modules/issues/models';
import {fetchIssuesAPI} from '@src/modules/issues/api';
import issuesMock from '@src/mock.json';

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (page: number) => {
    const response = await fetchIssuesAPI(page);
    return response.data;
  }
);
interface IInitialState {
  issues: IIssue[],
  isLoading: boolean
  hasMore: boolean
}
const initialState:IInitialState = {
  issues: issuesMock as IIssue[],
  isLoading: false,
  hasMore: true,
}

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.issues.push(...action.payload);
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default issuesSlice.reducer;
