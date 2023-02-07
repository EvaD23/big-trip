function ucFirst(str) {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

function padStartZero(number) {
 return number.toString().padStart(2, '0');
}


export { ucFirst, padStartZero };

