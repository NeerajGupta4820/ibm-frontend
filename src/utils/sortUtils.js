export const sortByName = (items) => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
  };
  
  export const sortByRatings = (items) => {
    return [...items].sort((a, b) => b.ratings - a.ratings);
  };
  
  export const sortByFees = (items) => {
    return [...items].sort((a, b) => {
      const aFee = Math.min(...Object.values(a.fees));
      const bFee = Math.min(...Object.values(b.fees));
      return aFee - bFee;
    });
  };