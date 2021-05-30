import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSearch } from '../openlibraryAPI';

const initialState = {
  value: '',
  list: [],
  status: 'idle'
};

export const fetchSearchAsync = createAsyncThunk(
  'search/fetchSearch',
  async (value) => {
    const response = await fetchSearch(value);
    return { data: response.data, value: response.value };
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
    fillList: (state, action) => {
      if(Array.isArray(action.payload)){
        state.list = action.payload;
      }else{
        state.list = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchAsync.fulfilled, (state, action) => {
        if (action.payload.value === state.value) {
          state.status = 'idle';
          state.list = action.payload.data;
        } else {
          console.log('пришёл не актуальный ответ на запрос: ', action.payload.value)
        }
      });
  },
});

export const { change } = searchSlice.actions;

export const { fillList } = searchSlice.actions;

export const selectList = (state) => state.search.list;

export const selectStatus = (state) => state.search.status;

export const selectSearch = (state) => state.search.value;

let timeoutChangeSearch;
export const changeSearch = (value) => (dispatch) => {
  dispatch(change(value));

  if (timeoutChangeSearch) {
    clearTimeout(timeoutChangeSearch);
  }

  if (value) {
    timeoutChangeSearch = setTimeout(() => {
      timeoutChangeSearch = null;
      dispatch(fetchSearchAsync(value));
    }, 1000);
  } else {
    dispatch(fillList());
  }
};

export default searchSlice.reducer;
