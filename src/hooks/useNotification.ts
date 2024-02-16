import { useToast } from "@components/ui/use-toast";

const useNotification = () => {
  const { toast } = useToast();

  const showNotification = (variant: "default" | "destructive" | null | undefined, title: string, message: string) => {
    toast({
      variant,
      title: title,
      description: message,
    });
  };

  return { showNotification };
};

export default useNotification;
