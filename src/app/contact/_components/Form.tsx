"use client";

import { useForm } from "react-hook-form";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import { PageTitle } from "@/app/_components/PageTitle";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contacts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("送信に失敗しました");
      alert("送信が完了しました");
      reset();
    } catch (error) {
      alert("送信エラー：" + (error as Error).message);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto py-10">
      <PageTitle ttl="お問い合わせフォーム" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="お名前"
          name="name"
          register={register("name", {
            required: "お名前は必須です",
            maxLength: { value: 30, message: "30文字以内で入力してください" },
          })}
          error={errors.name?.message}
        />

        <InputField
          label="メールアドレス"
          name="email"
          type="email"
          register={register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /.+@.+\..+/,
              message: "正しいメールアドレスを入力してください",
            },
          })}
          error={errors.email?.message}
        />

        <TextareaField
          label="本文"
          name="message"
          register={register("message", {
            required: "本文は必須です",
            maxLength: { value: 500, message: "500文字以内で入力してください" },
          })}
          error={errors.message?.message}
        />

        <div className="flex justify-center mt-10 gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            送信
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-300 text-black px-6 py-2 rounded"
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
}
