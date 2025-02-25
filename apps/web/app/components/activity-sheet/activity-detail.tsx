"use client"

import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import { Field, ErrorMessage, useField, useFormikContext } from "formik"
import { Input } from "@tucc/ui/input"
import { Label } from "@tucc/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tucc/ui/select';
import { Separator } from '@tucc/ui/separator';

const TitleSelect = ({ name }: { name: string }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <Select
      value={field.value}
      onValueChange={(value) => setFieldValue(name, value)}
    >
      <SelectTrigger className="w-full py-5">
        <SelectValue placeholder="เลือกคำนำหน้า" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="นาย">นาย</SelectItem>
        <SelectItem value="นาง">นาง</SelectItem>
        <SelectItem value="นางสาว">นางสาว</SelectItem>
      </SelectContent>
    </Select>
  );
};

const ActivityDetail = () => {
  const [date, setDate] = useState(new Date());
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    const initDate = async () => {
      try {
        await setFieldValue("date", date.toISOString().split("T")[0]);
      } catch (error) {
        console.log(error)
      }
    }
    // eslint-disable-next-line
    initDate();
  }, []);
  return (
    <div className="w-full mx-auto">
      <div>
        <h3 className='text-2xl'>กิจกรรม</h3>
        <p className='text-lg text-gray-400 mb-3'>รายละเอียดกิจกรรมที่ต้องการขออนุญาตไปทำ</p>
        <Separator />
      </div>
      <div className='mt-5'>
        <Label htmlFor="activityName" className="text-lg">ชื่อกิจกรรม</Label>
        <Field as={Input} type="text" name="activityName" className="p-5" placeholder="เช่น ร่วมงานนิทรรศการวิชาการ" />
        <ErrorMessage name="activityName" component="div" />
      </div>
      <div className="flex gap-x-4 w-full mt-5">
        <div className="w-5/12">
          <Label htmlFor="activityDetail" className="text-lg">วันที่</Label>
          <div className="flex border rounded-sm justify-center">
            <DatePicker
              selected={date}
              onChange={async (date: Date | null) => {
                if (date) {
                  setDate(date);
                  await setFieldValue("date", date.toISOString().split('T')[0]);
                }
              }}
              className="w-full text-lg py-1.5 text-center focus:rounded-sm"
            />
          </div>
        </div>
        <div className="w-4/8">
          <Label htmlFor="activityDetail" className="text-lg">ตั้งแต่คาบที่</Label>
          <Field as={Input} type="number" name="startPeriod" className="p-5" placeholder="เช่น 08:00" />
          <ErrorMessage name="startPeriod" component="div" />
        </div>
        <div className="w-4/8">
          <Label htmlFor="activityDetail" className="text-lg">ถึงคาบที่</Label>
          <Field as={Input} type="number" name="endPeriod" className="p-5" placeholder="เช่น 16:00" />
          <ErrorMessage name="endPeriod" component="div" />
        </div>
      </div>
      <div className="mt-5">
        <h3 className='text-2xl'>ครูผู้ขออนุญาต</h3>
        <p className='text-lg text-gray-400 mb-3'>ชื่อคุณครูผู้รับผิดชอบในการจัดกิจกรรมและขอเวลาเรียน</p>
        <Separator />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5">
        <div className="">
          <Label htmlFor="TTitle" className="text-lg">คำนำหน้า</Label>
          <TitleSelect name="TTitle" />
          <ErrorMessage name="TTitle" component="div" />
        </div>
        <div className="">
          <Label htmlFor="TPosition" className="text-lg">ตำแหน่ง</Label>
          <Field as={Input} type="text" name="TPosition" className="p-5" placeholder="เช่น ครูผู้ช่วย" />
          <ErrorMessage name="TPosition" component="div" />
        </div>
        <div className="">
          <Label htmlFor="TFirstName" className="text-lg">ชื่อจริง</Label>
          <Field as={Input} type="text" name="TFirstName" className="p-5" placeholder="สมชาย" />
          <ErrorMessage name="TFirstName" component="div" />
        </div>
        <div className="">
          <Label htmlFor="TLastName" className="text-lg">นามสกุล</Label>
          <Field as={Input} type="text" name="TLastName" className="p-5" placeholder="ใจดี" />
          <ErrorMessage name="TLastName" component="div" />
        </div>
      </div>
    </div>
  )
}

export default ActivityDetail
