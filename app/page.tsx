"use client";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signin } from "@/redux/features/auth-slice";
import { useState } from "react";

type Form = {
  username: string;
  password: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    mode: "onBlur",
    defaultValues: {
      username: "johnd",
      password: "m38rmF$",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const clickLoginButton = async (data: Form) => {
    setIsLoading(true);

    const response = await dispatch(signin(data)).finally(() => {
      setIsLoading(false);
    });

    console.log(">", response);
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-black">
      <form
        className="flex flex-col gap-2 rounded-xl border border-gray-50 bg-gray-50 p-4"
        onSubmit={handleSubmit(clickLoginButton)}
      >
        <input
          {...register("username", {
            required: {
              value: true,
              message: "이메일을 입력해주세요",
            },
          })}
          className="rounded border border-gray-600 p-2 text-sm focus:outline-black"
          type="text"
          placeholder="username"
        />

        {errors.username && (
          <p className="text-sm text-red-400">{errors.username.message}</p>
        )}

        <input
          {...register("password", {
            required: {
              value: true,
              message: "비밀번호를 입력해주세요",
            },
          })}
          className="rounded border border-gray-600 p-2 text-sm focus:outline-black"
          type="password"
          placeholder="password"
        />

        {errors.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}

        <button
          className="rounded bg-black  py-1 text-sm text-white disabled:bg-gray-400"
          disabled={!isValid || isLoading}
        >
          로그인
        </button>
      </form>
    </main>
  );
}
