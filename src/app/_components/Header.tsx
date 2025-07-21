import Link from 'next/link';

export const Header:React.FC=()=>{
    return(
        <header className="bg-slate-700 text-white">
            <div className="container flex mx-auto p-5 text-xl">
                <Link href="/" className="font-medium ml-3">
                    Blog
                </Link>
                <Link href="/contact" className="font-medium ml-auto text-base">
                    お問い合わせ
                </Link>
            </div>
        </header>
        )
    }