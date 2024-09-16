export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const capitalizeLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1); // gets the first letter of the string and capitalizes it then returns the the string after the first letter
}