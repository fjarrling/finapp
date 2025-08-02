import {Dialog, DialogContent, DialogTrigger, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";


type FormDialogProps = {
  title: string;
  triggerText?: string;
  Form: React.FC<{closeDialog?: () => void}>
};

function FormDialog(props: FormDialogProps) {

  const {title, triggerText, Form} = props;

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          {triggerText || title}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <Form closeDialog={closeDialog}/>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;