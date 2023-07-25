import { GeneralLocaleTypes } from '../locales.types'

const generalLocaleBo: GeneralLocaleTypes = {
  minute: 'minutt',
  minutes: 'minutter',
  min: 'min',

  showingOf: 'Viser {{ visibleRows }} av {{ totalDataRows }}',
  showLess: 'Vis mindre',
  showMore: 'Vis mer',
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
      filterResults: 'Filtrerings resultater',
      clearFilters: 'Tøm filter',
      selectItem: 'Velg et {{ topic }}',
    },
    status: {
      title: 'Status',
      item: {
        allAssignments: 'alle oppgaver',
        progress: 'aktiv',
        upcoming: 'planlagt',
        finished: 'inaktiv',
      },
    },
    topics: {
      title: 'Temaer',
    },
    assigned: {
      title: 'Tildelt',
      item: {
        students: 'elever',
        groups: 'grupper',
      },
    },
    planets: {
      title: 'Planeter',
    },
    skills: {
      title: 'Ferdigheter',
    },
  },
  imageAlt: {
    login: {
      gameCharacters: 'Spillkarakterer',
    },
  },
  status: {
    error: {
      somethingWentWrong: 'Noe gikk galt',
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
    selected: 'Valgt',
    notSelected: 'Ikke Valgt',
    selectedNumber: '{{ selectedNumber }} valgt',
    removed: 'Fjernet',
    deleted: 'Slettet',
    modified: 'Modifisert',
    started: 'Påbegynt',
    ended: 'Avsluttet',
  },
  selectAll: 'Velg alle',
  actions: {
    addNewTopic: 'Legg til nytt tema',
    addAndClose: 'Legg til og lukk',
    addAndContinue: 'Legg til og fortsett',
    send: 'Sende',
    edit: 'Rediger',
    delete: 'Slett',
    remove: 'Fjern',
    next: 'Neste',
    back: 'Tilbake',
    save: 'Lagre {{ addOn }}',
    update: 'Oppdater {{ addOn }}',
    select: 'Velg',
    confirm: 'Bekreft',
    cancel: 'Avbryt',
    report: 'Se rapport',
    editParentsName: 'Rediger foresattes navn',
    moveToGroup: 'Flytt til en gruppe',
    moreOptions: 'Flere valg',
    saveCustomer: 'Redd kunde',
    close: 'Lukk',
    revoke: 'Fjern',
    return: 'Gå tilbake',
    submit: 'Send inn',
  },
  user: {
    accountSettings: 'Kontoinnstillinger',
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

export default generalLocaleBo
