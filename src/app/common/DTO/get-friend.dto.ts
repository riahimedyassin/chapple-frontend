import { friend } from '@common/types';

export class GetFriendDto {
  public readonly id: number;
  public readonly sent_at: Date;
  public readonly friend: friend;
}
