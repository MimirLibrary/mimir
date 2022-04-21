import { gql } from '@apollo/client';

export const GET_ALL_MATERIALS = gql`
  query {
    getAllMaterials {
      created_at
      identifier
    }
  }
`;
