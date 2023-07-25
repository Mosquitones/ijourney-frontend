import { NavigationLocaleTypes } from '../locales.types'

const navigationLocaleNb: NavigationLocaleTypes = {
  mainMenu: {
    title: 'Hovedmeny',
    titleMobile: 'Mer',
  },
  account: {
    title: 'Account',
  },
  kids: {
    title: 'Kids',
  },
  menu: {
    title: 'Meny',
  },
  createAssignment: {
    title: {
      normal: 'Lag en oppgave',
      edit: 'Redigering av {{ name }} oppgave',
    },
    titleMobile: 'Matteoppdrag',
    subtitle: `Velg nye oppdrag å legge til i oppgaven. Finn ut mer om hvert spill ved å klikke på <"Mer info"> på kortet. Du kan også begynne å lage en oppgave ved å velge spill nedenfor.`,
    alternativeSubtitle: '',
  },
  assignments: {
    title: 'Oppgave',
    newTitle: 'Lag en ny oppgave',
    newSubtitle:
      'Velg ulike matteoppdrag og moduser som skal være med i opplegget. For å lære mer om hvert oppdrag klikk på <“More Info”>.',
  },
  library: {
    title: 'Bibliotek',
    subTitle: 'Her kan du se våre tilgjengelige spill og lese mer om dem',
  },

  reports: {
    title: 'Rapporter',
  },
  offlineContent: {
    title: 'Ressurser',
    titleMobile: 'Ressurser',
  },
  students: {
    title: 'Elever',
    newTitle: 'Mine elever',
  },
  license: {
    title: 'Lisenser',
    tabs: {
      manage: {
        title: 'Administrer lisenser',
      },
      buy: {
        title: 'Bestill lisenser',
      },
    },
  },
  helpAndSupport: {
    title: 'Brukerstøtte',
  },
  settings: {
    title: 'Kontoinnstillinger',
  },
  customerOverview: {
    title: 'Kundeoversikt',
  },
}

export default navigationLocaleNb
