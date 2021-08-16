import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    favCharacters : []
    
}

export const favSlice = createSlice({
    name : 'fav',
    initialState ,
    reducers : {
        SET_FAV_CHARACTERS : (state, action) => {
           state.favCharacters.push(action.payload)
        }
    }
})

export const { SET_FAV_CHARACTERS } = favSlice.actions;

export const selectFavCharacters = (state) => state.fav.favCharacters;

export default favSlice.reducer;