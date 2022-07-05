import {useAuth} from "../../api/auth";

export default function Home()
{
    const {user} = useAuth();

    return (<>{user && user.first_name}</>);
}
