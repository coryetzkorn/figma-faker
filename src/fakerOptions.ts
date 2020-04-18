export interface FakerOption {
  name: string
  methodName: string
}

export interface FakerOptionGroup {
  name: string
  methodName: string
  children: Array<FakerOption>
}

export type FakerOptions = Array<FakerOptionGroup>

const fakerOptions: FakerOptions = [
  {
    name: "Address",
    methodName: "address",
    children: [
      {
        name: "Zip Code",
        methodName: "zipCode",
      },
      {
        name: "City",
        methodName: "city",
      },
      {
        name: "City Prefix",
        methodName: "cityPrefix",
      },
      {
        name: "City Suffix",
        methodName: "citySuffix",
      },
      {
        name: "Street Name",
        methodName: "streetName",
      },
      {
        name: "Street Address",
        methodName: "streetAddress",
      },
      {
        name: "Street Suffix",
        methodName: "streetSuffix",
      },
      {
        name: "Street Prefix",
        methodName: "streetPrefix",
      },
      {
        name: "Secondary Address",
        methodName: "secondaryAddress",
      },
      {
        name: "County",
        methodName: "county",
      },
      {
        name: "Country",
        methodName: "country",
      },
      {
        name: "Country Code",
        methodName: "countryCode",
      },
      {
        name: "State",
        methodName: "state",
      },
      {
        name: "State Abbreviation",
        methodName: "stateAbbr",
      },
      {
        name: "Latitude",
        methodName: "latitude",
      },
      {
        name: "Longitude",
        methodName: "longitude",
      },
    ],
  },
  {
    name: "Name",
    methodName: "name",
    children: [
      {
        name: "First name",
        methodName: "firstName",
      },
      {
        name: "Last name",
        methodName: "lastName",
      },
      {
        name: "Job description",
        methodName: "jobDescriptor",
      },
    ],
  },
]

export default fakerOptions
