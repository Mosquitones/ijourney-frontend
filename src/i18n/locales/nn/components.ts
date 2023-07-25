import { ComponentsLocaleTypes } from '../locales.types'

const componentsLocaleNo: ComponentsLocaleTypes = {
  search: {
    placeholder: {
      default: 'Søk...',
      assignments: 'Søk i oppdrag...',
    },
    noOptions: {
      default: 'Ingen resultat',
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
      viewResults: 'Vis resultat',
      report: 'Sjå rapport',
      edit: 'Rediger',
      newAssignment: 'Ny oppgåve',
      createNewGroup: 'Lag ei ny gruppe',
      selectLanguage: 'Vel språk',
      createNewAssignment: 'Lag ei ny oppgåve',
      reports: 'Rapportar',
      moreInfo: 'Meir info',
      readMore: 'Les meir',
      offlineContent: 'Oppdragsark',
      buyLicenses: 'Kjøp lisensar',
      assignLicenses: 'Tildel lisensar',
      manage: 'Administrer',
      addCustomer: 'Legg til kunde',
      addLicenses: 'Legg til lisenser',
      addInvoice: 'Legg til lisens',
      successfullyAdded: 'Vallykket lagt til',
    },
  },
  groupListItem: {
    students: '{{ studentCount }} elevar',
  },
  gameCard: {
    more: 'Meir...',
    topics: 'Tema:',
    skills: 'Ferdigheiter:',
    tags: 'Tags:',
    playTime: 'Speletid:',
    chooseGameModes: 'Vel spelmodus:',
    chooseModes: 'Velg moduser',
    challenges: {
      core: 'Historiemodus',
      one: 'Utfordringsmodus 1',
      two: 'Utfordringsmodus 2',
    },
  },
  modals: {
    confirmation: {
      assignment: {
        title: 'Stadfesting',
        subtitleForCreated: 'Oppgåva di vert aktiv {{ date }} kl.{{ time }}.',
        subtitleForUpdated: 'Oppgåva di vart oppdatert',
      },
    },
    error: {
      assignment: {
        title: 'Det har oppstått ein uventa feil',
        subtitleForCreated:
          'Oi, noko gjekk gale. Prøv på nytt, eller kontakt oss, så skal vi hjelpe deg.',
        subtitleForUpdated:
          'Oi, noko gjekk gale. Prøv på nytt, eller kontakt oss, så skal vi hjelpe deg.',
      },
    },
    gameDetails: {
      topics: 'Tema:',
      skills: 'Ferdigheiter:',
      gameModes: 'Modusar:',
      tags: 'Tags:',
      levelInfo: 'Oversyn',
      preClassroom: 'Fagleg bakgrunn',
      afterPlaying: 'Relaterte ressursar',
      whatTheKidsShouldDoNow: 'Ressursar',
      relatedGames: 'Sjå også',
      playTime: '<strong>Speletid:</strong>  {{ minutes }}',
      tasks: 'Oppgåver',
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
      subtitle: 'Vel kva for elevar som skal tildelast denne oppgåva',
      wholeClass: 'Heile klassa',
      students: 'Studenter',
      groups: 'Grupper',
    },
    editGroup: {
      title: 'Rediger gruppe',
      groupLabel: 'Gruppenavn',
      enterGroupName: 'Skriv inn et gruppenavn',
      errorMessage: {
        pleasePutGroupName: 'Vennligst skriv inn et gruppenavn',
      },
    },
  },
  slider: {
    from: 'Frå',
    to: 'Til',
  },
  pdf: {
    class: 'Klasse',
    name: 'Namn',
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
    results: '{{ name }} sine resultat',
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

export default componentsLocaleNo
