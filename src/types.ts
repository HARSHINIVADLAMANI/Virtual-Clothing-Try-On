export interface CameraKitConfig {
  apiToken: string;
  lensId: string;
  lensGroupId: string;
}

export interface CameraState {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
}
