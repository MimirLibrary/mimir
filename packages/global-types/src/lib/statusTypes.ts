export enum StatusTypes {
  INIT = 'INIT', // Ephemeral
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  NEW = 'NEW',
  FREE = 'FREE',
  IN_USE = 'IN_USE', // TAKEN
  PROLONG = 'PROLONG',
  SUSPEND = 'SUSPEND',
  OVERDUE = 'OVERDUE', // Ephemeral
}
