"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";
import { logIn } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

type Form = {
  username: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ mode: "onBlur" });
  const usename = useAppSelector((state) => state.authReducer.value.username);

  const dispatch = useDispatch<AppDispatch>();

  const clickLoginButton = (data: Form) => {
    dispatch(logIn(data.username));
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
              message: "사용자 이름을 입력해주세요",
            },
          })}
          className="rounded border border-gray-600 p-2 text-sm focus:outline-black"
          placeholder="username"
        />

        {errors.username && (
          <p className="text-sm text-red-400">{errors.username.message}</p>
        )}

        <button
          className="rounded bg-black  py-1 text-sm text-white disabled:bg-gray-400"
          disabled={!!errors?.username}
        >
          로그인
        </button>

        {usename}
      </form>
    </main>
  );
}
