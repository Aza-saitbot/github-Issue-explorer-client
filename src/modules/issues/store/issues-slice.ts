import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IErrorResponse, IIssue, IIssuesRequestDTO} from '@src/modules/issues/models';
import {fetchIssuesAPI} from '@src/modules/issues/api';
import {AxiosError} from 'axios';
// import issuesMock from '@src/mock.json';

export const fetchIssues = createAsyncThunk<IIssue[], IIssuesRequestDTO, { rejectValue: string }>(
  'issues/fetchIssues',
  async (requestDto, { rejectWithValue }) => {
    try {
      const response = await fetchIssuesAPI(requestDto);
      return response.data;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка';
      return rejectWithValue(message);
    }
  }
);


interface IInitialState {
  userName: string;
  repoName: string;
  issues: IIssue[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
}

const initialState: IInitialState = {
  userName: '',
  repoName: '',
  issues: [],
  isLoading: false,
  hasMore: true,
  error: null,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    setRepoName(state, action: PayloadAction<string>) {
      state.repoName = action.payload;
    },
    setIssues(state, action: PayloadAction<IIssue[]>) {
      state.issues = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
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
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export const {setUserName, setRepoName,setIssues,setError} = issuesSlice.actions;
export default issuesSlice.reducer;
