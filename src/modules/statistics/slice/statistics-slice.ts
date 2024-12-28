import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IStatisticDto} from '@src/modules/statistics/models';
import {fetchStatisticsAPI} from '@src/modules/statistics/api';
import {AxiosError} from 'axios';
import {IErrorResponse} from '@src/api/error-responce.interface';
import {RootState} from '@src/store/store';

export const fetchStatistics = createAsyncThunk<Array<IStatisticDto>, _, { rejectValue: string | null; state: RootState }>(
  'statistics/fetchStatistics',
  async (_, {rejectWithValue, getState}) => {
    const {statistics: {currentPage, hasMore}} = getState() as RootState;

    if (!hasMore) return rejectWithValue(null);
    try {
      const response = await fetchStatisticsAPI({
        page: currentPage
      });
      return response.data;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка';
      return rejectWithValue(message);
    }
  }
);

interface IInitialState {
  statistics: Array<IStatisticDto>;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
}

const initialState: IInitialState = {
  statistics: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    clearStatistics(state) {
      state.statistics = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
    incrementPage(state) {
      if (state.hasMore) {
        state.currentPage += 1;
      } else {
        state.currentPage = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action: PayloadAction<Array<IStatisticDto>>) => {
        state.statistics.push(...action.payload);
        state.isLoading = false;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.isLoading = false;
        if (action.payload === null) {
          state.hasMore = false;
          return;
        }
        state.error = action.payload || 'Произошла ошибка';
      });
  }

});

export const {clearStatistics, incrementPage} = statisticsSlice.actions;
export default statisticsSlice.reducer;