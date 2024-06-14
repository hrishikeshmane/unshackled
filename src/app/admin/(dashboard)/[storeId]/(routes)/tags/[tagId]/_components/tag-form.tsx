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
import { type TagTable } from '~/types/globals';
import { api } from "~/trpc/react";

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
})

type TagFormValues = z.infer<typeof formSchema>;

interface TagFormProps {
    initialData: TagTable | null | undefined; 
}

export const TagForm: React.FC<TagFormProps> = ({ initialData }) => {

    const [isPending, startTransition] = useTransition();

    const title = initialData ? 'Edit Tag' : 'Create Tag'
    const description = initialData ? 'Edit a Tag' : 'Add a new Tag'
    const toastMessage = initialData ? 'Tag updated.' : 'Tag created.'
    const action = initialData ? 'Save changes' : 'Create'

    const createOrUpdateTagMutation = api.tag.createOrUpdateTag.useMutation({
        onSuccess: () => {
            toast.success(`${toastMessage} successfully`);
            router.push(`/admin/${String(params.storeId)}/tags`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    });

    const deleteTagMutation = api.tag.deleteTagById.useMutation({
        onSuccess: () => {
            toast.success("Tag deleted successfully");
            router.push(`/admin/${String(params.storeId)}/tags`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    });

    const params = useParams();
    const router = useRouter();    

    const [open, setOpen] = useState(false);

    const form = useForm<TagFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            name: '',
            value: '',
        },
    });

    const onSubmit = (data: TagFormValues) => {
        startTransition(() => {
            if (initialData) {
                createOrUpdateTagMutation.mutate({
                    id: initialData.id,
                    name: data.name,
                    value: data.value,
                    storeId: String(params.storeId),
                });
            } else {
                createOrUpdateTagMutation.mutate({
                    name: data.name,
                    value: data.value,
                    storeId: String(params.storeId),
                });
            }
        });
    };

    const onDelete = () => {
        startTransition(() => {
            deleteTagMutation.mutate({ id: String(params.tagId) });
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
                    <div className='grid grid-cols-2 gap-8'>
                        <FormField
                            control={form.control} 
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='Tag name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="value"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='Tag value' {...field} />
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