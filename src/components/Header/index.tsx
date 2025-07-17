import CustomAppbar from "@/components/CustomAppbar";

import AppLogo from "./AppLogo";
import Hamburger from "./Hamburger";

export default function Header() {
    return (
        <CustomAppbar>
            <AppLogo />
            <Hamburger />
        </CustomAppbar >
    );
}
