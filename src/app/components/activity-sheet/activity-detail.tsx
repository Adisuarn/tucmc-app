"use client"

import React, { useState, useEffect } from 'react'
import { ThaiDatePicker } from "thaidatepicker-react";
import { Field, ErrorMessage, useField, useFormikContext } from "formik"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import { Separator } from '@components/ui/separator';

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
        <SelectItem value="1">คาบที่ 1</SelectItem>
        <SelectItem value="2">คาบที่ 2</SelectItem>
        <SelectItem value="3">คาบที่ 3</SelectItem>
        <SelectItem value="4">คาบที่ 4</SelectItem>
        <SelectItem value="5">คาบที่ 5</SelectItem>
        <SelectItem value="6">คาบที่ 6</SelectItem>
        <SelectItem value="7">คาบที่ 7</SelectItem>
        <SelectItem value="8">คาบที่ 8</SelectItem>
      </SelectContent>
    </Select>
  );
};

const ActivityDetail = () => {
  const [date, setDate] = useState(new Date().toISOString());
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    const initDate = async () => {
      try {
        await setFieldValue("date", date.split("T")[0]);
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
        <Field as={Input} type="text" name="activityName" className="p-5" placeholder="เช่น กิจกรรมงานนิทรรศการวิชาการ, ซ้อมการแสดง" />
        <ErrorMessage className='text-red-500 mt-3' name="activityName" component="div" />
      </div>
      <div className="flex flex-col w-full mt-5">
        <div className="w-full">
          <Label htmlFor="activityDetail" className="text-lg">วันที่</Label>
          <div className="flex border min-w-full w-full rounded-sm justify-center">
            <ThaiDatePicker
              value={date}
              clearable={false}
              customInput={Input}
              inputProps={{
                className: "w-full text-center py-1.5 focus:rounded-sm",
                displayFormat: "DD MMMM YYYY",
              }}
              onChange={async (buddhistDate) => {
                setDate(buddhistDate);
                await setFieldValue("date", buddhistDate);
              }}
            />
          </div>
        </div>
        <div className="flex gap-x-5 mt-5">
          <div className="w-4/8">
            <Label htmlFor="activityDetail" className="text-lg">ตั้งแต่คาบที่</Label>
            <PeriodSelect name="startPeriod" />
            <ErrorMessage className='text-red-500 mt-3' name="startPeriod" component="div" />
          </div>
          <div className="w-4/8">
            <Label htmlFor="activityDetail" className="text-lg">ถึงคาบที่</Label>
            <PeriodSelect name="endPeriod" />
            <ErrorMessage className='text-red-500 mt-3' name="endPeriod" component="div" />
          </div>
        </div>
        <div className="mt-5">
          <Label htmlFor="room" className="text-lg">ห้อง</Label>
          <Field as={Input} type="text" name="room" className="p-5" placeholder="เช่น 335" minLength={2} maxLength={3} />
          <ErrorMessage className='text-red-500 mt-3' name="room" component="div" />
        </div>
      </div>
      <div className="mt-5">
        <h3 className='text-2xl'>ครูผู้ขออนุญาต</h3>
        <p className='text-lg text-gray-400 mb-3'>ชื่อคุณครูผู้รับผิดชอบในการจัดกิจกรรมและขอเวลาเรียน</p>
        <Separator />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5">
        <div>
          <Label htmlFor="TTitle" className="text-lg">คำนำหน้า</Label>
          <TitleSelect name="TTitle" />
          <ErrorMessage className='text-red-500 mt-3' name="TTitle" component="div" />
        </div>
        <div>
          <Label htmlFor="TPosition" className="text-lg">ตำแหน่ง</Label>
          <Field as={Input} type="text" name="TPosition" className="p-5" placeholder="เช่น ครูผู้ช่วย" />
          <ErrorMessage className='text-red-500 mt-3' name="TPosition" component="div" />
        </div>
        <div>
          <Label htmlFor="TFirstName" className="text-lg">ชื่อจริง</Label>
          <Field as={Input} type="text" name="TFirstName" className="p-5" placeholder="สมชาย" />
          <ErrorMessage className='text-red-500 mt-3' name="TFirstName" component="div" />
        </div>
        <div>
          <Label htmlFor="TLastName" className="text-lg">นามสกุล</Label>
          <Field as={Input} type="text" name="TLastName" className="p-5" placeholder="ใจดี" />
          <ErrorMessage className='text-red-500 mt-3'  name="TLastName" component="div" />
        </div>
      </div>
    </div>
  )
}

export default ActivityDetail
