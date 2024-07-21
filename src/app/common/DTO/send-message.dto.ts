export class SendMessageDto {
  constructor(public readonly content: string, public readonly to: string) {}
}
