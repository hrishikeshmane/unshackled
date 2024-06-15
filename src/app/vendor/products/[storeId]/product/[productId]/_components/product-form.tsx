"use client"

import { useState, useTransition } from 'react'
import * as z from 'zod'
import { Heading } from "~/app/admin/_components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '~/app/admin/_components/modals/alert-modal';
import { type TagTable, type TypeTable, type ProductWithRelations } from '~/types/globals';
import { api } from "~/trpc/react";
import ImageUpload from '~/app/admin/_components/image-upload';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Checkbox } from '~/components/ui/checkbox';
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    tagline: z.string().min(1),
    price: z.string().min(1),
    estTurnAroundTime: z.string().min(1),
    stripeId: z.string(),
    imageUrl: z.string().min(1),
    domainRank: z.string().min(1),
    tagId: z.string().min(1),
    typeId: z.string().min(1),
    // images: z.object({ url: z.string() }).array(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    initialData: ProductWithRelations | null | undefined;
    tags: TagTable[];
    types: TypeTable[];
    }
    
    export const ProductForm: React.FC<ProductFormProps> = ({ initialData, tags, types }) => {
    
    const [isPending, startTransition] = useTransition();
    
    const { userId, isLoaded, isSignedIn } = useAuth();
    
    const title = initialData?.id ? 'Edit Product' : 'Create Product'
    const description = initialData?.id ? 'Edit a Product' : 'Add a new Product'
    const toastMessage = initialData?.id ? 'Product updated.' : 'Product created.'
    const action = initialData?.id ? 'Save changes' : 'Create'
    
    const createOrUpdateProductMutation = api.product.createOrUpdateProduct.useMutation({
        onSuccess: () => {
            toast.success(`${toastMessage} successfully`);
            router.push(`/vendor/products`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
        },
    });
    
    const deleteProductMutation = api.product.deleteProductById.useMutation({
        onSuccess: () => {
            toast.success("Product deleted successfully");
            router.push(`/vendor/products`);
        },
        onError: (err) => {
            toast.error(`Something went wrong: ${err.message}`);
            },
            });
            
    const params = useParams();
    const router = useRouter();    

    const [open, setOpen] = useState(false);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            name: "",
            description: "",
            tagline: "",
            price: "",
            estTurnAroundTime: "",
            stripeId: "",
            imageUrl: "",
            domainRank: "",
            tagId: "",
            typeId: "",
            },
            });
            
    const onSubmit = (data: ProductFormValues) => {
        // console.log("FORM valiation errors>>", form.formState.errors);
        // console.log("PRODUCT DATA>>", data);
        // console.log("IS Pending>>", isPending);

        startTransition(() => {
            createOrUpdateProductMutation.mutate({
                name: data.name,
                tagline: data.tagline,
                description: data.description,
                price: data.price,
                commission: "20",
                commissionType: "percentage",
                stripeId: "xxx",
                imageUrl: data.imageUrl,
                estTurnAroundTime: data.estTurnAroundTime,
                domainRank: data.domainRank,
                isFeatured: false,
                isArchived: false,
                isApproved: "pending",
                tagId: data.tagId,
                typeId: data.typeId,
                creatorId: initialData?.creatorId ? initialData.creatorId : String(userId),
                id: initialData?.id,
                storeId: String(params.storeId),
            });
            });
            };
    
    const onDelete = () => {
        startTransition(() => {
            deleteProductMutation.mutate({ id: String(params.productId) });
            });
            };
            
    if (!isLoaded || !isSignedIn) {
        return null;
        }

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
                    initialData?.id &&
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
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Image (Logo)</FormLabel>
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
                    <div className='grid grid-cols-3 gap-8'>
                        <FormField
                            control={form.control} 
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='Product Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="tagline"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tagline</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={isPending} placeholder='Product Tagline' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={isPending} placeholder='Product description' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="estTurnAroundTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Est. TurnAround Time</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='EstTurnAround Time (days)' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="domainRank"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Domain Rank</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='Domain Ranking' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} placeholder='Product Price' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="typeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select a Type'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {types.map(type => (
                                                <SelectItem key={type.id} value={type.id}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control} 
                            name="tagId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tag</FormLabel>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select a Tag'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tags.map(tag => (
                                                <SelectItem key={tag.id} value={tag.id}>
                                                    {tag.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* <Button onClick={() =>debug()}>DEBUG</Button> */}
                    <Button disabled={isPending} className='ml-auto' type='submit'>{action}</Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}
