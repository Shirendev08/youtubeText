"use client";
import React from 'react';
import { z } from "zod";
import { FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';
import { authFormSchema } from '@/lib/utils';

// Use typeof authFormSchema('sign-up') to define the schema type without assigning a value
type FormSchemaType = z.infer<ReturnType<typeof authFormSchema>>;

interface CustomInputProps {
  control: Control<FormSchemaType>;
  name: FieldPath<FormSchemaType>;
  label: string;
  placeholder: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ control, name, label, placeholder }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
