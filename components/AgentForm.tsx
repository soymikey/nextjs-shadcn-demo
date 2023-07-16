import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  CREATE,
  CREATEAGENT,
  EDIT,
  OFFLINE,
  ONLINE,
  UPDATE,
} from "@/app/constants";

import { Input } from "@/components/ui/input";
import Icons from "@/components/Icons";

interface AgentFormProps extends React.HTMLAttributes<HTMLDivElement> {
  buttonText: string;
  isEdit: boolean;
  agent: IAgent;
  onAgentHandler: (agent: z.infer<typeof formSchema>) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Please enter a name mininum length 1.",
  }),
  status: z.string({
    required_error: "Please select an status.",
  }),
});

function AgentForm(props: AgentFormProps) {
  const { buttonText, isEdit, agent, onAgentHandler } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: agent.name,
      status: agent.status,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      setOpen(false);
      onAgentHandler({ ...agent, ...values });
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [form, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={isEdit ? "outline" : "default"}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? EDIT : CREATEAGENT}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus={false}
                      placeholder="Entry a name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Online">{ONLINE} </SelectItem>
                        <SelectItem value="Offline">{OFFLINE} </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEdit ? UPDATE : CREATE}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AgentForm;
