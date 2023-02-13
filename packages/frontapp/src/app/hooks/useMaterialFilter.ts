import { GetAllMaterialsQuery } from '@mimir/apollo-client';
import { getStatus } from '../models/helperFunctions/converTime';

type FilterObjectType = { [author: string]: number };

const useMaterialFilter = (
  availableMaterial: GetAllMaterialsQuery['getAllMaterials'],
  filterName: string
) => {
  if (filterName === 'availability') {
    return availableMaterial?.reduce((acc: FilterObjectType, material: any) => {
      const currentStatus = getStatus(
        material?.currentStatus?.status,
        material?.returnDate
      );
      return {
        ...acc,
        [currentStatus as string]: acc[currentStatus as string]
          ? acc[currentStatus as string]! + 1
          : 1,
      };
    }, {});
  }
  const result = availableMaterial?.reduce(
    (acc: FilterObjectType, material: any) => ({
      ...acc,
      [material[filterName]]: acc[material[filterName]]
        ? acc[material[filterName]] + 1
        : 1,
    }),
    {}
  );
  return result;
};

export default useMaterialFilter;
