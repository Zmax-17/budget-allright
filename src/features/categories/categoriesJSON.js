// const getColorForCategory = (categoryName) => {
//   const cat = CATEGORIES_FLATTENED.find(c => c.name === categoryName);
//   if (cat?.color) return cat.color;

//   const parentName = cat?.parent;
//   if (parentName) {
//     const parent = CATEGORIES_FLATTENED.find(c => c.name === parentName && !c.parent);
//     return parent?.color || '#ccc';
//   }

//   return '#ccc';
// };

export const CATEGORIES_FLATTENED = [
  // === Parent categories ===
  { id: 1, name: "Cafe and restaurant", parent: null, color: "#FF6B6B" },
  { id: 2, name: "Car insurance and car loan", parent: null, color: "#4ECDC4" },
  { id: 3, name: "Children", parent: null, color: "#FFD93D" },
  { id: 4, name: "Clothing and gear", parent: null, color: "#6A0572" },
  { id: 5, name: "Fixed living expenses", parent: null, color: "#2C3E50" },
  { id: 6, name: "Groceries", parent: null, color: "#27AE60" },
  { id: 7, name: "Health and wellbeing", parent: null, color: "#2D2C8E" },
  { id: 8, name: "Hobby and leisure", parent: null, color: "#E67E22" },
  { id: 9, name: "Home and garden", parent: null, color: "#2980B9" },
  { id: 10, name: "Income", parent: null, color: "#2ECC71" },
  { id: 11, name: "Insurance", parent: null, color: "#95A5A6" },
  { id: 12, name: "Kindergarten and after-school care", parent: null, color: "#D35400" },
  { id: 13, name: "Media and entertainment", parent: null, color: "#3498DB" },
  { id: 14, name: "Miscellaneous", parent: null, color: "#7F8C8D" },
  { id: 15, name: "Other loan and debt", parent: null, color: "#E74C3C" },
  { id: 16, name: "Savings", parent: null, color: "#16A085" },
  { id: 17, name: "Transportation and vehicles", parent: null, color: "#9B59B6" },
  { id: 18, name: "Travel", parent: null, color: "#1ABC9C" },
  { id: 19, name: "Uncategorized", parent: null, color: "#BDC3C7" },

  // === Subcategories (linked by parent name) ===
  { name: "Bars and nightlife", parent: "Cafe and restaurant", color: "#FF6B6B" },
  { name: "Cafe", parent: "Cafe and restaurant", color: "#FF6B6B" },
  { name: "Cafeteria", parent: "Cafe and restaurant", color: "#FF6B6B" },
  { name: "Candy", parent: "Cafe and restaurant", color: "#FF6B6B" },
  { name: "Convenience store", parent: "Cafe and restaurant", color: "#FF6B6B" },
  { name: "Fast food", parent: "Cafe and restaurant", color: "#FF6B6B" },
  { name: "Restaurant", parent: "Cafe and restaurant", color: "#FF6B6B" },

  { name: "Children's store", parent: "Children", color: "#FFD93D" },
  { name: "Other child expenses", parent: "Children", color: "#FFD93D" },

  { name: "Clothing", parent: "Clothing and gear", color: "#6A0572" },
  { name: "Jewelry and accessories", parent: "Clothing and gear", color: "#6A0572" },
  { name: "Shoes", parent: "Clothing and gear", color: "#6A0572" },
  { name: "Sporting goods", parent: "Clothing and gear", color: "#6A0572" },

  { name: "Alarm", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Electricity", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Home insurance", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Housing expenses", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Internet", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Mortgage", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Municipal fees", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Phone service", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Property management", parent: "Fixed living expenses", color: "#2C3E50" },
  { name: "Rental and sales", parent: "Fixed living expenses", color: "#2C3E50" },

  { name: "Grocery store", parent: "Groceries", color: "#27AE60" },
  { name: "Supermarket", parent: "Groceries", color: "#27AE60" },
  { name: "Other household items", parent: "Groceries", color: "#27AE60" },

  { name: "Beauty", parent: "Health and wellbeing", color: "#2D2C8E" },
  { name: "Dentist", parent: "Health and wellbeing", color: "#2D2C8E" },
  { name: "Eye care", parent: "Health and wellbeing", color: "#2D2C8E" },
  { name: "Health goods", parent: "Health and wellbeing", color: "#2D2C8E" },
  { name: "Medical services", parent: "Health and wellbeing", color: "#2D2C8E" },
  { name: "Pharmacy", parent: "Health and wellbeing", color: "#2D2C8E" },
  { name: "Wellbeing", parent: "Health and wellbeing", color: "#2D2C8E" },

  { name: "Cabin", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Crafts", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Dating", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Events", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Exercise", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Gift card", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Loans for hobby and leisure", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Movie Theater", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Museum", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Online marketplace", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Pets", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Photography", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Postal services", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Recreational activities", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Toys", parent: "Hobby and leisure", color: "#E67E22" },
  { name: "Web services", parent: "Hobby and leisure", color: "#E67E22" },

  { name: "Appliances", parent: "Home and garden", color: "#2980B9" },
  { name: "Furniture and interior", parent: "Home and garden", color: "#2980B9" },
  { name: "Garden and flowers", parent: "Home and garden", color: "#2980B9" },
  { name: "Home improvement", parent: "Home and garden", color: "#2980B9" },
  { name: "Kitchenware", parent: "Home and garden", color: "#2980B9" },
  { name: "Tools", parent: "Home and garden", color: "#2980B9" },
  { name: "Tradesperson", parent: "Home and garden", color: "#2980B9" },

  { name: "Salary", parent: "Income", color: "#2ECC71" },
  { name: "Dividends", parent: "Income", color: "#2ECC71" },
  { name: "Other income", parent: "Income", color: "#2ECC71" },
  { name: "Wages", parent: "Income", color: "#2ECC71" },

  { name: "Apps and gaming", parent: "Media and entertainment", color: "#3498DB" },
  { name: "Bookseller", parent: "Media and entertainment", color: "#3498DB" },
  { name: "Gambling", parent: "Media and entertainment", color: "#3498DB" },
  { name: "Magazines", parent: "Media and entertainment", color: "#3498DB" },
  { name: "Newspaper", parent: "Media and entertainment", color: "#3498DB" },
  { name: "Streaming services", parent: "Media and entertainment", color: "#3498DB" },
  { name: "TV", parent: "Media and entertainment", color: "#3498DB" },

  { name: "Cash machine", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Credit card payment", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Digital currency", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Gift", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Interest", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Interest and fees", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Membership and charity", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Other expenses", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Payment", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Peer-to-peer payment", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Reimbursed expenses", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Safe deposit box", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Taxes", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Training and education", parent: "Miscellaneous", color: "#7F8C8D" },
  { name: "Transfer", parent: "Miscellaneous", color: "#7F8C8D" },

  { name: "Debt collection", parent: "Other loan and debt", color: "#E74C3C" },
  { name: "Other loans", parent: "Other loan and debt", color: "#E74C3C" },
  { name: "Student loan", parent: "Other loan and debt", color: "#E74C3C" },

  { name: "Car dealership", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Car parts and maintenance", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Car rental", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Driver's education", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Fuel and charging", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Mechanic", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Parking", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Public transport", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Taxi", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Toll", parent: "Transportation and vehicles", color: "#9B59B6" },
  { name: "Vehicle fees", parent: "Transportation and vehicles", color: "#9B59B6" },

  { name: "Accommodation", parent: "Travel", color: "#1ABC9C" },
  { name: "Other travel", parent: "Travel", color: "#1ABC9C" },
  { name: "Phone tickets", parent: "Travel", color: "#1ABC9C" },
  { name: "Travel agency", parent: "Travel", color: "#1ABC9C" },

  { name: "Unknown", parent: "Uncategorized", color: "#BDC3C7" },
];
