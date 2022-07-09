import { useAuth } from "../../api/auth";
import ContactUs from "../../components/contactUs/ContactUs";
import Header from "../../components/Header/Header"

export default function Home() {
//   const { user } = useAuth();

    return (
        <>
            {/* {user && user.first_name} */}
            <Header></Header>
            <ContactUs/>
        </>
    );
}
