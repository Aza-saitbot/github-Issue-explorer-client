import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IErrorResponse, IIssue, IIssuesRequestDTO} from '@src/modules/issues/models';
import {fetchIssuesAPI} from '@src/modules/issues/api';
import {AxiosError} from 'axios';
import {RootState} from '@src/store/store';

export const fetchIssues = createAsyncThunk<IIssue[], IIssuesRequestDTO, { rejectValue: string }>(
  'issues/fetchIssues',
  async (requestDto, {rejectWithValue}) => {
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

export const fetchMoreIssues = createAsyncThunk<IIssue[], _, { rejectValue: string; state: RootState }>(
  'issues/fetchMoreIssues',
  async (_, {rejectWithValue, getState}) => {
    const {issues: {userName, repoName, currentPage}} = getState() as RootState;
    if (!userName || !repoName) {
      return rejectWithValue('Не указано имя пользователя или репозитория');
    }

    try {
      const response = await fetchIssuesAPI({
        userName,
        repoName,
        currentPage
      });
      return response.data;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка';
      return rejectWithValue(message);
    }
  }
)

interface IInitialState {
  userName: string;
  repoName: string;
  issues: IIssue[] | null;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: IInitialState = {
  userName: '',
  repoName: '',
  issues: null,
  isLoading: false,
  hasMore: true,
  error: null,
  currentPage: 1,
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
    setIssues(state, action: PayloadAction<IIssue[] | null>) {
      state.issues = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    incrementPage(state) {
      state.currentPage += 1;
      console.log('INCREMENT', state.currentPage)
    },
    resetPage(state) {
      state.currentPage = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
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
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Произошла ошибка';
      })
      .addCase(fetchMoreIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoreIssues.fulfilled, (state, action) => {
        if (state.issues === null) {
          state.issues = [];
        }
        state.issues.push(...action.payload);
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchMoreIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  },
});

export const {setUserName, setRepoName, setIssues, setError, incrementPage, resetPage} = issuesSlice.actions;
export default issuesSlice.reducer;
