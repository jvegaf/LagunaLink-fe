import React from 'react';
import '../__shared__/styles.css';
import { CompanyRegister } from '../../components/Register/Company/CompanyRegister';

export default function register() {
  return (
    <div className="row m-0 p-0">
      <div className="col-12 center">
        <CompanyRegister />
      </div>
    </div>
  );
}