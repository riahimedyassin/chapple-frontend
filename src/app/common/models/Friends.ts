export type FriendSendUser = {
  username: string;
  email: string;
};

export class Friend {
  constructor(
    public readonly sent_by: FriendSendUser,
    public readonly sent_to: FriendSendUser,
    public readonly id: string,
    public readonly sent_at: Date
  ) {}
}
export class FriendRequest {}
