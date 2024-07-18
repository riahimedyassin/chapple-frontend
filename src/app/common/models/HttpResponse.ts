export class HttpResponse<T> {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly data: NonNullable<T>
  ) {}
}
