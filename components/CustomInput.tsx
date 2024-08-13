"use client"

import React from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

  import { z } from 'zod'

  import { Input } from "@/components/ui/input"
  import { Control, FieldPath } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema('sign-up')
  interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string,
  }

const CustomInput = ({control, name, label, placeholder}: CustomInput) => {
  return (
    <FormField
              control={control}
              name={name}
              render={({ field }) => (
                <div className='form-item'>
                 <FormLabel className='form-label'>
                  {label}
                 </FormLabel>
                 <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                         key={name}
                         placeholder={placeholder}
                         className='input-class'
                         type={name === "password" ? "password": "text"}
                         {...field} />
                  </FormControl>
                 </div>
                </div>
              )}
            />
  )
}

export default CustomInput