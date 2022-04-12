export class ClaimError{
  private code: number;
  private message: string;
  constructor(code: number, message:string) {
    this.code = code;
    this.message = message
  }
}
