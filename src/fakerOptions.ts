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
    name: "Commerce",
    methodName: "commerce",
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
        name: "Country",
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
]

export default fakerOptions

// longitude
// commerce
// color
// department
// productName
// price
// productAdjective
// productMaterial
// product
// company
// suffixes
// companyName
// companySuffix
// catchPhrase
// bs
// catchPhraseAdjective
// catchPhraseDescriptor
// catchPhraseNoun
// bsAdjective
// bsBuzz
// bsNoun
// database
// column
// type
// collation
// engine
// date
// past
// future
// between
// recent
// soon
// month
// weekday
// fake
// finance
// account
// accountName
// mask
// amount
// transactionType
// currencyCode
// currencyName
// currencySymbol
// bitcoinAddress
// ethereumAddress
// iban
// bic
// hacker
// abbreviation
// adjective
// noun
// verb
// ingverb
// phrase
// helpers
// randomize
// slugify
// replaceSymbolWithNumber
// replaceSymbols
// shuffle
// mustache
// createCard
// contextualCard
// userCard
// createTransaction
// image
// image
// avatar
// imageUrl
// abstract
// animals
// business
// cats
// city
// food
// nightlife
// fashion
// people
// nature
// sports
// technics
// transport
// dataUri
// internet
// avatar
// email
// exampleEmail
// userName
// protocol
// url
// domainName
// domainSuffix
// domainWord
// ip
// ipv6
// userAgent
// color
// mac
// password
// lorem
// word
// words
// sentence
// slug
// sentences
// paragraph
// paragraphs
// text
// lines
// name
// firstName
// lastName
// findName
// jobTitle
// prefix
// suffix
// title
// jobDescriptor
// jobArea
// jobType
// phone
// phoneNumber
// phoneNumberFormat
// phoneFormats
// random
// number
// float
// arrayElement
// objectElement
// uuid
// boolean
// word
// words
// image
// locale
// alphaNumeric
// hexaDecimal
// system
// fileName
// commonFileName
// mimeType
// commonFileType
// commonFileExt
// fileType
// fileExt
// directoryPath
// filePath
// semver
