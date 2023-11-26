import * as RadixForm from "@radix-ui/react-form";
import extendPrimitive from "./extendPrimitive";

export const Form = extendPrimitive(RadixForm.Root);
export const FormField = extendPrimitive(RadixForm.Field);
export const FormLabel = extendPrimitive(RadixForm.Label);
export const FormMessage = extendPrimitive(RadixForm.Message);
export const FormControl = extendPrimitive(RadixForm.Control);
export const FormSubmit = extendPrimitive(RadixForm.Submit);
