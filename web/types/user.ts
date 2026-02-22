export type UserRole = 'buyer' | 'agent' | 'agency_admin' | 'platform_admin';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  agency_id: number | null;
}
