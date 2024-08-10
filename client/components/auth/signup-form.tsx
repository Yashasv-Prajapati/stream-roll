'use client'
import { signup } from '@/actions/signup';
import { signupSchema } from '@/lib/validations/signup';
import Link from 'next/link';
import React, { useTransition } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignupForm = () => {
    const [isPending, startTransition] = useTransition();

    const {register,handleSubmit,watch,formState:{errors}} = useForm();
  
    function formSubmit(data:FieldValues){
      startTransition(async()=>{
        // signUp()
        console.log("HELLO")
        const response = await signup({email:data.email, username: data.username,password:data.password})
        switch(response.success){
            case true:
                toast.success(response.message)
            case false:
                toast.error(response.message)
        }
      })
      
      // login({loginType: 'email', user_identifier: data.email, password: data.password});  
    }
    
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
        <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-blue-500">Sign Up</h1>
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input disabled={isPending} {...register('email', {required:true})} type="email" className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">Username</label>
              <input disabled={isPending} {...register('username', {required:true})} type="text" className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input disabled={isPending} {...register('password', {required:true}) } type="password" className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <button className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600">Sign Up</button>
          </form>
          <p className="mt-6 text-center text-gray-700">
            Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </main>
    );
}

export default SignupForm