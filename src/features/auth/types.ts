export type User = {
  name: string;
  email: string;
  venueManager: boolean;
};

export type LoginResponse = User & {
  accessToken: string;
};
