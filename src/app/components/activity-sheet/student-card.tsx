import type { Student } from './types'
import { StudentFormField } from './student-form'
import { TITLE_OPTIONS, LEVEL_OPTIONS } from './constants'

interface StudentCardProps {
  student: Student
  index: number
  canDelete: boolean
  onDelete: () => void
  onFieldChange: (field: keyof Student, value: string) => void
  getFieldError: (field: keyof Student) => string | undefined
}

export const StudentCard = ({
  student,
  index,
  canDelete,
  onDelete,
  onFieldChange,
  getFieldError
}: StudentCardProps) => {
  return (
    <div className="p-4 border rounded-lg space-y-4 shadow-xs min-h-[400px] h-full">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">นักเรียนคนที่ {index + 1}</h4>
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-red-500 text-sm hover:text-red-600"
          >
            ลบ
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StudentFormField
          label="คำนำหน้า"
          field="title"
          value={student.title}
          error={getFieldError('title')}
          onChange={(value) => onFieldChange('title', value)}
          type="select"
          options={TITLE_OPTIONS}
        />
        <StudentFormField
          label="ชื่อ"
          field="firstName"
          value={student.firstName}
          error={getFieldError('firstName')}
          onChange={(value) => onFieldChange('firstName', value)}
          inputProps={{
            placeholder: "ชื่อจริง"
          }}
        />
        <StudentFormField
          label="นามสกุล"
          field="lastName"
          value={student.lastName}
          error={getFieldError('lastName')}
          onChange={(value) => onFieldChange('lastName', value)}
          inputProps={{
            placeholder: "นามสกุล"
          }}
        />
        <StudentFormField
          label="ระดับชั้น"
          field="level"
          value={student.level}
          error={getFieldError('level')}
          onChange={(value) => onFieldChange('level', value)}
          type="select"
          options={LEVEL_OPTIONS}
        />
        <StudentFormField
          label="เลขที่"
          field="number"
          value={student.number}
          error={getFieldError('number')}
          onChange={(value) => onFieldChange('number', value)}
          inputProps={{
            type: 'number',
            min: 1,
            max: 50,
            placeholder: "เลขที่"
          }}
        />
      </div>
    </div>
  )
}
