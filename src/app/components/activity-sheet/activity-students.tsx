import { useFormikContext, FieldArray } from 'formik'
import { Separator } from '@components/ui/separator'
import type { ActivityFormValues, Student } from './types'
import { StudentCard } from './student-card'
import { MAX_STUDENTS, INITIAL_STUDENT } from './constants'

interface Props {
  namePrefix: string
}

const ActivityStudents = ({ namePrefix }: Props) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<ActivityFormValues>()
  const sheetIndex = Number(namePrefix.split('.')[1]!)
  const students = values.sheets?.[sheetIndex]?.students ?? []

  const getFieldError = (index: number) => (field: keyof Student): string | undefined => {
    const sheetErrors = typeof errors.sheets?.[sheetIndex] === 'string' ? undefined : errors.sheets?.[sheetIndex]
    const studentErrors = sheetErrors?.students?.[index]
    const studentTouched = touched.sheets?.[sheetIndex]?.students?.[index]
    return studentTouched?.[field] && typeof studentErrors !== 'string' ? studentErrors?.[field] : undefined
  }

  const handleStudentFieldChange = (index: number) => async (field: keyof Student, value: string) => {
    await setFieldValue(`${namePrefix}.${index}.${field}`, value)
  }

  return (
    <div className="w-full">
      <div className="mb-5">
        <h3 className="text-xl">รายชื่อนักเรียน</h3>
        <p className="text-sm text-gray-500 mt-1">เพิ่มรายชื่อนักเรียนที่เข้าร่วมกิจกรรม</p>
        <Separator className="mt-3" />
      </div>

      <FieldArray
        name={namePrefix}
        render={arrayHelpers => (
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-3">
            {students.map((student: Student, index: number) => (
              <StudentCard
                key={index}
                student={student}
                index={index}
                canDelete={students.length > 1}
                onDelete={() => arrayHelpers.remove(index)}
                onFieldChange={handleStudentFieldChange(index)}
                getFieldError={getFieldError(index)}
              />
            ))}

            {students.length < MAX_STUDENTS && (
              <button
                type="button"
                onClick={() => arrayHelpers.push(INITIAL_STUDENT)}
                className="w-full min-h-[50px] md:min-h-[400px] border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <span>+ เพิ่มรายชื่อนักเรียน</span>
                <span className="text-sm text-gray-400">
                  (เพิ่มได้อีก {MAX_STUDENTS - students.length} คน)
                </span>
              </button>
            )}
          </div>
        )}
      />
    </div>
  )
}

export default ActivityStudents
