import { GetUser } from '@common/types/GetUser.type';

export class GetFriendRequestDto {
  constructor(
    public readonly sent_at: Date,
    public readonly sent_by: GetUser,
    public readonly id: number
  ) {}
}
