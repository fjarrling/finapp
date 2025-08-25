import {Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {Button, buttonVariants} from "@/components/ui/button";
import {type ReactNode, useState} from "react";
import type {VariantProps} from "class-variance-authority";
import {Edit2, Plus, Trash} from "lucide-react";

type FormDialogProps = {
  title: string;
  triggerText?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  icon?: "edit" | "trash" | "plus";
  children: (closeDialog: () => void) => ReactNode;
};

function FormDialog({variant, size, title, triggerText, children, icon}: FormDialogProps) {
  const [open, setOpen] = useState(false);

  const closeDialog = () => setOpen(false);

  const renderIcon = () => {
    switch (icon) {
      case "plus":
        return <Plus/>;
      case "edit":
        return <Edit2/>;
      case "trash":
        return <Trash/>;
      default:
        return null;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          {icon && renderIcon()}
          {!icon && (triggerText || title)}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {children(closeDialog)}
        <DialogDescription className="sr-only">
          Form: {title}. Please fill out the required fields and submit.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;