import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks";
import { Loader2 } from "lucide-react";

const contactFormSchema = z.object({
  subject: z.string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  category: z.enum(['bug', 'feature_request', 'technical_issue', 'account', 'other']),
  description: z.string()
    .min(20, "Please provide more details (at least 20 characters)")
    .max(2000, "Description must be less than 2000 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      subject: "",
      category: "other",
      description: "",
      email: user?.email || "",
      name: user?.name || ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // TODO: Implement Firebase/GCP integration
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Ticket submitted:", data);
      
      toast({
        title: "Ticket Submitted Successfully! 🎉",
        description: "We've received your issue and will respond via email soon.",
      });
      
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your ticket. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name" 
                    className="h-11 border-2 border-border focus-visible:border-primary bg-card dark:bg-input transition-colors"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    className="h-11 border-2 border-border focus-visible:border-primary bg-card dark:bg-input transition-colors"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-11 border-2 border-border focus:border-primary bg-card dark:bg-input transition-colors">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bug">🐛 Bug Report</SelectItem>
                  <SelectItem value="feature_request">✨ Feature Request</SelectItem>
                  <SelectItem value="technical_issue">⚙️ Technical Issue</SelectItem>
                  <SelectItem value="account">👤 Account Issue</SelectItem>
                  <SelectItem value="other">💬 Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Subject</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Brief description of your issue" 
                  className="h-11 border-2 border-border focus-visible:border-primary bg-card dark:bg-input transition-colors"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide detailed information about your issue..."
                  className="min-h-[150px] resize-none border-2 border-border focus-visible:border-primary bg-card dark:bg-input transition-colors"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground">
                <FormMessage />
                <span>{field.value.length}/2000</span>
              </div>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full h-11 bg-gradient-primary hover:opacity-90 font-semibold shadow-md hover:shadow-lg transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Ticket"
          )}
        </Button>
      </form>
    </Form>
  );
}
