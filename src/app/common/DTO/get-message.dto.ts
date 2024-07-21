export class GetMessageDto {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly from: 'me' | 'user',
    public readonly sent_at: Date
  ) {}
}
