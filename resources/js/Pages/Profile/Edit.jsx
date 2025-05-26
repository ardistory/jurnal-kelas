import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateProfilePicture from './Partials/UpdateProfilePicture.jsx';

export default function Edit({ mustVerifyEmail, status, auth }) {
    return (
        <AuthenticatedLayout title={'Profile'} user={auth.user}>
            <div className={'mx-auto space-y-5 md:max-w-[500px]'}>
                <UpdateProfilePicture />
                <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                <UpdatePasswordForm />
            </div>
        </AuthenticatedLayout>
    );
}
