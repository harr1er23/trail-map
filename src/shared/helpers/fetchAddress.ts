export async function fetchAddress(coords: [number, number]) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
    );
    const data = await response.json();
    console.log(data.address)
    const country = data.address.country;
    const city = data.address.city;
    const town = data.address.town;
    const village = data.address.village;

    return {
      country, 
      city: city ?? town ?? village ?? ''
    };
  }