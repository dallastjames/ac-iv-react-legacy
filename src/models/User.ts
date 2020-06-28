export default interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const mockUser: User = {
  id: '1234-567890ab-cdef0123-4567',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@company.com'
};
