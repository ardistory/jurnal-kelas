import { Link } from "@inertiajs/react";

const ApplicationLogo = () => {
    return (
        <Link href={route('root')} className={'text-4xl italic font-bold'}>
            DyyApp
        </Link>
    );
};

export default ApplicationLogo;