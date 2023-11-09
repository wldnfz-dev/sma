export enum Role {
  USER = 'USER',
  ADMIN_RENKEU = 'ADMIN_RENKEU',
  USER_RENKEU = 'USER_RENKEU',
  USER_KABAKUM = 'USER_KABAKUM',
  USER_DIREKTUR = 'USER_DIREKTUR',
  USER_PPK = 'USER_PPK',
}

type User = {
  id: string;
  email: string;
  password: string;
  role: string;
};

export interface IAuthenticate {
  user: User;
  token: string;
}
