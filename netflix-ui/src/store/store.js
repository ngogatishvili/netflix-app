import axios from "axios"
import {configureStore,createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import {TMDB_BASE_URL,API_KEY} from "../utils/constants"

const initialState={
    movies:[],
    genresLoaded:false,
    genres:[],
    currentMovieTrailer:null,
    message:null,
    
}


export const getGenres=createAsyncThunk('netflix/genres',async()=>{
    const {data:{genres}}=await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return genres;
})

export const fetchDataByGenre=createAsyncThunk("netflix/bygenre",async({genre,type},thunkApi)=>{
    const {netflix:{genres}}=thunkApi.getState();
    const data=await createRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,genres);
    return data;
})

const createArrayFromData=(array,movieList,genres)=>{
    array.forEach(movie=>{
        const movieGenres=[];
        movie.genre_ids.forEach(genreId=>{
            const genre=genres.find(({id})=>id===genreId);
            if(genre) movieGenres.push(genre.name);
        });

        if(movie.backdrop_path) {
            movieList.push({
                id:movie.id,
                name:movie?.original_name? movie.original_name:movie.original_title,
                image:movie.backdrop_path,
                genres:movieGenres.slice(0,3)
            })
        }
    })
}

const createRawData=async(api,genres,paging)=>{
        const movieList=[];
        for(let i=1;movieList.length<60&&i<10;i++) {
            const {data:{results}}=await axios.get(`${api}${paging?`&page=${i}`:''}`);
            createArrayFromData(results,movieList,genres);
            
        }

        return movieList;
}

export const fetchMovies=createAsyncThunk('netflix/movies',async({type},thunkApi)=>{
    const {netflix:{genres}}=thunkApi.getState();
    const data=await createRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true);
    return data;
})


export const getTrailer=createAsyncThunk('netflix/trailer',async(id)=>{
   
        const {data:{results}}=await axios.get(`${TMDB_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    return results;

   
})
    










const NetflixSlice=createSlice({
    name:"netflix",
    initialState,
    reducers:{
        setMessage:(state,action)=>{
            state.message=action.payload;
        },
        getMyMovies:(state,action)=>{
            state.movies=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getGenres.fulfilled,(state,action)=>{
            state.genres=action.payload;
            state.genresLoaded=true;
        })
        .addCase(fetchMovies.fulfilled,(state,action)=>{
                state.movies=action.payload;
        })
        .addCase(getTrailer.fulfilled,(state,action)=>{
                state.currentMovieTrailer=action.payload;
                state.message="";
        })
        .addCase(getTrailer.rejected,(state,action)=>{
                state.message="trailer is not found for this movie";
                state.currentMovieTrailer=null;
        })
        .addCase(fetchDataByGenre.fulfilled,(state,action)=>{
            state.movies=action.payload;
        })
    }
    
    
    

})

export const {setMessage,getMyMovies}=NetflixSlice.actions;

export const store=configureStore({
    reducer:{
        netflix:NetflixSlice.reducer
    }
})

