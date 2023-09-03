export default function useNumberShort(number:number):string{
    const abbreviations = ["K", "M", "B", "T"]; // Define abbreviations for thousands, millions, billions, trillions, etc.
  
    let result = number.toString();
    const numLength = result.length;
  
    if (numLength <= 3) {
      return result; // No need to shorten small numbers
    }
  
    // Calculate the index for the abbreviation
    const abbreviationIndex = Math.floor((numLength - 1) / 3) - 1;
  
    // Shorten the number and append the abbreviation
    result = (number / Math.pow(1000, abbreviationIndex + 1)).toFixed(1) + abbreviations[abbreviationIndex];
  
    return result;
}