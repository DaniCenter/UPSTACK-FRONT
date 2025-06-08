import { z } from "zod";

// Auth Types

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
  name: z.string().min(3),
  token: z.string().min(6),
  current_password: z.string().min(8),
});

type AuthSchema = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<AuthSchema, "email" | "password">;
export type UserRegisterForm = Pick<AuthSchema, "email" | "password" | "password_confirmation" | "name">;
export type UserConfirmAccountForm = Pick<AuthSchema, "token">;
export type RequestConfirmationCodeForm = Pick<AuthSchema, "email">;
export type ForgotPasswordForm = Pick<AuthSchema, "email">;

export type NewPasswordForm = Pick<AuthSchema, "password" | "password_confirmation">;
export type ChangePasswordForm = Pick<AuthSchema, "current_password" | "password" | "password_confirmation">;

// USERS
const UserSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
export type User = z.infer<typeof UserSchema>;
export type UserFormData = Pick<User, "name" | "email">;

export const ProyectSchema = z.object({
  proyectName: z.string().min(1),
  clientName: z.string().min(1),
  description: z.string().min(1),
  _id: z.string(),
  manager: z.string(),
});

export const DashboardViewProyectsSchema = z.object({
  message: z.string(),
  proyects: z.array(ProyectSchema),
});

export const ProyectFormDataSchema = z.object({
  message: z.string(),
  proyect: ProyectSchema,
});

export const TaskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);

const NoteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: UserSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const TaskSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  proyect: z.string().min(1),
  status: TaskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  completedBy: z.array(z.object({ user: UserSchema, status: TaskStatusSchema })),
  notes: z.array(NoteSchema),
});

export const ProyectCompleteSchema = z.object({
  message: z.string(),
  proyect: z.object({
    _id: z.string(),
    proyectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema),
    manager: z.string(),
    __v: z.number(),
  }),
});

export type Proyect = z.infer<typeof ProyectSchema>;
export type ProyectoFormData = Pick<Proyect, "proyectName" | "clientName" | "description">;

export type DashboardViewProyects = z.infer<typeof DashboardViewProyectsSchema>;
export type ProyectFormData = z.infer<typeof ProyectFormDataSchema>;

export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;

export type ProyectComplete = z.infer<typeof ProyectCompleteSchema>;

// Team
const TeamMemberSchema = UserSchema.pick({
  _id: true,
  name: true,
  email: true,
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

// Notes
export type Note = z.infer<typeof NoteSchema>;
export type NoteFormData = Pick<Note, "content">;
