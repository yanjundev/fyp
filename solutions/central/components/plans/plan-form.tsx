'use client';

// hooks
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

// forms
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivitySchema, PlanSchema } from '@/schemas';

//components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import { Dialog, DialogContent } from '../ui/dialog';
import { ActivityForm } from './activity-form';
import { Activity } from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { isTag } from '@/lib/validate';
import { Badge } from '../ui/badge';
import { TagInput } from '../ui/tag-input';
import { Textarea } from '../ui/textarea';

export const PlanForm = ({
  type,
  plan,
  submitting,
  handleSubmit,
}: PlanFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [addTags, setAddTags] = useState(false);

  const form = useForm<z.infer<typeof PlanSchema>>({
    resolver: zodResolver(PlanSchema),
    defaultValues: {
      name: plan.name,
      description: plan.description ? plan.description : '',
      activities: plan.activities,
      tags: plan.tags ? plan.tags : [],
      isPublic: plan.isPublic,
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'activities',
    control: form.control,
  });

  const onCheckTag = (text: string) => {
    if (isTag(text)) return true;

    return false;
  };

  const handleAddActivity = (values: z.infer<typeof ActivitySchema>) => {
    append(values);
    setIsOpen(!isOpen);
  };

  return (
    <div className='container max-w-2xl'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-6 max-w-2xl'
        >
          <h2 className='text-lg font-medium'>{type} plan</h2>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='untitled name'
                    disabled={submitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='summarise what your plan is...'
                    className='h-20'
                    disabled={submitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem className='flex flex-row justify-between items-center border-hidden'>
                {addTags || field.value.length !== 0 ? (
                  <TagInput
                    value={field.value}
                    onChange={field.onChange}
                    name='tags'
                    placeHolder='type here to add tags'
                    isTag={onCheckTag}
                  />
                ) : (
                  <Badge
                    variant='secondary'
                    className='rounded-full text-base cursor-pointer'
                    onClick={() => {
                      setAddTags(!addTags);
                    }}
                  >
                    #add tags to help people find your plan
                  </Badge>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`activities`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>activities</FormLabel>

                {fields.length !== 0 &&
                  fields.map((activity, index) => (
                    <div key={index} className='flex space-x-1 items-center'>
                      <div className='flex items-center space-x-1'>
                        <FormField
                          control={form.control}
                          name={`activities.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={activity.name}
                                  className='w-64'
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`activities.${index}.weight`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={activity.weight}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`activities.${index}.time`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder={activity.time} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`activities.${index}.reps`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder={activity.reps} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        variant='destructive'
                        type='button'
                        onClick={() => remove(index)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  ))}

                <Button
                  type='button'
                  variant='outline'
                  disabled={submitting}
                  className='w-full h-20'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  add activity
                </Button>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='isPublic'
            render={({ field }) => (
              <FormItem className='flex flex-row justify-between items-center p-4 rounded-lg border'>
                <div className='space-y-0.5'>
                  <FormLabel>public</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit' disabled={submitting} className='w-full'>
            {type === 'create' ? 'publish' : 'save'}
          </Button>
        </form>
      </Form>

      <Dialog
        onOpenChange={() => setIsOpen(!isOpen)}
        open={isOpen}
        modal
        defaultOpen={isOpen}
      >
        <DialogContent>
          <ActivityForm onSave={handleAddActivity} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export interface Plan {
  name: string;
  description: string;
  activities: Activity[];
  tags: string[];
  isPublic: boolean;
}

interface PlanFormProps {
  type: 'create' | 'update';
  plan: Plan;
  submitting: boolean;
  handleSubmit: (values: z.infer<typeof PlanSchema>) => void;
}
