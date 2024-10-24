import { IFakerOptions } from "./faker"

const fakerOptions: IFakerOptions = [
  {
    name: "Name",
    children: [
      {
        name: "First name",
        methodName: "name.firstName",
      },
      {
        name: "Last name",
        methodName: "name.lastName",
      },
      {
        name: "Full name",
        methodName: "name.findName",
      },
      {
        name: "Prefix",
        methodName: "name.prefix",
      },
      {
        name: "Suffix",
        methodName: "name.suffix",
      },
      {
        name: "Job title",
        methodName: "name.jobTitle",
      },
      {
        name: "Job descriptor",
        methodName: "name.jobDescriptor",
      },
      {
        name: "Job area",
        methodName: "name.jobArea",
      },
      {
        name: "Job type",
        methodName: "name.jobType",
      },
    ],
  },
  {
    name: "Internet",
    children: [
      {
        name: "Email address",
        methodName: "internet.email",
      },
      {
        name: "Username",
        methodName: "internet.userName",
      },
      {
        name: "Password",
        methodName: "internet.password",
      },
      {
        name: "URL",
        methodName: "internet.url",
      },
      {
        name: "Domain name",
        methodName: "internet.domainName",
      },
      {
        name: "IP address",
        methodName: "internet.ip",
      },
      {
        name: "Hex color",
        methodName: "internet.color",
      },
    ],
  },
  {
    name: "Lorem Ipsum",
    children: [
      {
        name: "Single word",
        methodName: "lorem.word",
      },
      {
        name: "Multiple words",
        methodName: "lorem.words",
      },
      {
        name: "Single sentence",
        methodName: "lorem.sentence",
      },
      {
        name: "Multiple sentences",
        methodName: "lorem.sentences",
      },
      {
        name: "Single paragraph",
        methodName: "lorem.paragraph",
      },
      {
        name: "Multiple paragraphs",
        methodName: "lorem.paragraphs",
      },
      {
        name: "Slug",
        methodName: "lorem.slug",
      },
    ],
  },
  {
    name: "Address",
    children: [
      {
        name: "Zip code",
        methodName: "address.zipCode",
      },
      {
        name: "City",
        methodName: "address.city",
      },
      {
        name: "City prefix",
        methodName: "address.cityPrefix",
      },
      {
        name: "City suffix",
        methodName: "address.citySuffix",
      },
      {
        name: "Street name",
        methodName: "address.streetName",
      },
      {
        name: "Street address",
        methodName: "address.streetAddress",
      },
      {
        name: "Street suffix",
        methodName: "address.streetSuffix",
      },
      {
        name: "Street prefix",
        methodName: "address.streetPrefix",
      },
      {
        name: "Secondary address",
        methodName: "address.secondaryAddress",
      },
      {
        name: "County",
        methodName: "address.county",
      },
      {
        name: "Country",
        methodName: "address.country",
      },
      {
        name: "Country code",
        methodName: "address.countryCode",
      },
      {
        name: "State",
        methodName: "address.state",
      },
      {
        name: "State abbreviation",
        methodName: "address.stateAbbr",
      },
      {
        name: "Latitude",
        methodName: "address.latitude",
      },
      {
        name: "Longitude",
        methodName: "address.longitude",
      },
    ],
  },
  {
    name: "Phone",
    children: [
      {
        name: "Phone number",
        methodName: "phone.phoneNumberFormat",
      },
    ],
  },
  {
    name: "Random",
    children: [
      {
        name: "Number",
        methodName: "random.number",
      },
      {
        name: "Float",
        methodName: "random.float",
      },
      {
        name: "Alphanumeric",
        methodName: "random.alphaNumeric",
      },
      {
        name: "Word",
        methodName: "random.word",
      },
      {
        name: "Multiple words",
        methodName: "random.words",
      },
      {
        name: "UUID",
        methodName: "random.uuid",
      },
    ],
  },
  {
    name: "Data Type",
    children: [
      {
        name: "Number",
        methodName: "datatype.number",
      },
      {
        name: "Float",
        methodName: "datatype.float",
      },
      {
        name: "Datetime",
        methodName: "datatype.datetime",
      },
      {
        name: "String",
        methodName: "datatype.string",
      },
      {
        name: "UUID",
        methodName: "datatype.uuid",
      },
      {
        name: "JSON",
        methodName: "datatype.json",
      },
    ],
  },
  {
    name: "Commerce",
    children: [
      {
        name: "Color (word)",
        methodName: "commerce.color",
      },
      {
        name: "Department",
        methodName: "commerce.department",
      },
      {
        name: "Product name",
        methodName: "commerce.productName",
      },
      {
        name: "Price",
        methodName: "commerce.price",
      },
      {
        name: "Product adjective",
        methodName: "commerce.productAdjective",
      },
      {
        name: "Product material",
        methodName: "commerce.productMaterial",
      },
      {
        name: "Product name",
        methodName: "commerce.product",
      },
    ],
  },
  {
    name: "Company",
    children: [
      {
        name: "Company name",
        methodName: "company.companyName",
      },
      {
        name: "Catch phrase",
        methodName: "company.catchPhrase",
      },
      {
        name: "BS Adjective",
        methodName: "company.bsAdjective",
      },
      {
        name: "BS Buzzword",
        methodName: "company.bsBuzz",
      },
      {
        name: "BS Noun",
        methodName: "company.bsNoun",
      },
    ],
  },
  {
    name: "Date",
    children: [
      {
        name: "Past date",
        methodName: "date.past",
      },
      {
        name: "Recent date",
        methodName: "date.recent",
      },
      {
        name: "Future date",
        methodName: "date.future",
      },
      {
        name: "Month",
        methodName: "date.month",
      },
      {
        name: "Day of the week",
        methodName: "date.weekday",
      },
    ],
  },
  {
    name: "Finance",
    children: [
      {
        name: "Account number",
        methodName: "finance.account",
      },
      {
        name: "Account name",
        methodName: "finance.accountName",
      },
      {
        name: "Amount",
        methodName: "finance.amount",
      },
      {
        name: "Transaction type",
        methodName: "finance.transactionType",
      },
      {
        name: "Currency code",
        methodName: "finance.currencyCode",
      },
      {
        name: "Currency name",
        methodName: "finance.currencyName",
      },
      {
        name: "Currency symbol",
        methodName: "finance.currencySymbol",
      },
    ],
  },
  {
    name: "System",
    children: [
      {
        name: "File name",
        methodName: "system.commonFileName",
      },
      {
        name: "File type",
        methodName: "system.commonFileExt",
      },
    ],
  },
  {
    name: "Hacker",
    children: [
      {
        name: "Abbreviation",
        methodName: "hacker.abbreviation",
      },
      {
        name: "Adjective",
        methodName: "hacker.adjective",
      },
      {
        name: "Noun",
        methodName: "hacker.noun",
      },
      {
        name: "Verb",
        methodName: "hacker.verb",
      },
      {
        name: "Verb (ending in ING)",
        methodName: "hacker.ingverb",
      },
      {
        name: "Phrase",
        methodName: "hacker.phrase",
      },
    ],
  },
]

export default fakerOptions
