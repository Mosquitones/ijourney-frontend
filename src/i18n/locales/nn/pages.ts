import { PagesLocaleTypes } from '../locales.types'

const pagesLocaleNn: PagesLocaleTypes = {
  login: {
    or: 'eller',
    aGameBy: 'Et spill av',
    form: {
      validation: {
        email: {
          required: 'E-post er påkrevd',
        },
        password: {
          required: 'Passord er påkrevd',
        },
      },
    },
  },
  checkout: {
    stepsCounter: 'Trinn {{ index }} av {{ maxSteps }}',
    steps: {
      contactInformation: {
        title: 'Kontaktinformasjon',
        form: {
          name: {
            label: 'Ditt fulle navn',
            placeholder: 'Fornavn og etternavn',
          },
          email: {
            label: 'Din e-postadresse',
            placeholder: 'E-postadresse',
            validation: {
              shouldBeValidEmail: 'Bør være en gyldig e-post',
            },
          },
          emailConfirmation: {
            label: 'Gjenta din e-postadresse',
            placeholder: 'Din e-postadresse',
            validation: {
              shouldMatchEmail: 'E-postbekreftelse må samsvare med e-post',
            },
          },
        },
      },
      membershipSelection: {
        title: 'Velg medlemskap',
        cardPlan: {
          header: {
            discount: {
              title: 'Early Bird-tilbud!',
              percentageOfDiscount:
                '<title>{{ percentageOfDiscount }}</title><description>rabatt</description>',
            },
          },
          typeOfPlan: {
            yearly: 'Årlig',
            monthly: 'Månedlig',
            halfYearly: 'Halvårlig',
            discount: {
              chip: 'Mest for pengene',
            },
          },
          priceOfPlan: {
            description: 'per barn <br />per måned',
          },
          howMuchIsPaidAccordingToTypeOfPlan:
            '{{ price }} betales {{ typeOfPlan }}',
          howMuchYouWillSave: 'Du sparer {{ price }}',
        },
        emptySubscriptionPlans:
          'Ingen tilgjengelige planer, vennligst kontakt <strong>vårt salgsteam</strong>!',
        form: {
          total: {
            title: 'Totalsum å betale',
          },
          promotionCode: {
            title: 'Legg til kampanjekode',
            success: 'Rabattkoden er registrert',
            input: {
              placeholder: 'Rabattkode',
            },
            button: 'Bruk',
          },
          payment: {
            title: 'Velg betalingsmetode',
          },
          terms: {
            description:
              'Ved å fortsette til betaling og registrere deg, aksepterer du <0>våre bruker- og avtalevilkår</0>, og at personopplysninger i tjenesten vil behandles i henhold til <1>vår personvernerklæring</1>.',
            checkbox: {
              label:
                'Ja, jeg vil motta nyhetsbrev og være den første til å motta gode tilbud, spilloppdateringer og nyheter. Vi driver ikke med spam, og du kan melde deg av når som helst.',
            },
          },
        },
        onSubmit: {
          stripeError:
            '{{ error }}. Feil ved å fullføre betalingen, vennligst kontakt vår support-e-post.',
        },
        actionButtons: {
          next: 'Fortsett til betaling',
          previous: 'Previous',
        },
        paymentConfirmation: {
          title: 'Snart ferdig!',
          subtitle: 'Betalingen ble godkjent.',
          description: `Nå skal du koble dine Numetry Fritid medlemskap til barnets brukerkonto.`,
          button: {
            error: 'Gå tilbake til kassen',
          },
        },
        kidAccountConfirmation: {
          title: 'Er deter kontoen du vil koble Numetry Fritid-medlemspak til?',
          username: 'Brukernavn',
          avatarName: 'Avatarnavn',
          accountConnectButton: 'Ja, koble til denne kontoen',
          connectOtherAccountButton: 'Nei, koble til en annen',
        },
        vippsErrorScreen: {
          title: 'Vipps-betalingen din mislyktes.',
          subtitle: 'Se gjennom faktureringsinformasjonen din og prøv på nytt.',
          button: 'Gå tilbake til kassen',
        },
        vippsLoadingScreen: {
          title: 'Vipps-betalingen din behandles, vennligst vent.',
        },
      },
      childrenAccount: {
        title: 'Legg til brukerkonto',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
        components: {
          confirmation: {
            title: 'Klar til utskyting!',
            subtitle: 'Takk for at du valgte Numetry Fritid!',
            description:
              'Nå kan barnet logge inn på Numetry med sitt brukernavn og passord, og få tilgang til alt Matema-systemet har å by på.',
            goBack: 'Tilbake til hjemmesiden!',
          },
        },
        subViews: {
          methods: {
            existingAccount: {
              title: 'Eksisterende konto',
              description:
                'Koble Numetry Fritid Medlemskapet til en eksisterende bruker',
              form: {
                username: {
                  label: 'Brukernavn',
                  placeholder: 'Brukernavn',
                },
                password: {
                  label: 'Passord',
                  placeholder: 'Passord',
                },
                showPassword: {
                  label: 'Vis passordet',
                },
              },
            },
            newAccount: {
              title: 'Lag en ny konto',
              description:
                'Barnet velger selv avatarnavn når de logger inn i spillet',
              form: {
                username: {
                  label: 'Brukernavn',
                  placeholder: 'Brukernavn',
                },
                password: {
                  label: 'Passord',
                  placeholder: 'Passord',
                  validation: {
                    min: 'Min passordlengde',
                  },
                },
                passwordConfirmation: {
                  label: 'Gjenta passord',
                  placeholder: 'Gjenta passord',
                  validation: {
                    shouldMatchPassword:
                      'Passordbekreftelse er ikke lik passord',
                  },
                },
                showPassword: {
                  label: 'Vis passordet',
                },
              },
              onSubmit: {
                usernameAlreadyTaken:
                  'Brukernavnet er allerede tatt. Forslag: {{ usernameSuggestion }}',
              },
            },
          },
          doItLater: {
            title: 'Vil du fullførre registrering senere?',
            description: `Trykk på knappen nedenfor for å bekrefte, så sender vi deg en e-post til <strong>{{ email }}</strong> med lenken for å forsete senere.`,
            cardPlan: {
              description:
                'Merk at barnet ikke vil ha tilgang til Numetry Premium før du har koblet til en brukerkonto.',
            },
            subViews: {
              confirmation: {
                title: 'E-post sendt!',
                description:
                  'Vi har nå sendt deg en e-post med lenke fo å legge til brukerkonto ved en senere anledning.',
              },
            },
            goBack: 'Gå tilbake',
            go: 'Ja, fullfør senere',
          },
          gameChild: {
            title:
              'Er deter kontoen du vil koble Numetry Fritid-medlemspak til?',
            actionButtons: {
              connectToThisAccount: 'Ja, koble til denne kontoen',
              connectToAnotherOne: 'Nei, koble til en annen',
            },
          },
        },
        actionButtons: {
          goBack: 'Legg til brukerkonto',
          doItLater: 'Gjør det senere',
          go: 'Klar, ferdig, gå!',
        },
      },
    },
    actionButtons: {
      next: 'Neste',
    },
  },
  kids: {
    title: 'Administrer barn',
    subtitle: 'Se og rediger informasjonen til barna dine.',
    table: {
      yourKids: 'Dine unger',
      addKid: 'Legg til barn',
      name: 'Navn',
      password: 'Passord',
      subscriptionType: 'Type abonnement',
      renewalDate: 'Fornyelsesdato',
      manageKids: 'Administrer barnas',
    },
  },
  account: {
    tab: {
      account: 'Regnskap',
      invoice: 'Betalingshistorikk',
    },
    editAccount: 'Rediger informasjon',
    editForm: {
      username: {
        title: 'Endre brukernavn',
        firstName: 'Fornavn',
        lastName: 'Etternavn',
      },
      email: {
        title: 'Endre e-posten din',
        currentEmail: 'Nåværende epost',
        newEmail: 'Ny epost',
        confirmation: 'Bekreft ny e-post',
      },
      phone: {
        title: 'Bytt mobilnummer',
        newPhone: 'Nytt mobilnummer',
      },
      address: {
        title: 'Endre adressen din',
        streetName: 'Gatenavn',
        zip: 'Postnummer',
        postOffice: 'Postadresse',
      },
      password: {
        title: 'Bytt passord',
        currentPassword: 'Nåværende passord',
        forgotPassword: 'Glemt passordet',
        newPassword: 'Nåværende passord',
        confirmPassword: 'Bekreft passord',
      },
    },
    accountOverview: {
      title: 'Konto-oversikt',
      subtitle: 'Rediger og administrer kontoopplysningene dine',
      form: {
        name: 'Navn',
        email: 'E-post',
        phone: 'Mobilnummer',
        city: 'By',
        password: 'Passord',
        save: 'Lagre informasjon',
      },
    },
    invoices: {
      title: 'Betalingshistorikk',
      subtitle:
        'Se gjennom faktureringsloggen din og administrer fakturaene dine',
    },
    insight: {
      title: 'Innsyn',
      insightText:
        'Du har rett til innsyn i personopplysninger lånekassen har registrert om deg. Ønsker du innsyn i personopplysninger, ber om det her.',
      aboutResponseInTime: 'Om svartid',
      aboutResponseInTimeText:
        'Meldingen om innsyn eller andre rettigheter knyttet til behandlingen av personopplysninger , skal du få svar på rakst, senest innen en måned. Dersom det går lengre tid, vil du få et foreløpig svar med opplysninger om årsaken til forsinkelsen.',
      youMust: 'Dette må du skrive i meldingen din',
      youMustText:
        'Skriv minst 60 tegn om hvad du ønsker innsyn i, for eksempel at det gjelder opplysninger knyttet til behandlingen av en bestemt søknad eller til en bestemt periode. Vennligst skriv så konkret som mulig hva du ønsker innsyn i.',
    },
    inspection: {
      title: 'Be om innsyn',
      message: 'Melding',
    },
    twoFactorPrompt: {
      title: 'Tofaktorautentisering',
      subtitle: 'Skriv inn autentiseringskoden for å fortsette',
    },
    cancelAccount: {
      title: 'Avslutt konto',
      deleteAccount: 'Slett kontoen min',
      cancelAccountText:
        'Ver å trykke på knappen nedenfor vil du bli logget ut, og personopplysninger om deg vil bli slettet etter <strong>30 dager.</strong>',
    },
  },
}

export default pagesLocaleNn
