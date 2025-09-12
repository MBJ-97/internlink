"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteButton({ itemId, onDelete, itemType }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDelete = async (event) => {
    event.preventDefault(); // Prevent default closing behavior
    setStatus('loading');
    setErrorMessage(null);
    try {
      const result = await onDelete(itemId);
      if (result && result.error) {
        setErrorMessage(result.error);
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setErrorMessage(err.message || `Failed to delete ${itemType}.`);
      setStatus('error');
      console.error(`Failed to delete ${itemType}:`, err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset status after closing if needed, or let it persist until next open
    setTimeout(() => setStatus('idle'), 300); // Give some time for the dialog to close
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {status === 'idle' && (
            <>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the{" "}
                {itemType}.
              </AlertDialogDescription>
            </>
          )}
          {status === 'loading' && (
            <AlertDialogTitle>Deleting...</AlertDialogTitle>
          )}
          {status === 'success' && (
            <AlertDialogTitle>Success!</AlertDialogTitle>
          )}
          {status === 'error' && (
            <AlertDialogTitle>Error</AlertDialogTitle>
          )}
        </AlertDialogHeader>

        {status === 'error' && (
          <p className="text-red-500 text-sm mb-4">Error: {errorMessage}</p>
        )}
        {status === 'success' && (
          <p className="text-green-500 text-sm mb-4">{itemType} deleted successfully!</p>
        )}

        <AlertDialogFooter>
          {status === 'idle' && (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={status === 'loading'}>
                Delete
              </AlertDialogAction>
            </>
          )}
          {(status === 'success' || status === 'error') && (
            <AlertDialogAction onClick={handleClose}>Close</AlertDialogAction>
          )}
          {status === 'loading' && (
            <AlertDialogAction disabled>
              Deleting...
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
