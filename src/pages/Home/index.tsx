import { useAuth } from "../../api/auth";
import Header from "../../components/Header/Header"

export default function Home() {
//   const { user } = useAuth();

    return (
        <>
            {/* {user && user.first_name} */}
            <Header></Header>
        </>
    );
}
