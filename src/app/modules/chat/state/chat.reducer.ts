import { createReducer } from '@ngrx/store';
import { ChatInitState } from './chat.state';

const _chatReducer = createReducer(ChatInitState);

export function ChatReducer(state: any, action: any) {
  return _chatReducer(state, action);
}
