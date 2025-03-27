export interface Header {
  name: string;
  classes: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  lastUpdated: string;
  lastSynchronized?: string;
}

export const tableHeaders: Header[] = [
  {
    name: "ID",
    classes: "w-10 font-bold"
  },
  { 
    name: "Image",
    classes: "w-20 font-normal" 
  },
  {
    name: "Name",
    classes: "font-normal"
  },
  { 
    name: "Qty.",
    classes: "w-20 font-normal"
  },
  { 
    name: "Last synchronized",
    classes: "w-32 font-normal"
  },
  { 
    name: "",
    classes: "w-32 font-normal"
  }
];