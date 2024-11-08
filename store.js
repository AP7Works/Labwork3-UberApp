import { configureStore } from '@reduxjs/toolkit';
import authReducer from './config/authSlice';  // Update path to where authSlice is located
import navReducer from './slices/navSlice';    // Import other slices (e.g., navSlice)

const store = configureStore({
  reducer: {
    auth: authReducer,   // Add auth slice to the store
    nav: navReducer,     // Add nav slice to the store
  },
});

export default store;
