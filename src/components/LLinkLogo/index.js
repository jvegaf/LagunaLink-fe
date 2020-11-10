import React from 'react';
import logo from '../../assets/lagunalink_logo.svg';

export default function LLinkLogo(props) {
  return (
    <img src={logo} alt="lagunalink logo" height={props.size} className="mb-1"/>
  );
}
