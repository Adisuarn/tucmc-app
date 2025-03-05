import * as Yup from 'yup'
import type { SelectOption } from './types'

export const createEmptySheet = (id: number) => ({
  id,
  activityName: '',
  date: '',
  startPeriod: '1',
  endPeriod: '8',
  room: '',
  TFirstName: '',
  TLastName: '',
  TPosition: '',
  students: [
    {
      title: '',
      firstName: '',
      lastName: '',
      level: '',
      number: '',
    }
  ]
})

export const ActivitySheetSchema = Yup.object().shape({
  sheets: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(),
      activityName: Yup.string().required('กรุณากรอกชื่อกิจกรรม'),
      date: Yup.string(),
      startPeriod: Yup.string(),
      endPeriod: Yup.string(),
      TFirstName: Yup.string().required('กรุณากรอกชื่อจริง'),
      TLastName: Yup.string(),
      TPosition: Yup.string(),
      room: Yup.string().required('กรุณากรอกห้อง').min(1, 'เลขห้องต้องมากกว่า 0'),
      students: Yup.array().of(
        Yup.object().shape({
          title: Yup.string().required('กรุณาเลือกคำนำหน้า'),
          firstName: Yup.string().required('กรุณากรอกชื่อจริง'),
          lastName: Yup.string().required('กรุณากรอกนามสกุล'),
          level: Yup.string().required('กรุณาเลือกระดับชั้น'),
          number: Yup.string().required('กรุณากรอกเลขที่'),
        })
      )
    })
  )
})

export const initialValues = {
  sheets: [createEmptySheet(1)]
}

export const TITLE_OPTIONS: SelectOption[] = [
  { value: 'เด็กชาย', label: 'เด็กชาย' },
  { value: 'เด็กหญิง', label: 'เด็กหญิง' },
  { value: 'นาย', label: 'นาย' },
  { value: 'นางสาว', label: 'นางสาว' },
]

export const LEVEL_OPTIONS: SelectOption[] = [
  { value: 'ม.4', label: 'ม.4' },
  { value: 'ม.5', label: 'ม.5' },
  { value: 'ม.6', label: 'ม.6' },
]

export const MAX_STUDENTS = 6

export const INITIAL_STUDENT = {
  title: '',
  firstName: '',
  lastName: '',
  level: '',
  number: ''
}

