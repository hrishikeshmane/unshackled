import { redirect } from "next/navigation";
import { SettingsForm } from "./_components/settings-form";
import { api } from "~/trpc/server";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
    const store = await api.store.getStoreById({ id: params.storeId });

    if (!store) {
        redirect('/');
    }

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

export default SettingsPage