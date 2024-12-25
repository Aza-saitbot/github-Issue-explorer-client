import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IStatisticDto, IStatisticsRequestDto} from '@src/modules/statistics/models';
import {fetchStatisticsAPI} from '@src/modules/statistics/api';
import {AxiosError} from 'axios';
import {IErrorResponse} from '@src/api/error-responce.interface';

export const fetchStatistics = createAsyncThunk<Array<IStatisticDto>, IStatisticsRequestDto, { rejectValue: string }>(
  'statistics/fetchStatistics',
  async (dto, {rejectWithValue}) => {
    try {
      const response = await fetchStatisticsAPI(dto);
      return response.data;
    } catch (e: unknown) {
      const axiosError = e as AxiosError<IErrorResponse>;
      const message = axiosError.response?.data?.message || 'Произошла ошибка';
      return rejectWithValue(message);
    }
  }
)
interface IInitialState {
  statistics:Array<IStatisticDto>
  isLoading: boolean
  error: string | null
}

const initialState:IInitialState = {
  statistics: [],
  isLoading: false,
  error: null,
}

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchStatistics.fulfilled, (state, action: PayloadAction<Array<IStatisticDto>>) => {
        state.statistics = action.payload
        state.isLoading = false
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.error = action.payload || 'Произошла ошибка';
        state.isLoading = false
      })
  }
  
});


export default statisticsSlice.reducer;