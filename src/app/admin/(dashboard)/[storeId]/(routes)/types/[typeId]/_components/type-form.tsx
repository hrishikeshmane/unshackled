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
import { type TypeTable } from '~/types/globals';
import { api } from "~/trpc/react";


const formSchema = z.object({
    name: z.string().min(1),
})

type TypeFormValues = z.infer<typeof formSchema>;

interface TypeFormProps {
    initialData: TypeTable | null | undefined; 
}


export const TypeForm: React.FC<TypeFormProps> = ({ initialData }) => {

    const [isPending, startTransition] = useTransition();

    const title = initialData ? 'Edit Type' : 'Create Type'
    const description = initialData ? 'Edit a Type' : 'Add a new Type'
    const toastMessage = initialData ? 'Type updated.' : 'Type created.'
    const action = initialData ? 'Save changes' : 'Create'

    const createOrUpdateTypeMutation = api.types.createOrUpdateType.useMutation({
        onSuccess: () => {
            toast.success(`${toastMessage} successfully`);
            router.push(`/admin/${String(params.storeId)}/types`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    });

    const deleteTypeMutation = api.types.deleteTypeById.useMutation({
        onSuccess: () => {
            toast.success("Type deleted successfully");
            router.push(`/admin/${String(params.storeId)}/types`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    });

    const params = useParams();
    const router = useRouter();    

    const [open, setOpen] = useState(false);

    const form = useForm<TypeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            name: '',
        },
    });

    const onSubmit = (data: TypeFormValues) => {
        
        startTransition( () => { 
            if (initialData) {
                createOrUpdateTypeMutation.mutate({
                    id: initialData.id,
                    name: data.name,
                    storeId: String(params.storeId),
                });
            } else {
                createOrUpdateTypeMutation.mutate({
                    name: data.name,
                    storeId: String(params.storeId),
                });
            }
        }
        );

    };
    
    const onDelete = () => {
        startTransition(() => {
            deleteTypeMutation.mutate({ id: String(params.billboardId) });
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
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control} 
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='Category name' {...field} />
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