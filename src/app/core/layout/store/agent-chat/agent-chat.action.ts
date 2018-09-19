import { Action } from '@ngrx/store';

export const GET_AGENT_LIVE_CHAT_ATTEMPT = 'GET_AGENT_LIVE_CHAT_ATTEMPT';
export const GET_AGENT_LIVE_CHAT_SUCCESS = 'GET_AGENT_LIVE_CHAT_SUCCESS';
export const GET_AGENT_CLOSE_CHAT_ATTEMPT = 'GET_AGENT_CLOSE_CHAT_ATTEMPT';
export const GET_AGENT_CLOSE_CHAT_SUCCESS = 'GET_AGENT_LIVE_CHAT_SUCCESS';

export class GetAgentLiveChatAttempt implements Action {
  readonly type = GET_AGENT_LIVE_CHAT_ATTEMPT;
}

export class GetAgentLiveChatSuccess implements Action {
  readonly type = GET_AGENT_LIVE_CHAT_SUCCESS;
  constructor(public payload: any) { }
}

export class GetAgentCloseChatSuccess implements Action {
    readonly type = GET_AGENT_CLOSE_CHAT_SUCCESS;
    constructor(public payload: any) { }
}

export class GetAgentCloseChatAttempt implements Action {
    readonly type = GET_AGENT_CLOSE_CHAT_ATTEMPT;
}

export type AgentChatActions = GetAgentLiveChatAttempt | GetAgentLiveChatSuccess | GetAgentCloseChatAttempt | GetAgentCloseChatSuccess;
