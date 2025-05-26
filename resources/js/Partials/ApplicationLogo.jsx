import { Link } from "@inertiajs/react";

const ApplicationLogo = ({ override = 'DyyApp' }) => {
    return (
        <Link href={route('root')} className={'text-4xl italic font-bold'} >
            {override}
        </Link>
    );
};

export default ApplicationLogo;