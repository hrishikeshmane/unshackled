"use client"

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { Heading } from "~/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '~/app/admin/_components/modals/alert-modal';
import { type BillboardTable } from '~/types/globals';
import { api } from "~/trpc/react";
import ImageUpload from '~/app/admin/_components/image-upload';
import { Textarea } from '~/components/ui/textarea';


const formSchema = z.object({
    label: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
    initialData: BillboardTable | null | undefined; 
}



export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {

    const [isPending, startTransition] = useTransition();

    const title = initialData ? 'Edit billboard' : 'Create billboard'
    const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
    const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.'
    const action = initialData ? 'Save changes' : 'Create'

    const createOrUpdateBillboardMutation = api.billboard.createOrUpdateBillboard.useMutation({
        onSuccess: () => {
            toast.success(`${toastMessage} successfully`);
            router.push(`/admin/${String(params.storeId)}/billboards`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    });

    const deleteBillboardMutation = api.billboard.deleteBillboardById.useMutation({
        onSuccess: () => {
            toast.success("Billboard deleted successfully");
            router.push(`/admin/${String(params.storeId)}/billboards`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    });

    const params = useParams();
    const router = useRouter();    

    const [open, setOpen] = useState(false);

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            label: "",
            imageUrl: "",
            description: "",
        },
    });

    // create billboard, update billboard if existing, delete billboard

    const onSubmit = (data: BillboardFormValues) => {
        
        startTransition( () => { 
            if (initialData) {
            createOrUpdateBillboardMutation.mutate({
            label: data.label,
            description: data.description,
            imageUrl: data.imageUrl,
            storeId: String(params.storeId),
            id: initialData.id,
            });
            } else {
                    createOrUpdateBillboardMutation.mutate({
                    label: data.label,
                    description: data.description,
                    imageUrl: data.imageUrl,
                    storeId: String(params.storeId),
                });
            }
        }
        );

    };
    
    const onDelete = () => {
        startTransition(() => {
            deleteBillboardMutation.mutate({ id: String(params.billboardId) });
        });
    };
    

    return (
        <>
            <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={isPending}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />

                {
                initialData &&
                <Button variant="destructive" size="sm" onClick={() => setOpen(true)} disabled={isPending}>
                    <Trash className="w-4 h-4" />
                </Button>
                }
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                    <FormField
                        control={form.control} 
                        name="imageUrl"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Background Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={isPending}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange('')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-col gap-8'>
                        <FormField
                            control={form.control} 
                            name="label"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='Billboard label' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control} 
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    {/* <Input disabled={isPending} placeholder='Billboard description' {...field} /> */}
                                    <Textarea disabled={isPending} placeholder='Billboard description' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <Button disabled={isPending} className='ml-auto' type='submit'>{action}</Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}