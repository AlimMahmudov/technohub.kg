namespace CARDS {
  type GetContactRes = {
    id: number;
    address: string;
    work_schedule: string;
    email: string;
    phone_number: {
      id: number;
      phone_number: string;
    }[];
    whatsapp: {
      id: number;
      whatsapp: string;
    }[];
    telegram: {
      id: number;
      telegram: string;
    }[];
    instagram: {
      id: number;
      instagram: string;
    }[];
  };

  type GetContactReq = void;
}
