"use client";
import { login } from "@/actions/login";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useTransition } from "react";
import {  FieldValues, useForm } from "react-hook-form";
import {toast} from 'sonner'

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function formSubmit(data: FieldValues) {
    startTransition(async () => {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      switch(response.code){
        case 401:
        case 500:
          toast.error(response.message as string);
          break;
        case 200:
          toast.success("Logged in successfully!");
          redirect('/');
      }
    }
  );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="w-full max-w-md rounded-lg bg-white p-10 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-500">
          Login
        </h1>
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              disabled={isPending}
              {...register("email", { required: true })}
              type="email"
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              disabled={isPending}
              {...register("password", { required: true })}
              type="password"
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition duration-300 hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginForm;
