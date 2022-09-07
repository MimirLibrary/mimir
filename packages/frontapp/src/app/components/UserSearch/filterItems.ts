export const filterItems = [
  {
    title: 'How many items did the user take?',
    paramName: 'itemsTaken',
    id: 1,
    inputType: 'checkBox',
    subAttributes: [
      { title: 'Nothing', id: 1, checked: false },
      { title: '2 - 10 items', id: 2, checked: false },
      { title: '10 or more items', id: 3, checked: false },
      { title: 'All', id: 4, checked: false },
    ],
  },
  {
    title: 'Sort By',
    paramName: 'SortBy',
    id: 2,
    inputType: 'radio',
    subAttributes: [
      { title: 'By alphabet', id: 1, checked: false },
      { title: 'Number of things taken', id: 2, checked: false },
      { title: 'Number of overdue deals', id: 3, checked: false },
    ],
  },
];
