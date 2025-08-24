// utils/data.ts
/**
 * Contains test-reusable data such as user credentials and sorting options.
 */

export interface UserCredentials {
    username: string;
    password: string;
  }
  
  export interface UserInfo {
    firstName: string;
    lastName: string;
    postalCode: string;
  }
  
  export const users: { [key: string]: UserCredentials } = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
    problem: { username: 'problem_user', password: 'secret_sauce' },
    performanceGlitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
  };
  
  export const userInfo: UserInfo = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  };
  
  export const sortOptions: { [key: string]: string } = {
    az: 'az',
    za: 'za',
    lohi: 'lohi',
    hilo: 'hilo'
  };
  
  export const products = {
    backpack: 'Sauce Labs Backpack',
    jacket: 'Sauce Labs Fleece Jacket'
  };