import { useFieldArray, useForm } from "react-hook-form";
import { FaStarOfLife, FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

import { cn } from "@/util/cn";

type Field = { name: string; phone: string; memo: string };

type Form = {
  list: Array<Field>;
};

export default function TableSection() {
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm<Form>({
    mode: "onBlur",
    defaultValues: { list: [{ name: "", phone: "", memo: "" }] },
  });
  const { fields, append, remove } = useFieldArray<Form>({
    control,
    name: "list",
  });
  const validateDuplication = (phone: string, index: number) => {
    const list = getValues("list");

    if (list.length <= 1) {
      return true;
    }

    const hasPhone = list.some(
      (item, itemIndex) => item.phone === phone && itemIndex !== index,
    );

    if (hasPhone) {
      return "이미 추가한 휴대폰 번호가 있습니다.";
    }

    return true;
  };

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
              <th className="border border-r-0 border-t-0 px-2 py-1">메모</th>
              <th className="w-20 border border-r-0 border-t-0 px-2 py-1">-</th>
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
                        pattern: {
                          value: /^(010[-\s]?\d{4}[-\s]?\d{4})$/,
                          message: "휴대폰 번호 형식이 맞지 않습니다.",
                        },
                        required: {
                          value: true,
                          message: "휴대폰 번호를 입력해주세요.",
                        },
                        validate: {
                          duplicate: (phone) =>
                            validateDuplication(phone, index),
                        },
                        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
                          const value = event.target.value.replace(
                            /^(\d{2,3})-?(\d{3,4})-?(\d{4,})$/,
                            `$1-$2-$3`,
                          );
                          setValue(`list.${index}.phone`, value);
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
  );
}
