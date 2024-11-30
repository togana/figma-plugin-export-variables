export function getVariableById(variableId: string): Variable {
  const variable = figma.variables.getVariableById(variableId);
  if (!variable) {
    throw new Error(
      `Variable not found. check the variable: figma.variables.getVariableById(${variableId})`,
    );
  }
  return variable;
}
