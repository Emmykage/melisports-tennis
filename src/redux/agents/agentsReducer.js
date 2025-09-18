import { createReducer, createSelector } from '@reduxjs/toolkit';
import { createAgents, getAgents, updateAgent } from '../actions/agents';

const initialState = {
  agents: [],
  agent: null,
  loading: false,
};

// const agentsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'FETCH_AGENTS_REQUEST':
//       return { ...state, loading: true }
//     case 'FETCH_AGENTS_SUCCESS':
//       return { ...state, loading: false, agents: action.payload }
//     case 'FETCH_AGENTS_FAILURE':
//       return { ...state, loading: false }
//     case 'ADD_AGENT':
//       return { ...state, agents: [...state.agents, action.payload] }
//     case 'UPDATE_AGENT':
//       return {
//         ...state,
//         agents: state.agents.map((agent) =>
//           agent.id === action.payload.id ? action.payload : agent
//         ),
//       }
//     case 'DELETE_AGENT':
//       return {
//         ...state,
//         agents: state.agents.filter((agent) => agent.id !== action.payload),
//       }
//     default:
//       return state
//   }
// }

const agentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createAgents.fulfilled, (state, action) => {
      state.loading = true;
      state.agent = action.payload.data ?? action.payload;
    })
    .addCase(createAgents.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    })
    .addCase(getAgents.fulfilled, (state, action) => {
      state.loading = false;
      state.agents = action.payload;
    })
    .addCase(getAgents.rejected, (state, action) => {
      state.loading = false;
    })
    .addCase(updateAgent.fulfilled, (state, action) => {
      state.loading = false;
    });
});

export default agentsReducer;
export const agentState = (state) => state.agent;

const selectLoading = createSelector(agentState, ({ loading }) => loading);
