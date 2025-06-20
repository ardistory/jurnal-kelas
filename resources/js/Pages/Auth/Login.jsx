import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card.js';
import { Checkbox } from '@/Components/ui/checkbox.js';
import { Input } from '@/Components/ui/input.js';
import { Label } from '@/Components/ui/label.js';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Partials/ApplicationLogo.jsx';
import { router, useForm, usePage } from '@inertiajs/react';
import { KeyRound, LogIn, UserPlus } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Login({ canResetPassword }) {
    const { app_name } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
            onSuccess: () => toast('Login Success', { description: `Welcome to ${app_name}` }),
            onError: (err) => {
                toast('Failed', { description: err.email });
                toast('Failed', { description: err.password });
            }
        });
    };

    useEffect(() => {
        (processing) ? toast('Process', { description: 'Authentication...' }) : null;
    }, [processing]);

    return (
        <GuestLayout title={'Login'}>
            <div className={'flex justify-center'}>
                <Card className={'w-[500px]'}>
                    <form onSubmit={submit}>
                        <CardHeader>
                            <ApplicationLogo override={'Login'} />
                        </CardHeader>
                        <CardContent className={'space-y-5'}>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <Label className="text-red-500" >{errors.email}</Label>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <Label className="text-red-500" >{errors.password}</Label>
                            </div>
                            <div className="flex items-center">
                                <Checkbox id={'remember'} value={data.remember} onCheckedChange={(value) => setData('remember', value)} />
                                <Label htmlFor={'remember'} className={'ms-2'}>
                                    Remember me
                                </Label>
                            </div>
                        </CardContent>
                        <CardFooter className={'flex flex-wrap gap-2'}>
                            <Button type={'submit'} className={'w-full'} disabled={processing}>
                                <LogIn />
                                Login
                            </Button>
                            <div className={'flex w-full'}>
                                {canResetPassword && (
                                    <Button className={'flex-1 rounded-r-none'} type={'button'} variant={'outline'} onClick={() => router.visit(route('password.request'))}>
                                        <KeyRound />
                                        Forgot Password
                                    </Button>
                                )}
                                <Button className={'flex-1 rounded-l-none'} type={'button'} variant={'outline'} onClick={() => router.visit(route('register'))}>
                                    <UserPlus />
                                    Register
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </GuestLayout >
    );
}
