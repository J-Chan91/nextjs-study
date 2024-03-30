import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

let timerId: NodeJS.Timeout | null = null;

const getContentsLength = (contents: string): number => {
  let length = 0;

  for (const char of contents) {
    const code = char.charCodeAt(0);

    if (
      (code >= 0xac00 && code <= 0xd7a3) ||
      (code >= 0x3131 && code <= 0x318e)
    ) {
      length += 2;
    } else {
      length += 1;
    }
  }

  return length;
};

type Form = {
  contents: string;
};

export default function TextareaSection() {
  const { register } = useForm<Form>();

  const [contentsBytes, setContentsBytes] = useState(0);

  const calculateContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    timerId = setTimeout(() => {
      const contentsLength = getContentsLength(event.target.value);

      setContentsBytes(contentsLength);

      if (timerId) {
        clearTimeout(timerId);
      }
    }, 1000);
  };

  return (
    <div className="flex h-[520px] flex-col justify-between overflow-y-hidden rounded bg-white p-4">
      <div className="flex justify-end text-sm text-gray-800">
        {contentsBytes} bytes
      </div>

      <textarea
        {...register("contents", {
          onChange: calculateContents,
        })}
        className="h-full w-full resize-none rounded border border-gray-200 p-4 text-sm outline-black/50"
        placeholder="Please enter anything."
      />
    </div>
  );
}
