interface IAuthor {
  id: number;
  name: string;
}

interface IPublisher {
  id: number;
  name: string;
}

interface IMeta {
  ageRestriction: string;
  coverType: string;
  dimensions: string;
  manufacturer: string;
  mass: string;
  numberOfPages: string;
  price: string;
  series: string;
  sku: string;
}

interface IMaterialMetaData {
  authors: Array<IAuthor>;
  cover: string;
  description: string;
  title: string;
  yearPublishedAt: number;
  meta: IMeta;
  publisher: IPublisher;
}

export interface IMetaOfMaterial {
  idType: string;
  value: string;
  material: IMaterialMetaData;
}
