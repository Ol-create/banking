'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Divide, Loader2 } from 'lucide-react'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const formSchema = authFormSchema(type)
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  }) 
  const onSubmit = async (data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)
    try {
      // Sign up with Appwrite & create plaid token
      if (type === 'sign-up') {
         const newUser = await signUp(data)
        setUser(newUser);
      }
      if(type === 'sign-in') {
         const response = await signIn({
          email: data.email,
          password: data.password,
         })
         if (response) router.push('/')
      }
     

    } catch (error) {
      console.log(error)
    } finally {
    setIsLoading(false)
    }
  }
  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='flex cursor-pointer items-center gap-1'>
        <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt='Horizon log'
            />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
         <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'}
                <p className='text-16 font-normal text-gray-600'>
                 {user 
                   ? 'Link your account to get started'
                   : 'Please enter your details'
                 }
                </p>
         </h1>
        </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                {/* PlaidLink */}
            </div>
        ): (
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === "sign-up" && (
              <>
              <div className='flex gap-4'>
              <CustomInput 
                name="firstName"
                label="First name"
                control={form.control}
                placeholder="Enter your First name"/>
              <CustomInput 
                name="lastName"
                label="Last name"
                control={form.control}
                placeholder="Enter your Last name"/>
              </div>
              
                <CustomInput 
                name="address1"
                label="Address"
                control={form.control}
                placeholder="Enter your specific adddress"/>
                <div className='flex gap-4'>
                <CustomInput 
                name="city"
                label="City"
                control={form.control}
                placeholder="Enter your city"/>
                <div className='flex gap-4'>
                <CustomInput 
                name="state"
                label="State"
                control={form.control}
                placeholder="Example: 'NY'"/>
                <CustomInput 
                name="postalCode"
                label="Postal Code"
                control={form.control}
                placeholder="Example: '360101'"/>
                </div>
                <div className='flex gap-4'>
                <CustomInput 
                name="dateOfBirth"
                label="Date of Birth"
                control={form.control}
                placeholder="YYYY-MM-DD"/>
                <CustomInput 
                name="ssn"
                label="SSN"
                control={form.control}
                placeholder="Example: 1234"/>
                </div>
              </>
            )}
            <CustomInput 
                name="email"
                label="Email"
                control={form.control}
                placeholder="Enter your Email"/>
            <CustomInput 
                name="password"
                label="Password"
                control={form.control}
                placeholder="Enter your Password"/>
            <div className='flex flex-col gap-4'>
            <Button 
                type="submit"
                className='form-btn'
                disabled={isLoading}
            >
              {isLoading ? (
                <>
                <Loader2 size={20}
                className="animate-spin"/> &nbsp;
                Loading...
                </>
              ) : type === "sign-in" ? "Sign-in": "Sign-up"}
            </Button>
            </div>
          </form>
        </Form>
        )}
        <footer className="flex justify-center gap-1">
        <p>
          {type === "sign"
           ? "Don't have an account "
           : "Already have an account?"
           }
        </p>
        <Link href={type === "sign-in" 
                     ? "/sign-up" 
                     : "sign-in"
                    }
              className='form-link'
        >
          {type === "sign-in" ? "Sign up": "Sign in"}
        </Link>
        </footer >
        </section>
  )
}

export default AuthForm