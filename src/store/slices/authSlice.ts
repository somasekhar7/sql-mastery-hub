import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Dummy users for testing
const dummyUsers = [
  { id: '1', email: 'john@example.com', password: 'password123', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
  { id: '2', email: 'jane@example.com', password: 'password123', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
  { id: '3', email: 'admin@example.com', password: 'admin123', name: 'Admin User', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' }
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginFailure: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    register: (state, action: PayloadAction<{ email: string; password: string; name: string }>) => {
      // In a real app, this would make an API call
      const newUser: User = {
        id: Date.now().toString(),
        email: action.payload.email,
        name: action.payload.name,
      };
      state.user = newUser;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
      }
    },
  },
});

// Thunk for dummy login
export const loginUser = (email: string, password: string) => {
  return (dispatch: any) => {
    dispatch(loginStart());
    
    // Simulate API call delay
    setTimeout(() => {
      const user = dummyUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        dispatch(loginSuccess(userWithoutPassword));
      } else {
        dispatch(loginFailure());
      }
    }, 1000);
  };
};

export const { loginStart, loginSuccess, loginFailure, logout, register, updateAvatar } = authSlice.actions;
export default authSlice.reducer;