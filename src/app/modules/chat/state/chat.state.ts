

export const ChatStateName = "chat"


export interface ChatStateInterface {
  user?: {
    token: string;
    username: string;
  };
}

export const ChatInitState: ChatStateInterface = {
  user: null,
};
