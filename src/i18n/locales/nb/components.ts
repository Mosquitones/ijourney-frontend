import { ComponentsLocaleTypes } from '../locales.types'

const componentsLocaleBo: ComponentsLocaleTypes = {
  search: {
    placeholder: {
      default: 'Søk...',
      assignments: 'Søk i oppdrag...',
    },
    noOptions: {
      default: 'Ingen resultater',
    },
    suggestions: {
      title: 'Forslag',
    },
    loading: {
      default: 'Laster...',
    },
  },
  button: {
    text: {
      viewResults: 'Vis resultater',
      report: 'Se rapport',
      edit: 'Rediger',
      newAssignment: 'Ny oppgave',
      createNewGroup: 'Lag en ny gruppe',
      selectLanguage: 'Velg språk',
      createNewAssignment: 'Lag en ny oppgave',
      reports: 'Rapporter',
      moreInfo: 'Mer info',
      offlineContent: 'Oppdragsark',
      buyLicenses: 'Kjøp lisenser',
      assignLicenses: 'Tildel lisenser',
      manage: 'Administrer',
      readMore: 'Les mer',
      addCustomer: 'Legg til kunde',
      addLicenses: 'Legg til lisenser',
      addInvoice: 'Legg til lisens',
      successfullyAdded: 'Vallykket lagt til',
    },
  },
  groupListItem: {
    students: '{{ studentCount }} elever',
  },
  gameCard: {
    more: 'Mer...',
    topics: 'Temaer',
    skills: 'Ferdigheter:',
    tags: 'Tags:',
    playTime: 'Spilletid:',
    chooseGameModes: 'Velg spillmodus:',
    chooseModes: 'Velg modus',
    challenges: {
      core: 'Historiemodus',
      one: 'Modus 1',
      two: 'Modus 2',
    },
  },
  modals: {
    confirmation: {
      assignment: {
        title: 'Bekreftelse',
        subtitleForCreated: 'Oppgaven din blir aktiv {{ date }} kl.{{ time }}.',
        subtitleForUpdated: 'Oppgaven din har blitt oppdatert.',
      },
    },
    error: {
      assignment: {
        title: 'En uventet feil har oppstått.',
        subtitleForCreated:
          'Oi, noe gikk galt. Prøv på nytt, eller kontakt oss så skal vi hjelpe deg.',
        subtitleForUpdated:
          'Oi, noe gikk galt. Prøv på nytt, eller kontakt oss så skal vi hjelpe deg.',
      },
    },
    gameDetails: {
      topics: 'Temaer:',
      skills: 'Ferdigheter:',
      gameModes: 'Moduser:',
      tags: 'Tags:',
      levelInfo: 'Oversikt',
      preClassroom: 'Faglig Bakgrunn',
      afterPlaying: 'Relaterte ressurser',
      whatTheKidsShouldDoNow: 'Ressurser',
      relatedGames: 'Se også:',
      playTime: '<strong>Spilletid:</strong> {{ minutes }}',
      tasks: 'oppgaver',
      curriculumObjectives: 'Læreplanmål',
      missionDetails: 'Oppdragsdetaljer',
      selectMode: 'Velg modus',
      modesSubtitle:
        'Det er én tilgjengelig modus, se mer om det nedenfor i fanen Nivåinfo',
      modesSubtitle_plural:
        'Det er {{ count }} moduser tilgjengelig, se mer om dem nedenfor i fanen Nivåinformasjon',
    },
    assignTo: {
      title: 'Tildeling',
      subtitle: 'Velg hvilke elever som skal tildeles dette oppgaven',
      wholeClass: 'Hele klassen',
      students: 'Studenter',
      groups: 'Grupper',
    },
    editGroup: {
      title: 'Rediger gruppe',
      groupLabel: 'Gruppenavn',
      enterGroupName: 'Lag et gruppenavn',
      errorMessage: {
        pleasePutGroupName: 'Gruppenavn mangler',
      },
    },
  },
  slider: {
    from: 'Fra',
    to: 'Til',
  },
  pdf: {
    class: 'Klasse',
    name: 'Navn',
    generators: {
      answerSheet: {
        title: 'Svar ark',
      },
      multiplication: {
        name: 'Multiplikasjon',
      },
      addition: {
        name: 'Addisjon & Subtraksjon',
      },
      division: {
        name: 'Divisjon',
      },
      fraction: {
        name: 'Brøk',
      },
    },
  },
  userTableRow: {
    results: '{{ name }} sine resultater',
  },
  table: {
    pagination: {
      previous: 'Forrige',
      next: 'Neste',
    },
    noRows: 'Ingen rader',
  },
  picker: {
    from: 'Fra',
    to: 'Til',
  },
}

export default componentsLocaleBo
