export function convertSafeNameParts(name: string): string[] {
  const safeNameParts = name.split('/').map((groupName) =>
    groupName
      .split(/[^\da-zA-Z]+/)
      .join('-')
      .toLowerCase(),
  );
  return safeNameParts;
}
