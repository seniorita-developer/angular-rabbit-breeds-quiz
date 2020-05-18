  export interface Breed {
    model: string;
    breed_id: number;
    fields: Fields;
  }
  
  export interface Fields {
    name: string;
    image: string;
    sizes: string;
    fur_type: string;
    ear_type: string;
    colors: string;
    ARBA_recognised: string;
    BRC_recognised: string;
    origins: string;
  }