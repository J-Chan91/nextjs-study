"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FaStarOfLife, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

import { RootState } from "@/redux/store";
import { cn } from "@/util/cn";

type Field = { name: string; phone: string; memo: string };

type Form = {
  list: Array<Field>;
};

export default function Dashboard() {
  const data = useSelector((state: RootState) => state.user);

  const {
    control,
    formState: { errors },
    register,
    trigger,
    handleSubmit,
  } = useForm<Form>({
    mode: "onBlur",
    defaultValues: { list: [{ name: "", phone: "", memo: "" }] },
  });
  const { fields, append, remove } = useFieldArray<Form>({
    control,
    name: "list",
  });

  const handleClickAppendField = (list: Array<Field>) => {
    list.map((_, index) => {
      trigger(`list.${index}`);
    });

    append({ name: "", phone: "", memo: "" });
  };

  const handleClickRemoveField = (index: number) => {
    remove(index);
  };

  return (
    <main className="flex h-screen w-full items-center justify-center bg-black">
      <div className="flex w-1/2 flex-col gap-4">
        <div className="rounded bg-white px-4 py-2">
          <p>반가워요! {data.name.firstname} 👋</p>
        </div>

        <div className="h-[520px] overflow-y-auto rounded bg-white px-4 py-2">
          <form
            className="overflow-hidden rounded-md border border-gray-200"
            onSubmit={handleSubmit((data) => handleClickAppendField(data.list))}
          >
            <table className="w-full text-sm">
              <thead className="box-border">
                <tr className="box-border">
                  <th className="w-10 border border-l-0 border-t-0 px-2 py-1">
                    <div className="flex justify-center gap-1">
                      이름 <FaStarOfLife size={8} color="#FF5C5C" />
                    </div>
                  </th>
                  <th className="w-20 border border-l-0 border-t-0 px-2 py-1">
                    <div className="flex justify-center gap-1">
                      전화번호 <FaStarOfLife size={8} color="#FF5C5C" />
                    </div>
                  </th>
                  <th className="border border-r-0 border-t-0 px-2 py-1">
                    메모
                  </th>
                  <th className="min-w-20 border border-r-0 border-t-0 px-2 py-1">
                    -
                  </th>
                </tr>
              </thead>

              <tbody className="box-border">
                {fields.map((field, index) => {
                  return (
                    <tr key={field.id}>
                      <td className="h-14 border border-b-0 border-l-0 px-2">
                        <input
                          {...register(`list.${index}.name`, {
                            required: {
                              value: true,
                              message: "이름을 입력해주세요.",
                            },
                            minLength: {
                              value: 2,
                              message: "2~8자 이내로 입력해주세요.",
                            },
                            maxLength: {
                              value: 8,
                              message: "2~8자 이내로 입력해주세요.",
                            },
                          })}
                          className={cn(
                            "rounded border px-2 py-1 outline-[1px] outline-gray-600 transition-all hover:border-gray-400",
                            errors.list &&
                              errors.list[index]?.name &&
                              "border-red-500",
                          )}
                          type="text"
                          placeholder="이름을 입력해주세요"
                        />
                        {errors.list && errors.list[index]?.name && (
                          <p className="text-xs text-red-400">
                            {errors.list[index]?.name?.message}
                          </p>
                        )}
                      </td>

                      <td className="border border-b-0 border-l-0 px-2 py-1">
                        <input
                          {...register(`list.${index}.phone`, {
                            required: {
                              value: true,
                              message: "전화번호를 입력해주세요.",
                            },
                            minLength: {
                              value: 8,
                              message: "최소 8자 이상 입력하세요.",
                            },
                          })}
                          className={cn(
                            "rounded border px-2 py-1 outline-[1px] outline-gray-600 transition-all hover:border-gray-400",
                            errors.list &&
                              errors.list[index]?.phone &&
                              "border-red-500",
                          )}
                          type="text"
                          placeholder="전화번호를 입력해주세요"
                        />
                        {errors.list && errors.list[index]?.phone && (
                          <p className="text-xs text-red-400">
                            {errors.list[index]?.phone?.message}
                          </p>
                        )}
                      </td>

                      <td className="border border-b-0 border-r-0 px-2 py-1">
                        <input
                          {...register(`list.${index}.memo`)}
                          className="w-full rounded border px-2 py-1 outline-[1px] outline-gray-600 transition-all hover:border-gray-400"
                          type="text"
                        />
                      </td>

                      <td className="border border-b-0 border-r-0 px-2 py-1">
                        <div className="flex items-center justify-center gap-2">
                          <button type="submit">
                            <FaCirclePlus
                              size={24}
                              className={cn(
                                "fill-blue-600 transition hover:fill-blue-500",
                              )}
                            />
                          </button>

                          {fields.length >= 2 && (
                            <button type="button">
                              <FaCircleMinus
                                size={24}
                                className="fill-red-600 transition hover:fill-red-500"
                                onClick={() => handleClickRemoveField(index)}
                              />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </main>
  );
}
