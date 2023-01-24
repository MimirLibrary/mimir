export interface AuthUser {
  person_id: string;
  given_name: string;
  family_name: string;
  display_name: string;
  picture: string;
  email: string;
  phone_number: string;
  skype: string;
  employee_id: string;
  title_role: string;
  unit_id: string;
  smg_profile_id: string;
  smg_unit_id: string;
  user_type: string;
  unit_type: string;
  unit_name: string;
  is_prod_unit: boolean;
  root_unit_id: string;
  root_unit_name: string;
  department_unit_id: string;
  department_unit_name: string;
  unit_unit_id: string;
  unit_unit_name: string;
  preferred_username: string;
  name: string;
}
