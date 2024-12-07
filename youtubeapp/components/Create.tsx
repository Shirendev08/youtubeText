"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { convert } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { history } from "@/lib/auth"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    video_url: z.string().min(2, {
    message: "url must be at least 2 characters.",
  }),
})

export function Create() {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          video_url: "",
       
        },
      });

      async function onSubmit(values: { video_url: string }) {
        try {
            await convert(values.video_url); // Call the `convert` function here
             await history();
        } catch (error) {
          alert(`Error: ${error}`); // Handle errors (e.g., show an error message)
        }
      }
      

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 mt-5">
      <FormField
        control={form.control}
        name="video_url"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Link</FormLabel>
            <FormControl>
              <Input placeholder="Insert URL here..." {...field} />
            </FormControl>
            <FormDescription>Энд линкээ оруулна уу</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="">
        Submit
      </Button>
    </form>
  </Form>
  )
}
