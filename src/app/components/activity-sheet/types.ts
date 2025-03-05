export interface Student {
  title: string;
  firstName: string;
  lastName: string;
  level: string;
  number: string;
}

export interface ActivitySheet {
  id: number
  activityName: string
  date: string
  startPeriod: string
  endPeriod: string
  TFirstName: string
  TLastName: string
  TPosition: string
  room: string
  students: Student[];
}

export interface ActivityFormValues {
  sheets: ActivitySheet[];
}

export type StudentField = keyof Student;

export interface SelectOption {
  value: string;
  label: string;
}
