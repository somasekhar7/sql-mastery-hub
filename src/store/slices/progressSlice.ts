import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProblemProgress {
  problemId: string;
  solved: boolean;
  attempts: number;
  lastAttempt?: string;
}

interface ProgressState {
  solvedProblems: { [key: string]: ProblemProgress };
  totalSolved: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

const initialState: ProgressState = {
  solvedProblems: {
    // Dummy data for demonstration
    'crud-select-1': { problemId: 'crud-select-1', solved: true, attempts: 2 },
    'basic-where-1': { problemId: 'basic-where-1', solved: true, attempts: 1 },
    'joins-inner-1': { problemId: 'joins-inner-1', solved: true, attempts: 3 },
  },
  totalSolved: 3,
  easyCount: 2,
  mediumCount: 1,
  hardCount: 0,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markProblemSolved: (state, action: PayloadAction<{ problemId: string; difficulty: 'Easy' | 'Medium' | 'Hard' }>) => {
      const { problemId, difficulty } = action.payload;
      
      if (!state.solvedProblems[problemId]?.solved) {
        // New solved problem
        state.solvedProblems[problemId] = {
          problemId,
          solved: true,
          attempts: state.solvedProblems[problemId]?.attempts || 1,
          lastAttempt: new Date().toISOString()
        };
        
        state.totalSolved++;
        
        if (difficulty === 'Easy') state.easyCount++;
        else if (difficulty === 'Medium') state.mediumCount++;
        else if (difficulty === 'Hard') state.hardCount++;
      }
    },
    
    incrementAttempt: (state, action: PayloadAction<string>) => {
      const problemId = action.payload;
      if (state.solvedProblems[problemId]) {
        state.solvedProblems[problemId].attempts++;
      } else {
        state.solvedProblems[problemId] = {
          problemId,
          solved: false,
          attempts: 1,
          lastAttempt: new Date().toISOString()
        };
      }
    },
    
    resetProgress: (state) => {
      state.solvedProblems = {};
      state.totalSolved = 0;
      state.easyCount = 0;
      state.mediumCount = 0;
      state.hardCount = 0;
    }
  }
});

export const { markProblemSolved, incrementAttempt, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
