import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSearch } from '../openlibraryAPI/openlibraryAPI';

const initialState = {
  value: '',
  list: [],
  status: 'idle',
  firstSearch: true
};

export const fetchSearchAsync = createAsyncThunk(
  'search/fetchSearch',
  async (data) => {
    const response = await fetchSearch(data.value, data.page);
    return { ...response };
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change: (state, action) => {
      state.value = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    fillList: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.list = action.payload;
      } else {
        state.list = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchAsync.pending, (state) => {
        state.firstSearch = false;
        state.status = 'loading';
      })
      .addCase(fetchSearchAsync.fulfilled, (state, action) => {
        if (action.payload.err){
          state.status = 'error';
        } else if (action.payload.value === state.value) {
          state.status = 'idle';
          if(action.payload.page && action.payload.page !== 1){
            state.list.push(...action.payload.data);
            // state.list.splice(action.payload.start, 100, ...action.payload.data);
          }else{
            state.list = action.payload.data;
          }
        } else {
          //console.log('пришёл не актуальный ответ на запрос: ', action.payload.value)
        }
      })
  },
});

export const { change, setStatus, fillList } = searchSlice.actions;

export const selectList = (state) => state.search.list;

export const selectStatus = (state) => state.search.status;

export const selectSearch = (state) => state.search.value;

export const selectfirstSearch = (state) => state.search.firstSearch;

let timeoutChangeSearch;

export const changeSearch = (value) => (dispatch) => {
  dispatch(change(value));

  if (timeoutChangeSearch) {
    clearTimeout(timeoutChangeSearch);
  }

  if (value) {
    timeoutChangeSearch = setTimeout(() => {
      timeoutChangeSearch = null;
      dispatch(fillList());
      dispatch(fetchSearchAsync({value}));
    }, 1000);
  } else {
    dispatch(fillList());
  }
};

export const submitSearch = (value) => (dispatch) => {
  if (timeoutChangeSearch) {
    clearTimeout(timeoutChangeSearch);
  }

  if (value) {
    dispatch(fetchSearchAsync({value}));
  }

  dispatch(fillList());
};

export const nextPage = (value, page) => (dispatch) => {
  if (timeoutChangeSearch) {
    clearTimeout(timeoutChangeSearch);
  }

  if (value && page) {
    dispatch(fetchSearchAsync({value, page}));
  }
};

export default searchSlice.reducer;
