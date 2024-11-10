export class Invoices {
  id: string;
  date: Date | null;
  stageId: string | null;
  invoiceNumber: string | null;
  totalAmount: number | null;
  showMaterials: boolean | null;
  createdAt: Date;
  updatedAt: Date | null;

  constructor(params: {
    id?: string;
    date: Date | null;
    stageId: string | null;
    invoiceNumber: string | null;
    totalAmount: number | null;
    showMaterials: boolean | null;
    createdAt: Date;
    updatedAt: Date | null;
  }) {
    this.id = params.id ?? '';
    this.date = params.date;
    this.stageId = params.stageId;
    this.invoiceNumber = params.invoiceNumber;
    this.totalAmount = params.totalAmount;
    this.showMaterials = params.showMaterials;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
