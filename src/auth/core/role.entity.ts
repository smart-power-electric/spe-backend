export class Role {
  id: string;
  roleName: string;
  roleDescription: string;
  role: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;

  constructor(data: {
    id: string | undefined;
    roleName: string;
    roleDescription: string;
    role: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
  }) {
    this.id = data.id ?? '';
    this.roleName = data.roleName;
    this.roleDescription = data.roleDescription;
    this.role = data.role;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
  }
}
