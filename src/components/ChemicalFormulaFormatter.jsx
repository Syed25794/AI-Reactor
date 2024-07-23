import React from 'react';
import { constants } from '../constant/constants';


// Function to convert formula to a visual representation
const formatFormula = (formula) => {
  // Regular expression to find numbers that should be subscripts
  const regex = /([A-Z][a-z]?)(\d*)|(\()(\d*)|(\))(\d*)/g;
  return formula.replace(regex, (match, element, subscript, openParen, openSubscript, closeParen, closeSubscript) => {
    if (subscript) {
      return `${element}<sub>${subscript}</sub>`;
    }
    if (openSubscript) {
      return `${openParen}<sub>${openSubscript}</sub>`;
    }
    if (closeSubscript) {
      return `${closeParen}<sub>${closeSubscript}</sub>`;
    }
    return match;
  });
};

const ChemicalFormulaFormatter = ({ formula, backgroundColor }) => {
  return (
    <span style={{color: constants.blackColor === backgroundColor ? constants.whiteColor : backgroundColor}} dangerouslySetInnerHTML={{ __html: formatFormula(formula) }} />
  );
};

export default ChemicalFormulaFormatter;
