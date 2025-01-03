import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IIssue, IIssueRequestDTO, IIssuesRequestDTO} from '@src/modules/issues/models';
import {fetchIssueAPI, fetchIssuesAPI, fetchSearchIssuesAPI} from '@src/modules/issues/api';
import {AxiosError} from 'axios';
import {RootState} from '@src/store/store';
import {IErrorResponse} from '@src/api/error-responce.interface';

export const fetchIssues = createAsyncThunk<IIssue[], IIssuesRequestDTO, { rejectValue: string}>(
  'issues/fetchIssues',
  async (dto, {rejectWithValue}) => {
    const {userName, repoName} = dto;
    try {
      const response = await fetchIssuesAPI({
        userName,
        repoName
      });
      return response.data;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка';
      return rejectWithValue(message);
    }
  }
);

export const fetchIssue = createAsyncThunk<IIssue, IIssueRequestDTO, { rejectValue: string; state: RootState }>(
  'issues/fetchIssue',
  async (dto, {rejectWithValue}) => {
    try {
      const response = await fetchIssueAPI(dto);
      return response.data;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка при получении задачи';
      return rejectWithValue(message);
    }
  }
);

export const fetchMoreIssues = createAsyncThunk<IIssue[], IIssuesRequestDTO, { rejectValue: string; state: RootState}>(
  'issues/fetchMoreIssues',
  async (dto, {rejectWithValue, getState}) => {
    const {issues: {currentPage}} = getState() as RootState;
    const { userName, repoName} = dto;

    if (!userName || !repoName) return;
    try {
      const response = await fetchIssuesAPI({
        currentPage, userName, repoName
      });
      return response.data;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка при получении задач';
      return rejectWithValue(message);
    }
  }
);

export const searchIssues = createAsyncThunk<IIssue[], string, { rejectValue: string | null; state: RootState }>(
  'issues/searchIssues',
  async (query, {rejectWithValue, getState}) => {
    const {issues: {currentPage}} = getState() as RootState;

    if (!query.length) return rejectWithValue(null);
    try {
      const response = await fetchSearchIssuesAPI(query, currentPage);

      return response.data.items;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка при поиске задач';
      return rejectWithValue(message);
    }
  }
);

interface IInitialState {
  userName: string;
  repoName: string;
  issues: IIssue[];
  issue: IIssue | null;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  currentPage: number;
  query: string;
}

const initialState: IInitialState = {
  userName: '',
  repoName: '',
  issues: [],
  issue: null,
  isLoading: false,
  hasMore: true,
  error: null,
  currentPage: 1,
  query: '',
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
    clearIssues(state) {
      state.issues = [];
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    incrementPage(state) {
      state.currentPage += 1;
    },
    resetPage(state) {
      state.currentPage = 1;
    },
    setQueryIssues(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        if (state.issues === null) {
          state.issues = [];
        }
        state.issues.push(...action.payload);
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchIssue.fulfilled, (state, action) => {
        state.issue = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(fetchMoreIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreIssues.fulfilled, (state, action) => {
        state.issues.push(...action.payload);
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchMoreIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(searchIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchIssues.fulfilled, (state, action) => {
        state.issues.push(...action.payload);
        state.isLoading = false;
      })
      .addCase(searchIssues.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload === null) {
          state.hasMore = false;
          return;
        }
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export const {setUserName, setRepoName, clearIssues, setError, incrementPage, resetPage, setQueryIssues} = issuesSlice.actions;
export default issuesSlice.reducer;
