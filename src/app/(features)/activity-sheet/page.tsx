"use client"

import { Separator } from '@components/ui/separator'
import ActivityDetail from '@components/activity-sheet/activity-detail'
import { useState } from 'react'
import ActivityStudents from '@components/activity-sheet/activity-students'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button } from '@components/ui/button'
import { api } from '@/libs/api'
import { toast } from 'sonner'
import PDFPagination from '@components/pdf-pagination'

export const ActivitySheetSchema = Yup.object().shape({
  sheets: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().required(),
      activityName: Yup.string().required('กรุณากรอกชื่อกิจกรรม'),
      date: Yup.string(),
      startPeriod: Yup.string(),
      endPeriod: Yup.string(),
      TTitle: Yup.string(),
      TFirstName: Yup.string().required('กรุณากรอกชื่อจริง'),
      TLastName: Yup.string().required('กรุณากรอกนามสกุล'),
      TPosition: Yup.string().required('กรุณากรอกตำแหน่ง'),
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

const createEmptySheet = (id: number) => ({
  id,
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
})

const initialValues = {
  sheets: [createEmptySheet(1)]
}

const ActivitySheetPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
          window.alert(JSON.stringify(values, null, 2))
          // try {
          //   const { data, error } = await api.activity.generate.post(values)
          //   switch (error?.status) {
          //     case 400:
          //       toast.error(error.value)
          //       return
          //     case 500:
          //       toast.error('Failed to generate PDF. Please try again.')
          //       return
          //   }
          //   toast.success('PDF is created successfully.')
          //   const link = document.createElement('a')
          //   const dataUri = data?.startsWith('data:') ? data : `data:application/pdf;base64,${data}`
          //   link.href = dataUri
          //   link.download = `activity-sheet-${new Date().getTime()}.pdf`
          //   document.body.appendChild(link)
          //   link.click()
          //   document.body.removeChild(link)
          // } catch (error) {
          //   console.error('Error generating PDF:', error)
          //   setStatus('Failed to generate PDF. Please try again.')
          // } finally {
          //   setSubmitting(false)
          // }
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="w-full max-w-md md:max-w-4xl lg:max-w-6xl">
            
            <PDFPagination
              currentPage={currentPage}
              totalPages={values.sheets.length}
              onPageChange={(page) => setCurrentPage(page)}
              onAddPage={async () => {
                const newId = values.sheets.length + 1;
                await setFieldValue('sheets', [...values.sheets, createEmptySheet(newId)]);
                setCurrentPage(newId);
              }}
              onRemovePage={async (page) => {
                if (values.sheets.length <= 1) {
                  return;
                }

                const newSheets = values.sheets
                  .filter((_, index) => index !== page - 1)
                  .map((sheet) => ({
                    ...sheet,
                    id: sheet.id > page ? sheet.id - 1 : sheet.id
                  }));

                if (currentPage === page) {
                  setCurrentPage(Math.max(1, page - 1));
                } else if (currentPage > page) {
                  setCurrentPage(currentPage - 1);
                }

                await setFieldValue('sheets', newSheets);
              }}
            />

            <div className="w-full md:grid md:grid-cols-2 gap-x-3">
              <div className="hidden md:flex md:w-full border md:justify-center md:items-center">
                Some Image Logo
              </div>
              <section className="mt-10 w-full flex flex-col items-center">
                <ActivityDetail
                  namePrefix={`sheets.${currentPage - 1}`} 
                />
              </section>
            </div>
            <section className="mt-10 w-full">
              <ActivityStudents
                namePrefix={`sheets.${currentPage - 1}.students`}
              />
            </section>
            <div className="mt-10 flex justify-center">
              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="w-full max-w-md"
              >
                {isSubmitting ? "กำลังพิมพ์..." : "พิมพ์ใบกิจกรรม"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default ActivitySheetPage
