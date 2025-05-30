export type PictureUrl = {
  normal: string;
  featured: string; // Puede ser la misma que 'normal' o una URL diferente para una imagen destacada
};

export type CarFeatures = {
  doors: string;
  seats: string;
  air_conditioner: boolean;
  transmition: string;
  fuel_type: string;
  large_suitcase: number;
  small_suitcase: number;
  thumb: string;
  fleet_group_id?: number;
  fleet_category_id?: number;
  fleet_original_category_id?: number;
  category: string;
};

export type PricingCurrency = {
  total_charge: {
    base: {
      total_amount: string;
      estimated_total_amount: string;
      estimated_total_amount_without_equipment_amount: string;
      pp: { prepaid_amount: string; paid_on_destination_amount: string };
      pd: { prepaid_amount: string; paid_on_destination_amount: string };
    };
    discounts: any | null;
    total: {
      total_amount: string;
      estimated_total_amount: string;
      estimated_total_amount_without_equipment_amount: string;
      pp: { prepaid_amount: string; paid_on_destination_amount: string };
      pd: { prepaid_amount: string; paid_on_destination_amount: string };
    };
  };
};

export type RateDetails = {
  rate_data: {
    name: string;
    net_rate: boolean;
    rate_type: string;
    inclusions: { name: string[]; description: string[] };
    step_one: boolean;
  };
  inclusions_meta: {
    [key: string]: {
      name: string;
      description: string;
      visible_voucher: boolean;
    };
  };
  discount_numbers: any | null;
  pricing: {
    USD: PricingCurrency;
    COP: PricingCurrency;
  };
  tags: Tag[];
  id: number;
};

export type Tag = {
  id: number;
  name_filter: string;
  visible: boolean;
  name: string;
  icon: string;
  color: string;
  remote_url: string | null;
  placeholder: string;
  priority: number;
};

export type CompanyData = {
  name: string;
  icon: string;
};

export type Car = {
  companyData?: CompanyData;
  id: number;
  uniqueId: string;
  brand: number;
  name: string;
  name_details: string;
  code: string;
  vehicle_group: string;
  air_conditioner: boolean;
  transmission_type: string;
  vehicle_type: string;
  vehicle_class: string;
  fuel_type: string | null;
  drive_type: string | null;
  door_count: string | null;
  picture_url: PictureUrl;
  stars: number;
  features: CarFeatures;
  tags: Tag[];
  rates: { [rateCode: string]: RateDetails };
};

export type CarBrands = {
  [brandName: string]: Car[];
};

export type CarData = {
  cars: CarBrands;
};
