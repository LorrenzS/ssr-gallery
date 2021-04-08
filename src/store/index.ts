import { combineReducers, compose, Middleware, Store, createStore as reduxCreateStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import photosReducer from "./photos/reducers";

const rootReducer = combineReducers({
    photosState: photosReducer,
});
  
export type AppState = ReturnType<typeof rootReducer>;

export const createStore = (preloadedState?: Partial<AppState>): Store<AppState> => {
    const middlewares: Middleware[] = [thunkMiddleware];
    return reduxCreateStore(rootReducer, preloadedState || {}, compose(applyMiddleware(...middlewares)));
};

export const store = createStore();
