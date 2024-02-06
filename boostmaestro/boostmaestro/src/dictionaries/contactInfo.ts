interface Location {
    street: string
    number: string
    city: string
    zip: string
}

export const location: Location = {
    street: "",
    number: "",
    city: "",
    zip: "",
}

interface ContactInfo {
    name: string
    address: string
    phone: string
    email: string
    kvk: string
    vatNumber: string
}

export const contactInfo: ContactInfo = {
    name: "Boost Maestro",
    address: `${location.street} ${location.number}, ${location.zip} ${location.city}`,
    email: "contact@boostmaestro.com",
    phone: "+31 623 770 652 ",
    kvk: "09122310",
    vatNumber: "NL809924328B01",
}

interface SocialMedia {
    instagram?: string
    facebook?: string
    linkedin?: string
}

export const socialMedia: SocialMedia = {
    linkedin: "https://www.linkedin.com/in/guuskrabbenborg",
}