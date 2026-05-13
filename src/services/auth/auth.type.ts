export interface IUser {
  id: string;
  email: string;
  full_name: string;
  is_staff: boolean;
  profile: boolean;
}

export interface IAuth {
  access: string;
  refresh: string;
  user: IUser;
}

export interface ISignIn {
  email: string;
  password: string;
}
