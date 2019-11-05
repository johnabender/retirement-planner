import { configureStore } from 'redux-starter-kit';

import { calculatorApp } from './reducers';

const store = configureStore({ reducer: calculatorApp });

export default store;
