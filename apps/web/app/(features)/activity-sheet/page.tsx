'use client'

import { Typography } from '@tucc/ui/typography'
import { Separator } from '@tucc/ui/separator'
import ActivityDetail from '@components/activity-sheet/activity-detail'
import React from 'react'
import ActivityStudents from '@/app/components/activity-sheet/activity-students'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button } from '@tucc/ui/button'

const ActivitySheetSchema = Yup.object().shape({
  activityName: Yup.string(),
  date: Yup.string(),
  startPeriod: Yup.number(),
  endPeriod: Yup.number(),
  TTitle: Yup.string(),
  TFirstName: Yup.string(),
  TLastName: Yup.string(),
  TPosition: Yup.string(),
  students: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('กรุณาเลือกคำนำหน้า'),
      firstName: Yup.string().required('กรุณากรอกชื่อจริง'),
      lastName: Yup.string().required('กรุณากรอกนามสกุล'),
      level: Yup.string().required('กรุณาเลือกระดับชั้น'),
      room: Yup.number().required('กรุณากรอกห้อง').min(1, 'ห้องต้องมากกว่า 0'),
      number: Yup.number().required('กรุณากรอกเลขที่').min(1, 'เลขที่ต้องมากกว่า 0').max(50, 'เลขที่ต้องไม่เกิน 50')
    })
  )
})

const initialValues = {
  // Activity Detail Values
  activityName: '',
  date: '',
  startPeriod: '',
  endPeriod: '',
  TTitle: '',
  TFirstName: '',
  TLastName: '',
  TPosition: '',
  students: [
    {
      title: '',
      firstName: '',
      lastName: '',
      level: '',
      room: '',
      number: ''
    }
  ]
}

const ActivitySheetPage = () => {
  return (
    <aside className="flex flex-col font-noto-sans-thai items-center my-10 w-full">
      <div className='w-full'>
        <Typography variant='h2' className="text-center">
          พิมพ์ใบกิจกรรม
        </Typography>
        <Separator />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ActivitySheetSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md">
            <section className="mt-10 w-full flex flex-col items-center">
              <ActivityDetail />
            </section>
            <section className="mt-10 w-full">
              <ActivityStudents />
            </section>
            <div className="mt-10 flex justify-center">
              <Button type="submit" disabled={isSubmitting} className="w-full max-w-md">
                {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </aside>
  )
}

export default ActivitySheetPage
