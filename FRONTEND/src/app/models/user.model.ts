export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public name: string,
    public role: string,
    public avatar: string,
    public creationAt: string,
    public updatedAt: string
  ) {}
}