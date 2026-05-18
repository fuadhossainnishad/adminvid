export interface IUserProfile {
  profile_picture: string | null;
  language: string;
  total_points: number;
  confidence_level: number;
  is_verified: boolean;
  full_name: string;
  email: string;
}

export interface IProfileResponse {
  code: number;
  success: boolean;
  message: string;
  timestamp: number;
  data: IUserProfile;
}