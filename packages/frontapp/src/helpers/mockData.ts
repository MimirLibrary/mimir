export const mockStatus = [
  {
    person_id: 1,
    status: 'Free',
    created_at: '2022-09-08T03:58:39.228Z',
    id: 1,
    material_id: 1,
  },
];

export const mockMaterial = [
  {
    __typename: 'Material',
    author: 'test Author',
    category: 'test Category',
    created_at: '2022-09-08T03:58:39.228Z',
    description: 'Test Description',
    id: '1',
    id_type: 'Test Id_Type',
    identifier: '1111111111',
    is_donated: false,
    notification: [],
    picture: '',
    statuses: mockStatus,
    title: 'test',
    type: 'Book',
    updated_at: '2022-09-08T03:58:39.228Z',
  },
];
