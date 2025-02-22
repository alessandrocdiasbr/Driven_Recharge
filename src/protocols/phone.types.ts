export type Phone = {
    id: number;
    number: string;
    name: string;
    description: string;
    document: string;
    carrier_id: number;
  };
  
  export type CreatePhoneDTO = Omit<Phone, "id">;
  
  export type PhoneSummary = {
    document: string;
    phones: {
      id: number;
      number: string;
      carrier: string;
      recharges: {
        value: number;
        created_at: Date;
      }[];
    }[];
  };