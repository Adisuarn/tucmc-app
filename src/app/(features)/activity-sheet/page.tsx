"use client"

import { Separator } from '@components/ui/separator'
import ActivityDetail from '@components/activity-sheet/activity-detail'
import React from 'react'
import ActivityStudents from '@/app/components/activity-sheet/activity-students'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button } from '@components/ui/button'
import { api } from '@/libs/api'
import { toast } from 'sonner'
import { PlusCircle } from 'lucide-react'

const ActivitySheetSchema = Yup.object().shape({
  activityName: Yup.string(),
  date: Yup.string(),
  startPeriod: Yup.number(),
  endPeriod: Yup.number(),
  TTitle: Yup.string(),
  TFirstName: Yup.string(),
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

const initialValues = {
  activityName: '',
  date: '',
  startPeriod: '1',
  endPeriod: '8',
  room: '',
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
      number: '',
    }
  ]
}

const ActivitySheetPage = () => {

  const [sheetCount, setSheetCount] = React.useState(1)

  const combinedInitialValues = {
    sheets: Array(sheetCount).fill(initialValues)
  }
  
  return (
    <section className="flex flex-col font-noto-sans-thai items-center my-10 px-5">
      <div className='w-full mt-5 max-w-md md:max-w-4xl lg:max-w-6xl '>
        <h2 className='text-3xl'>
          พิมพ์ใบกิจกรรม
        </h2>
        <Separator />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ActivitySheetSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const { data, error } = await api.activity.generate.post(values)
            switch (error?.status) {
              case 400:
                toast.error(error.value)
                return
              case 500:
                toast.error('Failed to generate PDF. Please try again.')
                return
            }
            toast.success('PDF is created successfully.')
            const link = document.createElement('a')
            const dataUri = data?.startsWith('data:') ? data : `data:application/pdf;base64,${data}`
            link.href = dataUri
            link.download = `activity-sheet-${new Date().getTime()}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } catch (error) {
            console.error('Error generating PDF:', error)
            setStatus('Failed to generate PDF. Please try again.')
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-md md:max-w-4xl lg:max-w-6xl">
            <div className="w-full md:grid md:grid-cols-2 gap-x-3">
              <div className="hidden md:flex md:w-full border md:justify-center md:items-center">
                Some Image Logo
              </div>
              <section className="mt-10 w-full flex flex-col items-center">
                <ActivityDetail />
              </section>
            </div>
            <section className="mt-10 w-full">
              <ActivityStudents />
            </section>
            <div className="mt-10 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full max-w-md"
              >
                {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default ActivitySheetPage
