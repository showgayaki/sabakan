import DefaultLayout from "@/layouts/DefaultLayout";
import { BrowsersyncForm } from "./components/BrowsersyncForm";

export default function Home() {
    return (
        <DefaultLayout>
            <BrowsersyncForm />
        </DefaultLayout>
    );
}
