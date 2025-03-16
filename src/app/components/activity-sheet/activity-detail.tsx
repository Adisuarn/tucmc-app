import { useEffect } from 'react'
import { ThaiDatePicker } from "thaidatepicker-react";
import { Field, ErrorMessage, useField, useFormikContext } from "formik"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Separator } from '@components/ui/separator';

interface Props {
  namePrefix?: string;
}

const PeriodSelect = ({ name }: { name: string }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <Select
      value={field.value}
      onValueChange={(value) => setFieldValue(name, value)}
    >
      <SelectTrigger className="w-full py-5">
        <SelectValue placeholder="เลือกคาบ" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(8)].map((_, i) => (
          <SelectItem key={i + 1} value={String(i + 1)}>
            คาบที่ {i + 1}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ActivityDetail = ({ namePrefix = '' }: Props) => {

  const { setFieldValue } = useFormikContext();
  const [dateField] = useField(`${namePrefix}.date`);

  const currentSheetDate = dateField.value || new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!dateField.value) {
      const initDate = async () => await setFieldValue(`${namePrefix}.date`, new Date().toISOString().split('T')[0]);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      initDate();
    }
  }, [namePrefix, setFieldValue, dateField.value]);

  return (
    <div className="w-full mx-auto">
      <div>
        <h3 className='text-2xl'>กิจกรรม</h3>
        <p className='text-lg text-gray-400 mb-3'>รายละเอียดกิจกรรมที่ต้องการขออนุญาตไปทำ</p>
        <Separator />
      </div>
      <div className='mt-5'>
        <Label htmlFor={`${namePrefix}.activityName`} className="text-lg">ชื่อกิจกรรม</Label>
        <Field as={Input} type="text" name={`${namePrefix}.activityName`} className="p-5" placeholder="เช่น กิจกรรมงานนิทรรศการวิชาการ, ซ้อมการแสดง" />
        <ErrorMessage className='text-red-500 mt-3' name={`${namePrefix}.activityName`} component="div" />
      </div>
      <div className="flex flex-col w-full mt-5">
        <div className="w-full">
          <Label htmlFor={`${namePrefix}.activityDetail`} className="text-lg">วันที่</Label>
          <div className="flex min-w-full w-full justify-center">
            <ThaiDatePicker
              value={currentSheetDate}
              clearable={false}
              customInput={Input}
              inputProps={{
                className: "w-full text-center py-1.5 focus:rounded-sm",
                displayFormat: "DD MMMM YYYY",
              }}
              onChange={async (buddhistDate) => {
                await setFieldValue(`${namePrefix}.date`, buddhistDate);
              }}
            />
          </div>
        </div>

        <div className="flex gap-x-5 mt-5">
          <div className="w-4/8">
            <Label htmlFor={`${namePrefix}.startPeriod`} className="text-lg">ตั้งแต่คาบที่</Label>
            <PeriodSelect name={`${namePrefix}.startPeriod`} />
            <ErrorMessage className='text-red-500 mt-3' name={`${namePrefix}.startPeriod`} component="div" />
          </div>
          <div className="w-4/8">
            <Label htmlFor={`${namePrefix}.endPeriod`} className="text-lg">ถึงคาบที่</Label>
            <PeriodSelect name={`${namePrefix}.endPeriod`} />
            <ErrorMessage className='text-red-500 mt-3' name={`${namePrefix}.endPeriod`} component="div" />
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor={`${namePrefix}.room`} className="text-lg">ห้อง</Label>
          <Field
            as={Input}
            type="text"
            name={`${namePrefix}.room`}
            className="p-5"
            placeholder="เช่น 335"
            minLength={2}
            maxLength={3}
          />
          <ErrorMessage className='text-red-500 mt-3' name={`${namePrefix}.room`} component="div" />
        </div>

      </div>
      <div className="mt-5">
        <h3 className='text-2xl'>ครูผู้ขออนุญาต</h3>
        <p className='text-lg text-gray-400 mb-1'>ชื่อคุณครูผู้รับผิดชอบในการจัดกิจกรรมและขอเวลาเรียน</p>
        <p className='text-md text-gray-400'>หมายเหตุ: ที่ปรึกษาชมรมให้ กรอกในชื่อจริงว่า &quot;ที่ปรึกษาชื่อชมรม&quot; แล้วเว้นว่างช่องอื่น ๆ</p>
        <p className='text-md text-gray-400 mb-3'>หมายเหตุ 2: หากชื่อชมรมยาวเกินไป ให้ตัดชื่อชมรมบางส่วนมาใส่ในช่อง &quot;ตำแหน่ง&quot;</p>
        <Separator />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5">
        <div>
          <Label htmlFor={`${namePrefix}.TFirstName`} className="text-lg">ชื่อจริง</Label>
          <Field as={Input} type="text" name={`${namePrefix}.TFirstName`} className="p-5" placeholder="สมชาย" />
          <ErrorMessage className='text-red-500 mt-3' name={`${namePrefix}.TFirstName`} component="div" />
        </div>
        <div>
          <Label htmlFor={`${namePrefix}.TLastName`} className="text-lg">นามสกุล</Label>
          <Field as={Input} type="text" name={`${namePrefix}.TLastName`} className="p-5" placeholder="ใจดี" />
          <ErrorMessage className='text-red-500 mt-3' name={`${namePrefix}.TLastName`} component="div" />
        </div>
        <div className='col-span-2'>
          <Label htmlFor={`${namePrefix}.TPosition`} className="text-lg">ตำแหน่ง</Label>
          <Field
            as={Input}
            type="text"
            name={`${namePrefix}.TPosition`}
            className="p-5"
            placeholder="เช่น ครูผู้ช่วย"
          />
          <ErrorMessage className='text-red-500 mt-3' name={`${namePrefix}.TPosition`} component="div" />
        </div>
      </div>
    </div>
  )
}

export default ActivityDetail
