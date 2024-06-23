"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, LoaderCircle, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SetupFormValues, SetupSchema } from "@/types/user/setup";
import { setupUser } from "@/actions/user";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SetupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<SetupFormValues>({
    mode: "onChange",
    resolver: zodResolver(SetupSchema),
    defaultValues: {
      username: "",
      gender: "",
    },
  });

  async function onSubmit(data: SetupFormValues) {
    try {
      setIsLoading(true);
      const response = await setupUser(data);
      if (response.status === "error") {
        if (response.message === "Username is taken") {
          form.setError("username", { message: response.message });
        } else {
          form.clearErrors();
        }
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        action={async () => {
          const valid = await form.trigger();
          if (valid) onSubmit(form.getValues());
        }}
        className="z-10 flex w-full flex-col space-y-6 md:w-1/2 lg:w-2/6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="delokfilm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="w-full space-y-3 md:w-[240px]">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex w-full justify-start text-xs"
                >
                  <FormItem>
                    <FormControl>
                      <ToggleGroupItem
                        value="male"
                        aria-label="Toggle male"
                        className="rounded-full"
                      >
                        Male
                      </ToggleGroupItem>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <ToggleGroupItem
                        value="female"
                        aria-label="Toggle female"
                        className="rounded-full"
                      >
                        Female
                      </ToggleGroupItem>
                    </FormControl>
                  </FormItem>
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          className="ml-auto rounded-full"
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SetupForm;
