import DefaultLayout from "@/layouts/DefaultLayout";
import CustomAppbar from "@/components/CustomAppbar";
import BackButton from "@/components/BackButton";

import Licenses from "../license/components/License";

export default function LicensePage() {
    const header = <CustomAppbar children={<BackButton />} />
    return (
        <DefaultLayout header={header}>
            <Licenses />
        </DefaultLayout>
    );
}
