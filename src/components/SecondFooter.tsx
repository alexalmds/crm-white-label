import Link from "next/link";

function SecondFooter(){
    return (
        <footer className='w-full bg-zinc-200 p-4'>
                <div className='border-t flex flex-row justify-evenly text-gray-500'>
                    <div>Copyright © 2024 Tech Genesis</div>
                    <div><Link href="/" className="hover:underline">Política de Privacidade</Link></div>
                </div>
            </footer>
    )
}

export default SecondFooter;