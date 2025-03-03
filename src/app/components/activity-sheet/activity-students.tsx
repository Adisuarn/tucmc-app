import React from 'react'
import { useFormikContext, FieldArray } from 'formik'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import { cn } from '@/libs/utils'
import { ActivitySheetSchema } from '@/app/(features)/activity-sheet/page'

interface Props {
  namePrefix: string;
}

interface Student {
  title: string
  firstName: string
  lastName: string
  level: string
  number: string
}

const ActivityStudents = ({ namePrefix }: Props) => {
  //eslint-disable-next-line
  const { values, setFieldValue, errors, touched } = useFormikContext<any>()
  const sheetIndex = namePrefix.split('.')[1]!;
  const students = values.sheets?.[sheetIndex]?.students || [];

  const getFieldError = (index: number, field: keyof Student): string | undefined => {
    //@ts-expect-error : ignore
    if (!errors.sheets?.[sheetIndex]?.students ||
      //@ts-expect-error : ignore
      !touched.sheets?.[sheetIndex]?.students) return undefined;

    //@ts-expect-error : ignore
    const studentErrors = errors.sheets[sheetIndex]?.students?.[index];
    //@ts-expect-error : ignore
    const studentTouched = touched.sheets[sheetIndex]?.students?.[index];

    if (!studentErrors || !studentTouched) return undefined;
    return studentTouched[field] ? studentErrors[field] : undefined;
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <h3 className='text-xl'>รายชื่อนักเรียน</h3>
        <p className='text-sm text-gray-500 mt-1'>เพิ่มรายชื่อนักเรียนที่เข้าร่วมกิจกรรม</p>
        <Separator className="mt-3" />
      </div>

      <FieldArray
        name={namePrefix}
        render={arrayHelpers => (
          <div className="space-y-6 md:grid md:grid-cols-3 md:gap-3">
            {students.map((student: Student, index: number) => (
              <div
                key={index}
                className="p-4 border rounded-lg space-y-4 shadow-xs min-h-[400px] h-full"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">นักเรียนคนที่ {index + 1}</h4>
                  {students.length > 1 && (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                      className="text-red-500 text-sm hover:text-red-600"
                    >
                      ลบ
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Label className={getFieldError(index, 'title') ? 'text-red-500' : ''}>
                      คำนำหน้า
                    </Label>
                    <Select
                      value={student.title}
                      onValueChange={(value) => setFieldValue(`${namePrefix}.${index}.title`, value)}
                    >
                      <SelectTrigger className={cn("whitespace-nowrap", getFieldError(index, 'title') ? 'border-red-500' : '')}>
                        <SelectValue placeholder="เลือกคำนำหน้า" className="text-ellipsis overflow-hidden" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="เด็กชาย">เด็กชาย</SelectItem>
                        <SelectItem value="เด็กหญิง">เด็กหญิง</SelectItem>
                        <SelectItem value="นาย">นาย</SelectItem>
                        <SelectItem value="นางสาว">นางสาว</SelectItem>
                      </SelectContent>
                    </Select>
                    {getFieldError(index, 'title') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError(index, 'title')}</p>
                    )}
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <Label className={getFieldError(index, 'level') ? 'text-red-500' : ''}>
                      ชั้น
                    </Label>
                    <Select
                      value={student.level}
                      onValueChange={(value) => setFieldValue(`${namePrefix}.${index}.level`, value)}
                    >
                      <SelectTrigger className={getFieldError(index, 'level') ? 'border-red-500' : ''}>
                        <SelectValue placeholder="เลือกชั้น" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ม.4">ม.4</SelectItem>
                        <SelectItem value="ม.5">ม.5</SelectItem>
                        <SelectItem value="ม.6">ม.6</SelectItem>
                      </SelectContent>
                    </Select>
                    {getFieldError(index, 'level') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError(index, 'level')}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label className={getFieldError(index, 'firstName') ? 'text-red-500' : ''}>
                      ชื่อจริง
                    </Label>
                    <Input
                      value={student.firstName}
                      onChange={e => setFieldValue(`${namePrefix}.${index}.firstName`, e.target.value)}
                      placeholder="ชื่อจริง"
                      className={getFieldError(index, 'firstName') ? 'border-red-500' : ''}
                    />
                    {getFieldError(index, 'firstName') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError(index, 'firstName')}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label className={getFieldError(index, 'lastName') ? 'text-red-500' : ''}>
                      นามสกุล
                    </Label>
                    <Input
                      value={student.lastName}
                      onChange={e => setFieldValue(`${namePrefix}.${index}.lastName`, e.target.value)}
                      placeholder="นามสกุล"
                      className={getFieldError(index, 'lastName') ? 'border-red-500' : ''}
                    />
                    {getFieldError(index, 'lastName') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError(index, 'lastName')}</p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label className={getFieldError(index, 'number') ? 'text-red-500' : ''}>
                      เลขที่
                    </Label>
                    <Input
                      type="text"
                      value={student.number}
                      onChange={e => setFieldValue(`${namePrefix}.${index}.number`, e.target.value)}
                      placeholder="เลขที่"
                      minLength={1}
                      maxLength={2}
                      className={getFieldError(index, 'number') ? 'border-red-500' : ''}
                    />
                    {getFieldError(index, 'number') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError(index, 'number')}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {students.length < 6 && (
              <button
                type="button"
                onClick={() => {
                  arrayHelpers.push({
                    title: '',
                    firstName: '',
                    lastName: '',
                    level: '',
                    number: ''
                  })
                }}
                className="w-full min-h-[50px] md:min-h-[400px] border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2"
              >
                <span>+ เพิ่มรายชื่อนักเรียน</span>
                <span className="text-sm text-gray-400">
                  (เพิ่มได้อีก {6 - students.length} คน)
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
