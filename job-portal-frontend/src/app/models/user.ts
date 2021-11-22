export interface User {
  id: number;
  user_name: string;
  email: string;
  password: string;
  name: string;
  type: number;
  password_token: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
