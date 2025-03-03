import { t, error } from 'elysia'
import { StringField } from '@/server/utils/validators'

export interface student {
  title: string,
  firstName: string,
  lastName: string,
  level: string,
  number: string
}

export interface docData {
  id: string
  activityName: string,
  date: string,
  startPeriod: string,
  endPeriod: string,
  room: string,
  TTitle: string,
  TFirstName: string,
  TLastName: string,
  TPosition: string,
  students: student[]
}

export const pdfGenerateBody = t.Object({
  sheets: t.Array(t.Object({
    id: t.String(),
    activityName: StringField('Please provide an activity name'),
    date: StringField('Please provide a date'),
    startPeriod: StringField('Please provide a start period'),
    endPeriod: StringField('Please provide an end period'),
    room: StringField('Please provide a room'),
    TTitle: StringField('Please provide teacher title'),
    TFirstName: StringField('Please provide teacher first name'),
    TLastName: StringField('Please provide teacher last name'),
    TPosition: t.String({ error: 'Please provide a position' }),
    students: t.Array(t.Object({
      title: StringField('Please provide student title'),
      firstName: StringField('Please provide student first name'),
      lastName: StringField('Please provide student last name'),
      level: StringField('Please provide student level'),
      number: StringField('Please provide student number'),
    }))
  }))
})
