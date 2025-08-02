import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import AddAccountForm from "@/components/AddAccountForm";
import {DialogTitle} from "@/components/ui/dialog";

const AddAccountDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild={true}>
        <Button className='cursor-pointer'>
          + Add Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Add Account
        </DialogTitle>
        <AddAccountForm/>
      </DialogContent>
    </Dialog>
  );
};

export default AddAccountDialog;