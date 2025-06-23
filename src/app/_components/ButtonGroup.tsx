import Link from "next/link";

export const ButtonGroup: React.FC = () => {
    return (
    <div className="bg-slate-200 pt-5 w-1/5 px-5 flex flex-col gap-4">
        <Link href="/" className="underline block hover:text-blue-500">
            記事一覧
        </Link>
        <Link href="/categories" className="underline block hover:text-blue-500">
            カテゴリー一覧
        </Link>
    </div>
  );
};
