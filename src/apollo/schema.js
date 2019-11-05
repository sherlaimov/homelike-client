const typeDefs = `
type Query {
  user(_id: String): Users
  users(owner: String limit: Int skip: Int): UsersWithPagination

  apartment(_id: String): Apartments
  apartments(active: Boolean owner: String location: String limit: Int skip: Int): ApartmentsWithPagination
  
  location(_id: String): Locations
  locations(active: Boolean limit: Int skip: Int): LocationsWithPagination
}

type Mutation {
 deleteApartment( _id: String! ): Apartments
}

type ApartmentsWithPagination {
  total: Int
  items: [Apartments]
}

type Apartments {
  _id: String!
  owner: Users
  title: String
  location: Locations
  size: Int
  price: Int
  images: [String]
  amenities: [String]
  details: Detail
  services: [String]
}

type Detail {
  rooms: Int
  bedrooms: Int
  floor: Int
  bathrooms: Int
}
type LocationsWithPagination {
  total: Int
  items: [Locations]
}

type Locations {
  _id: String!
  title: String
}

type UsersWithPagination {
  total: Int
  items: [Users]
}

type Users {
  _id: String!
  email: String
  profile: Profile
}

type Profile {
  firstName: String
  lastName: String
  role: String
}

`;

export default typeDefs