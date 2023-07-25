export default {
  search: {
    placeholder: {
      default: 'Search...',
      assignments: 'Search for assignments...',
    },
    noOptions: {
      default: 'No options',
    },
    suggestions: {
      title: 'Suggestions',
    },
    loading: {
      default: 'Loading...',
    },
  },
  button: {
    text: {
      viewResults: 'View Results',
      report: 'Report',
      edit: 'Edit',
      newAssignment: 'New assignment',
      createNewGroup: 'Create a new group',
      selectLanguage: 'Select a language',
      createNewAssignment: 'Create new assignment',
      reports: 'Reports',
      moreInfo: 'More info',
      readMore: 'Read more',
      offlineContent: 'Offline games',
      buyLicenses: 'Buy licenses',
      assignLicenses: 'Assign licenses',
      manage: 'Manage',
      addCustomer: 'Add customer',
      addLicenses: 'Add licenses',
      addInvoice: 'Add invoice',
      successfullyAdded: 'Successfully added',
    },
  },
  groupListItem: {
    students: '{{ studentCount }} students',
  },
  gameCard: {
    more: 'More',
    topics: 'Topics',
    skills: 'Skills:',
    tags: 'Tags:',
    playTime: 'Play time:',
    chooseGameModes: 'Choose game modes:',
    chooseModes: 'Choose modes',
    challenges: {
      core: 'Core mode',
      one: 'Challenge 1',
      two: 'Challenge 2',
    },
  },
  modals: {
    confirmation: {
      assignment: {
        title: 'Confirmation',
        subtitleForCreated:
          'Your assignment will be activated {{ date }} at {{ time }}.',
        subtitleForUpdated: 'The assignment was successfully updated',
      },
    },
    error: {
      assignment: {
        title: 'Unexpected Error',
        subtitleForCreated:
          'Something went wrong creating the new assignment. Please try again later',
        subtitleForUpdated:
          'Something went wrong updating the assignment. Please try again later',
      },
    },
    gameDetails: {
      topics: 'Topics:',
      skills: 'Skills:',
      gameModes: 'Modes:',
      tags: 'Tags:',
      levelInfo: 'Level info',
      preClassroom: 'Pre Classroom',
      afterPlaying: 'After Playing',
      whatTheKidsShouldDoNow: 'What’s next?',
      relatedGames: 'Related games',
      playTime: '<strong>Play time:</strong> {{ minutes }}',
      tasks: 'tasks',
      curriculumObjectives: 'Curriculum objectives',
      missionDetails: 'Mission Details',
      selectMode: 'Select mode',
      modesSubtitle:
        'There is one mode available, see more about it below in the Level Info tab',
      modesSubtitle_plural:
        'There are {{ count }} modes available, see more about them below in the Level Info tab',
    },
    assignTo: {
      title: 'Assigned to',
      subtitle: 'Select students to assign this assessment',
      wholeClass: 'Whole class',
      students: 'Students',
      groups: 'Groups',
    },
    editGroup: {
      title: 'Edit group',
      groupLabel: 'Group name',
      enterGroupName: 'Enter a group name',
      errorMessage: {
        pleasePutGroupName: 'Please, enter a group name',
      },
    },
  },
  slider: {
    from: 'From',
    to: 'To',
  },
  pdf: {
    class: 'Class',
    name: 'Name',
    generators: {
      answerSheet: {
        title: 'Answer Sheet',
      },
      multiplication: {
        name: 'Multiplication',
      },
      addition: {
        name: 'Addition & Subtraction',
      },
      division: {
        name: 'Division',
      },
      fraction: {
        name: 'Fraction',
      },
    },
  },
  userTableRow: {
    results: "{{ name }}'s results",
  },
  table: {
    pagination: {
      previous: 'Previous',
      next: 'Next',
    },
    noRows: 'No rows',
  },
  picker: {
    from: 'From',
    to: 'To',
  },
}
