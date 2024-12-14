import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {IIssue, IIssueRequestDTO} from '@src/modules/issues/models';
import {fetchIssuesAPI} from '@src/modules/issues/api';
import issuesMock from '@src/mock.json';

export const fetchIssues = createAsyncThunk<IIssue[], IIssueRequestDTO, {rejectValue: unknown}>(
  'issues/fetchIssues',
  async (requestDto,{rejectWithValue}) => {
    try {
      const response = await fetchIssuesAPI(requestDto);

      return response.data
    } catch (e) {
      console.log('eОШИИИИБКА',e)
      return rejectWithValue(e);
    }
  }
);interface IInitialState {
  issues: IIssue[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  issues: issuesMock as IIssue[],
  isLoading: false,
  hasMore: true,
  error: null,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Сбрасываем ошибку при новом запросе
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.issues.push(...action.payload);
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Произошла ошибка';
      });
  },
});

export default issuesSlice.reducer;
