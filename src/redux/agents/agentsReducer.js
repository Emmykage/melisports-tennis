import { createReducer, createSelector } from '@reduxjs/toolkit';
import {
  createAgents, getAgent, getAgentByCode, getAgents, updateAgent,
} from '../actions/agents';

const initialState = {
  agents: [],
  agent: null,
  loading: false,
};

const agentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createAgents.fulfilled, (state, action) => {
      state.loading = false;
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
    })
    .addCase(getAgent.fulfilled, (state, action) => ({
      ...state,
      agent: action.payload.data,
    }))
    .addCase(getAgent.rejected, (state, action) => ({
      ...state,
      agent: action.payload.message,
    }))
    .addCase(getAgent.pending, (state, action) => ({
      ...state,
      loading: true,
    }))
    .addCase(getAgentByCode.fulfilled, (state, action) => ({
      ...state,
      agent: action.payload.data,
    }))
    .addCase(getAgentByCode.rejected, (state, action) => ({
      ...state,
      agent: action.payload.message,
    }))
    .addCase(getAgentByCode.pending, (state, action) => ({
      ...state,
      loading: true,
    }));
});

export default agentsReducer;
export const agentState = (state) => state.agent;

const selectLoading = createSelector(agentState, ({ loading }) => loading);
