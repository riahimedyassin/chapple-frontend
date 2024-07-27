type userGroup = {
  id: number;
  userEmail: string;
  groupId: number;
};

export class GetGroupDto {
  public readonly id: number;
  public readonly name: string;
  public readonly ownerEmail: string;
  public readonly user_group: userGroup;
}
