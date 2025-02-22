export type Recharge = {
    id: number;
    phone_id: number;
    value: number;
    created_at: Date;
  };
  
  export type CreateRechargeDTO = Omit<Recharge, "id" | "created_at">;
  
