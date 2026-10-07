import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: 'Please enter a valid 10-digit Indian phone number starting with 6-9.',
  }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
