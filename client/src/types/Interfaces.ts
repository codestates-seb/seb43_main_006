export interface Sample {
  string: string;
  number: number;
  boolean: boolean;
  object: object;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface SignInfo {
  realName: string;
  displayName: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  mailKey: string;
}

export interface BtnProps {
  children: string;
  width: string;
  height: string;
  bg: string;
  color: string;
  fontSize: string;
  fontWeight?: string;
  border?: string;
  borderRadious?: string;
  onClick: () => void;
}

export interface Icon {
  icon: string;
}
