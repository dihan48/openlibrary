import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSearch } from '../../openlibraryAPI';

const initialState = {
  value: '',
  status: 'idle'
};

export const changeSearchAsync = createAsyncThunk(
  'search/fetchSearch',
  async (value) => {
    const response = await fetchSearch(value);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeSearchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeSearchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { change } = searchSlice.actions;

export const selectSearch = (state) => state.search.value;

let timeoutChangeSearch;
export const changeSearch = (value) => (dispatch) => {
  dispatch(change(value));

  if (timeoutChangeSearch) {
    clearTimeout(timeoutChangeSearch);
  }

  if(value){
    timeoutChangeSearch = setTimeout(() => {
      timeoutChangeSearch = null;
      dispatch(changeSearchAsync(value));
    }, 1000);
  }
};

export default searchSlice.reducer;
