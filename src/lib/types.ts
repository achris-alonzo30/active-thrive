export interface ServingSizes {
  label: string;
  quantity: number;
  uri: string;
}

export interface Food {
  brand: string | "Generic";
  foodId: string;
  label: string;
  nutrients: {
    CHOCDF: number;
    ENERC_KCAL: number;
    FAT: number;
    FIBTG: number;
    PROCNT: number;
  };
  servingSizes: ServingSizes[];
}

export interface Hint {
  food: Food;
}

export interface Foods {
  hints: Hint[];
  text: string;
}
