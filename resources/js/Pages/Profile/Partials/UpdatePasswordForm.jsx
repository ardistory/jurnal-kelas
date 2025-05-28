import { Button } from '@/Components/ui/button.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card.js';
import { Input } from '@/Components/ui/input.js';
import { Label } from '@/Components/ui/label.js';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast('Success', { description: 'password updated' });
            },
            onError: (err) => {
                if (err.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                    toast('Failed', { description: err.password });
                }

                if (err.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                    toast('Failed', { description: err.current_password });
                }
            },
        });
    };

    useEffect(() => {
        if (processing) {
            toast('Process', { description: 'updating password...' });
        }
    }, [processing]);

    return (
        <Card>
            <form onSubmit={updatePassword}>
                <CardHeader>
                    <CardTitle>
                        Update Password
                    </CardTitle>
                    <CardDescription>
                        Ensure your account is using a long, random password to stay secure.
                    </CardDescription>
                </CardHeader>
                <CardContent className={'space-y-5'}>
                    <div>
                        <Label htmlFor="current_password">Current Password</Label>
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            type="password"
                        />
                        <Label className={'text-red-500'}>{errors.current_password}</Label>
                    </div>
                    <div>
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                        />
                        <Label className={'text-red-500'}>{errors.password}</Label>
                    </div>
                    <div>
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            type="password"
                        />
                        <Label className={'text-red-500'}>{errors.password_confirmation}</Label>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={processing}>
                        Save
                    </Button>
                </CardFooter>
            </form>
        </Card >
    );
}
