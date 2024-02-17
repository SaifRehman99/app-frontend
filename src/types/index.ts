export type NotFoundType = {
  text: string;
  height?: number;
  width?: number;
  customSvg?: any;
};

export type ErrorType = {
  text?: string | boolean;
  buttonLink?: string;
  buttonText?: string;
};

export type AuthForm = {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};
