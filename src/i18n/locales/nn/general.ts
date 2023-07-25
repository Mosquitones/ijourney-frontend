import { GeneralLocaleTypes } from '../locales.types'

const generalLocaleNo: GeneralLocaleTypes = {
  minute: 'minutt',
  minutes: 'minutt',
  min: 'min',

  showingOf: 'Viser {{ visibleRows }} av {{ totalDataRows }}',
  showLess: 'Vis mindre',
  showMore: 'Vis meir',
  teacher: 'Lærer',

  fileSelect: 'Velg en fil',

  userNotFound: 'Bruker ikke funnet',
  noMoreResults: 'Ingen flere resultater',

  feideFetchStatus: {
    title: 'Feide-synkronisering...',
    fetching: 'Oppdaterer database med Feide-informasjon',
    error: 'Det oppstod en feil under forsøk på å hente informasjon fra feide',
    success: 'Studentoppdatering fra Feide var vellykket',
  },

  filters: {
    text: {
      filterBy: 'Filtrer etter:',
      filterResults: 'Filtreringsresultat',
      clearFilters: 'Tøm filter',
      selectItem: 'Vell eit {{ topic }}',
    },
    status: {
      title: 'Status',
      item: {
        allAssignments: 'Alle oppgåver',
        progress: 'Aktiv',
        upcoming: 'Planlagd',
        finished: 'Inaktiv',
      },
    },
    topics: {
      title: 'Tema',
    },
    assigned: {
      title: 'Tildelt',
      item: {
        students: 'elevar',
        groups: 'grupper',
      },
    },
    planets: {
      title: 'Planetar',
    },
    skills: {
      title: 'Ferdigheiter',
    },
  },
  imageAlt: {
    login: {
      gameCharacters: 'Spelkarakterar',
    },
  },
  status: {
    error: {
      somethingWentWrong: 'Noko gjekk gale',
      required: 'Denne oppføringen er obligatorisk',
      shouldBeAnEmail: 'Skal be om en e-post',
      emailDoesntMatch: `E-post stemmer ikke`,
      passwordDoesntMatch: `Passordet stemmer ikke`,
    },
  },
  state: {
    nrOfModesSelected: '{{ count }} Modus valgt',
    nrOfModesSelected_plural: '{{ count }} moduser valgt',
    nrOfModesSelected_0: 'Ingen moduser valgt',
    selected: 'Valt',
    notSelected: 'Ikke Valgt',
    selectedNumber: '{{ selectedNumber }} valt',
    removed: 'Fjerna',
    deleted: 'Sletta',
    modified: 'Modifisert',
    started: 'Påbyrja',
    ended: 'Avslutta',
  },
  selectAll: 'Vel alle',
  actions: {
    addNewTopic: 'Legg til nytt tema',
    addAndClose: 'Legg til og lukk',
    addAndContinue: 'Legg til og fortsett',
    edit: 'Rediger',
    delete: 'Slett',
    remove: 'Fjern',
    next: 'Neste',
    send: 'Sende',
    back: 'Attende',
    save: 'Lagre {{ addOn }}',
    update: 'Oppdater {{ addOn }}',
    select: 'Vel',
    confirm: 'Bekreft',
    cancel: 'Avbryt',
    report: 'Sjå rapport ',
    editParentsName: 'Rediger namn på føresette',
    moveToGroup: 'Flytt til ei gruppe',
    revoke: 'Fjern',
    moreOptions: 'Fleire val',
    saveCustomer: 'Redd kunde',
    close: 'Lukk',
    return: 'Gå tilbake',
    submit: 'Send inn',
  },
  user: {
    accountSettings: 'Kontoinnstillingar',
  },
  errors: {
    assignmentTitleIsRequired: 'Vennligst skriv inn et oppgavenavn',
    invalidDate: 'Ugyldig dato',
    invalidTime: 'Ugyldig tid',
    shouldNotBeEmpty: 'Skal ikke være tom',
    shouldNotBeEmptyAddon: '{{ key }} skal ikke være tom',
    unexpectedError: 'Uventet feil',
  },
  validation: {
    required: 'Dette er et obligatorisk felt',
  },
}

export default generalLocaleNo
