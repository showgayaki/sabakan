import DefaultLayout from "@/layouts/DefaultLayout";
import Header from "@/components/Header";
import { BrowsersyncForm } from "./components/BrowsersyncForm";

export default function Home() {
    return (
        <DefaultLayout header={<Header />}>
            <BrowsersyncForm />
        </DefaultLayout>
    );
}
