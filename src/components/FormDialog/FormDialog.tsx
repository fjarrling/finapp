import {Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {Button, buttonVariants} from "@/components/ui/button";
import React, {useState} from "react";
import type {VariantProps} from "class-variance-authority";


type FormDialogProps<P> = {
  title: string;
  triggerText?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"]
  children?: React.ReactNode;
  Form: React.ComponentType<P>;
  formProps?: P;
};


function FormDialog<P>(props: FormDialogProps<P>) {
  const {variant, size, title, triggerText, children, Form, formProps = {} as P} = props;

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          {children ? children : triggerText ? triggerText : title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <Form  {...formProps} closeDialog={closeDialog}/>
        <DialogDescription className="sr-only">
          Form: {title}. Please fill out the required fields and submit.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;