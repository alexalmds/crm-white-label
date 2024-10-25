
function AuthPage({ children }: { children: React.ReactNode }) {
    return (
        <>
            <main className="min-h-screen flex flex-col  items-center bg-white p-2 w-full justify-center">
                <form className="flex flex-col bg-opacity-20 backdrop-filter backdrop-blur-lg px-6 py-14 rounded-2xl gap-5 w-full max-w-md shadow-lg">
                    {children}
                </form>
            </main>
        </>
    );
}

export default AuthPage;