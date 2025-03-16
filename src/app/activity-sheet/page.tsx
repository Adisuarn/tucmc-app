"use client"

import { Separator } from '@components/ui/separator'
import ActivityDetail from '@components/activity-sheet/activity-detail'
import { useState } from 'react'
import ActivityStudents from '@components/activity-sheet/activity-students'
import { Formik, Form, FormikErrors } from 'formik'
import { Button } from '@components/ui/button'
import { api } from '@/libs/api'
import { toast } from 'sonner'
import PDFPagination from '@components/pdf-pagination'
import { cn } from '@/libs/utils'
import { Loader2 } from "lucide-react";
import { ActivitySheetSchema, initialValues, createEmptySheet } from '@components/activity-sheet/constants'
import { AddNotes } from '@/vectors/AddNotes'

const ActivitySheetPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const isPageValid = (errors: FormikErrors<{ sheets: typeof initialValues.sheets }>, pageIndex: number) => {
    const pageErrors = errors.sheets?.[pageIndex];
    return !pageErrors;
  };

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
        validateOnMount={false}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { data, error } = await api.activity.generate.post(values)
            switch (error?.status) {
              case 400:
                toast.error(error.value)
                return
              case 422:
                toast.error(error.value.message)
                return
              case 500:
                toast.error('Failed to generate PDF. Please try again')
                return
            }
            toast.success('PDF is created successfully')
            const link = document.createElement('a')
            const dataUri = data?.startsWith('data:') ? data : `data:application/pdf;base64,${data}`
            link.href = dataUri
            link.download = `activity-sheet-${new Date().getTime()}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } catch (error) {
            console.error('Error generating PDF:', error)
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ values, isSubmitting, setFieldValue, errors }) => (
          <Form className="w-full max-w-md md:max-w-4xl lg:max-w-6xl">
            
            <PDFPagination
              currentPage={currentPage}
              totalPages={values.sheets.length}
              pageValidation={values.sheets.map((_, index) => isPageValid(errors, index))}
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
              <div className="hidden md:flex md:w-full md:justify-center md:items-center md:p-10">
                <AddNotes />
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
                className={cn(
                  "w-full max-w-md relative",
                  isSubmitting && "cursor-not-allowed opacity-70"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    กำลังพิมพ์...
                  </>
                ) : (
                  "พิมพ์ใบกิจกรรม"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default ActivitySheetPage
