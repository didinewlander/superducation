import { SignIn } from './signin-button';
import { Logo } from '@/app/(application)/_components/Logo';

function LoginPage() {
    return (
        <div className='p-4 w-full flex flex-col items-center justify-center min-h-screen bg-gray-100 select-none'>
            <div className='max-w-xl w-full bg-white rounded-lg shadow-md p-8'>
                <div className='mb-4'>
                    <Logo />
                </div>
                <div className='mb-8 '>
                    <h1 className='text-2xl font-semibold text-center'>Welcome To Sup<span className='text-blue-500'>e</span>r<span className='text-blue-500'>ducation!</span></h1>
                    <p className='text-sm text-gray-600 text-center mt-2'>
                        Sign in to access your personalized dashboard
                    </p>
                </div>
                <div className='flex justify-center'>
                    <SignIn />
                </div>
                <div className='p-4'>
                    <hr />
                    <div className='p-4'>
                        <h2 className='text-xl font-semibold text-center'>What is Superducation?</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
