import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {IIssue} from '@src/modules/issues/models';
import {fetchIssuesAPI} from '@src/modules/issues/api';

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (page: number) => {
    const response = await fetchIssuesAPI(page);
    return response.data;
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState: {
    issues: [] as IIssue[],
    isLoading: false,
    hasMore: true,
  },
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
