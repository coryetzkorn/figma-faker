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
        name: "Prefix",
        methodName: "prefix",
      },
      {
        name: "Suffix",
        methodName: "suffix",
      },
      {
        name: "Job title",
        methodName: "jobTitle",
      },
      {
        name: "Job descriptor",
        methodName: "jobDescriptor",
      },
      {
        name: "Job area",
        methodName: "jobArea",
      },
      {
        name: "Job type",
        methodName: "jobType",
      },
    ],
  },
  {
    name: "Internet",
    methodName: "internet",
    children: [
      {
        name: "Email address",
        methodName: "email",
      },
      {
        name: "Username",
        methodName: "userName",
      },
      {
        name: "Password",
        methodName: "password",
      },
      {
        name: "URL",
        methodName: "url",
      },
      {
        name: "Domain name",
        methodName: "domainName",
      },
      {
        name: "IP address",
        methodName: "ip",
      },
      {
        name: "Hex color",
        methodName: "color",
      },
    ],
  },
  {
    name: "Lorem Ipsum",
    methodName: "lorem",
    children: [
      {
        name: "Single word",
        methodName: "word",
      },
      {
        name: "Multiple words",
        methodName: "words",
      },
      {
        name: "Single sentence",
        methodName: "sentence",
      },
      {
        name: "Multiple sentences",
        methodName: "sentences",
      },
      {
        name: "Single paragraph",
        methodName: "paragraph",
      },
      {
        name: "Multiple paragraphs",
        methodName: "paragraphs",
      },
      {
        name: "Slug",
        methodName: "slug",
      },
    ],
  },
  {
    name: "Address",
    methodName: "address",
    children: [
      {
        name: "Zip code",
        methodName: "zipCode",
      },
      {
        name: "City",
        methodName: "city",
      },
      {
        name: "City prefix",
        methodName: "cityPrefix",
      },
      {
        name: "City suffix",
        methodName: "citySuffix",
      },
      {
        name: "Street name",
        methodName: "streetName",
      },
      {
        name: "Street address",
        methodName: "streetAddress",
      },
      {
        name: "Street suffix",
        methodName: "streetSuffix",
      },
      {
        name: "Street prefix",
        methodName: "streetPrefix",
      },
      {
        name: "Secondary address",
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
        name: "Country code",
        methodName: "countryCode",
      },
      {
        name: "State",
        methodName: "state",
      },
      {
        name: "State abbreviation",
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
    name: "Phone",
    methodName: "phone",
    children: [
      {
        name: "Phone number",
        methodName: "phoneNumberFormat",
      },
    ],
  },
  {
    name: "Random",
    methodName: "random",
    children: [
      {
        name: "Number",
        methodName: "number",
      },
      {
        name: "Alphanumeric",
        methodName: "alphaNumeric",
      },
      {
        name: "Word",
        methodName: "word",
      },
      {
        name: "Multiple words",
        methodName: "words",
      },
      {
        name: "UUID",
        methodName: "uuid",
      },
    ],
  },
  {
    name: "Commerce",
    methodName: "commerce",
    children: [
      {
        name: "Color (word)",
        methodName: "color",
      },
      {
        name: "Department",
        methodName: "department",
      },
      {
        name: "Product name",
        methodName: "productName",
      },
      {
        name: "Price",
        methodName: "price",
      },
      {
        name: "Product adjective",
        methodName: "productAdjective",
      },
      {
        name: "Product material",
        methodName: "productMaterial",
      },
      {
        name: "Product name",
        methodName: "product",
      },
    ],
  },
  {
    name: "Company",
    methodName: "company",
    children: [
      {
        name: "Company name",
        methodName: "companyName",
      },
      {
        name: "Catch phrase",
        methodName: "catchPhrase",
      },
      {
        name: "BS Adjective",
        methodName: "bsAdjective",
      },
      {
        name: "BS Buzzword",
        methodName: "bsBuzz",
      },
      {
        name: "BS Noun",
        methodName: "bsNoun",
      },
    ],
  },
  {
    name: "Date",
    methodName: "date",
    children: [
      {
        name: "Past date",
        methodName: "past",
      },
      {
        name: "Recent date",
        methodName: "recent",
      },
      {
        name: "Future date",
        methodName: "future",
      },
      {
        name: "Month",
        methodName: "month",
      },
      {
        name: "Day of the week",
        methodName: "weekday",
      },
    ],
  },
  {
    name: "Finance",
    methodName: "finance",
    children: [
      {
        name: "Account number",
        methodName: "account",
      },
      {
        name: "Account name",
        methodName: "accountName",
      },
      {
        name: "Ammount",
        methodName: "amount",
      },
      {
        name: "Transaction type",
        methodName: "transactionType",
      },
      {
        name: "Currency code",
        methodName: "currencyCode",
      },
      {
        name: "Currency name",
        methodName: "currencyName",
      },
      {
        name: "Currency symbol",
        methodName: "currencySymbol",
      },
    ],
  },
  {
    name: "System",
    methodName: "system",
    children: [
      {
        name: "File name",
        methodName: "commonFileName",
      },
      {
        name: "File type",
        methodName: "commonFileExt",
      },
    ],
  },
  {
    name: "Hacker",
    methodName: "hacker",
    children: [
      {
        name: "Abbreviation",
        methodName: "abbreviation",
      },
      {
        name: "Adjective",
        methodName: "adjective",
      },
      {
        name: "Noun",
        methodName: "noun",
      },
      {
        name: "Verb",
        methodName: "verb",
      },
      {
        name: "ING verb",
        methodName: "ingverb",
      },
      {
        name: "Phrase",
        methodName: "phrase",
      },
    ],
  },
]

export default fakerOptions
