import {Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";


type FormDialogProps<P> = {
  title: string;
  triggerText?: string;
  Form: React.ComponentType<P>;
  formProps?: P;
  closeDialog?: () => void;
};


function FormDialog<P>(props: FormDialogProps<P>) {
  const {title, triggerText, Form, formProps = {} as P} = props;

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          {triggerText || title}
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