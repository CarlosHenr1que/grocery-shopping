import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().regex(/^\d+$/).transform(Number),
    DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid URL" }),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.format());
    process.exit(1);
}

const env = parsed.data;

export default env;
