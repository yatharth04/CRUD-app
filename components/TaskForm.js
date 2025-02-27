import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from 'react-query';

// Zod validation schema
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

function TaskForm({ existingTask, onSuccess }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: existingTask || { title: '' },
  });

  const mutation = useMutation(
    async (data) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: existingTask ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    {
      onSuccess: () => {
        onSuccess();
      },
    }
  );

  const onSubmit = (data) => {
    if (taskSchema.safeParse(data).success) {
      mutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 border border-gray-300 rounded-md">
      <div className="mb-4">
        <input
          {...register('title')}
          placeholder="Task Title"
          className="input input-bordered input-primary w-full"
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={mutation.isLoading}
      >
        {existingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
