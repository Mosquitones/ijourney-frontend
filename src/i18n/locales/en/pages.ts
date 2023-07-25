export default {
  login: {
    or: 'Or',
    aGameBy: 'A game by',
    form: {
      validation: {
        email: {
          required: 'Email is required',
        },
        password: {
          required: 'Password is required',
        },
      },
    },
  },
  checkout: {
    stepsCounter: 'Step {{ index }} of {{ maxSteps }}',
    steps: {
      contactInformation: {
        title: 'Contact information',
        form: {
          name: {
            label: 'Your full name',
            placeholder: 'First name and last name',
          },
          email: {
            label: 'Your e-mail address',
            placeholder: 'E-mail address',
            validation: {
              shouldBeValidEmail: 'Should be a valid email',
            },
          },
          emailConfirmation: {
            label: 'Repeat your e-mail address',
            placeholder: 'E-mail confirmation address',
            validation: {
              shouldMatchEmail: 'Email confirmation must match email',
            },
          },
        },
      },
      membershipSelection: {
        title: 'Select membership',
        cardPlan: {
          header: {
            discount: {
              title: 'Early Bird Offer!',
              percentageOfDiscount:
                '<title>{{ percentageOfDiscount }}</title><description>discount</description>',
            },
          },
          typeOfPlan: {
            yearly: 'Yearly',
            monthly: 'Monthly',
            halfYearly: 'Half-Yearly',
            discount: {
              chip: 'Most for the money',
            },
          },
          priceOfPlan: {
            description: 'per child <br />per month',
          },
          howMuchIsPaidAccordingToTypeOfPlan:
            '{{ price }} is paid {{ typeOfPlan }}',
          howMuchYouWillSave: 'You save {{ price }}',
        },
        emptySubscriptionPlans:
          'No plans available, please contact our <strong>sales team</strong>!',
        form: {
          total: {
            title: 'Total amount to pay',
          },
          promotionCode: {
            title: 'Add promo code',
            success: 'The discount code has been registered',
            input: {
              placeholder: 'Discount code',
            },
            button: 'Use',
          },
          payment: {
            title: 'Select payment method',
          },
          terms: {
            description:
              'By proceeding to payment and registering, you accept <0>our terms of use and agreement</0>, and that personal data in the service will be processed accordingly to <1>our privacy policy</1>.',
            checkbox: {
              label:
                'Yes, I want to receive newsletters and be the first to receive good ones offers, game updates and news. We do not deal with spam, and you can unsubscribe at any time.',
            },
          },
        },
        onSubmit: {
          stripeError:
            '{{ error }}. Error to complete your payment, please contact our support email.',
        },
        actionButtons: {
          next: 'Proceed to payment',
          previous: 'Previous',
        },
        paymentConfirmation: {
          title: 'Soon Done!',
          subtitle: 'The payment was approved.',
          description: `Now you must connect your Numetry Fritid membership to the child's user account.`,
          button: {
            error: 'Return to checkout',
          },
        },
        kidAccountConfirmation: {
          title:
            'Is that the account you want to connect the Numetry Leisure membership package to?',
          username: 'Username',
          avatarName: 'Avatar name',
          accountConnectButton: 'Yes, connect this account',
          connectOtherAccountButton: 'No, connect to another one',
        },
        vippsErrorScreen: {
          title: 'Your Vipps payment was unsuccessful.',
          subtitle: 'Please review your billing information and try again.',
          button: 'Return to checkout',
        },
        vippsLoadingScreen: {
          title: 'Your Vipps payment is being processed, please wait.',
        },
      },
      childrenAccount: {
        title: 'Add user account',
        description:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
        components: {
          confirmation: {
            title: 'Ready for launch!',
            subtitle: 'Thank you for choosing Numetry Fritid!',
            description:
              'Now the child can log in to Numetry with their username and password, and gain access to everything the Matema system has to offer.',
            goBack: 'Back to the home page!',
          },
        },
        subViews: {
          methods: {
            existingAccount: {
              title: 'Existing Account',
              description:
                'Link the Numetry Leisure Membership to an existing user',
              form: {
                username: {
                  label: 'Username',
                  placeholder: 'Username',
                },
                password: {
                  label: 'Password',
                  placeholder: 'Password',
                },
                showPassword: {
                  label: 'Show the password',
                },
              },
            },
            newAccount: {
              title: 'Create a new account',
              description:
                'The child chooses their own avatar name when they log into the game',
              form: {
                username: {
                  label: 'Username',
                  placeholder: 'Username',
                },
                password: {
                  label: 'Password',
                  placeholder: 'Password',
                  validation: {
                    min: 'Min password length',
                  },
                },
                passwordConfirmation: {
                  label: 'Repeat password',
                  placeholder: 'Repeat password',
                  validation: {
                    shouldMatchPassword:
                      'Password confirmation is not equals to password',
                  },
                },
                showPassword: {
                  label: 'Show the password',
                },
              },
              onSubmit: {
                usernameAlreadyTaken:
                  'Username already taken. Suggestion: {{ usernameSuggestion }}',
              },
            },
          },
          doItLater: {
            title: 'Do you want to complete registration later?',
            description: `Press the button below to confirm and we'll send you an email to <strong>{{ email }}</strong> with the link to continue later.`,
            cardPlan: {
              description:
                'Note that the child will not have access to Numetry Premium until you have connected a user account.',
            },
            subViews: {
              confirmation: {
                title: 'Email sent!',
                description:
                  'We have now sent you an e-mail with a link to add a user account on a later occasion.',
              },
            },
            goBack: 'Return',
            go: 'Yes, finish later',
          },
          gameChild: {
            title:
              'Is that the account you want to connect the Numetry Leisure membership package to?',
            actionButtons: {
              connectToThisAccount: 'Yes, connect to this account',
              connectToAnotherOne: 'No, connect to another one',
            },
          },
        },
        actionButtons: {
          goBack: 'Add user account',
          doItLater: 'Do it later',
          go: 'Ready, set, go!',
        },
      },
    },
    actionButtons: {
      next: 'Next',
    },
  },
  kids: {
    title: 'Manage kids',
    subtitle: 'View and edit your kids’ information.',
    table: {
      yourKids: 'Your kids',
      addKid: 'Add kid',
      name: 'Name',
      password: 'Password',
      subscriptionType: 'Subscription type',
      renewalDate: 'Renewal date',
      manageKids: 'Manage kids',
    },
  },
  account: {
    tab: {
      account: 'Account',
      invoice: 'Payment history',
    },
    editAccount: 'Edit information',
    editForm: {
      username: {
        title: 'Change username',
        firstName: 'First name and middle name',
        lastName: 'Surname',
      },
      email: {
        title: 'Change your e-mail',
        currentEmail: 'Current e-mail',
        newEmail: 'New e-mail',
        confirmation: 'Confirm new e-mail',
      },
      phone: {
        title: 'Change your mobile number',
        newPhone: 'New mobile number',
      },
      address: {
        title: 'Change your address',
        streetName: 'Street name',
        zip: 'Postal code',
        postOffice: 'Postal address',
      },
      password: {
        title: 'Change your password',
        currentPassword: 'Current password',
        forgotPassword: 'Forgot your password',
        newPassword: 'Current password',
        confirmPassword: 'Current password',
      },
    },
    accountOverview: {
      title: 'Account overview',
      subtitle: 'Edit and manage you account details',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Mobile Number',
        city: 'City',
        password: 'Password',
        save: 'Save information',
      },
    },
    invoices: {
      title: 'Payment history',
      subtitle: 'Review your billing history and manage your invoices',
    },
    insight: {
      title: 'Insight',
      insightText:
        'You have the right to access the personal data the loan office has registered about you. If you want access to personal data, request it here.',
      aboutResponseInTime: 'About response time',
      aboutResponseInTimeText:
        'You must receive a response to the notice of access or other rights related to the processing of personal data promptly, within one month at the latest. If it takes longer, you will receive a preliminary reply with information about the reason for the delay.',
      youMust: 'You must write this in your message',
      youMustText:
        'Write at least 60 characters about what you want access to, for example that it concerns information related to the processing of a specific application or to a specific period. Please write as specifically as possible what you want access to.',
    },
    inspection: {
      title: 'Request access',
      message: 'Message',
    },
    twoFactorPrompt: {
      title: 'Two factor authentication',
      subtitle: 'Enter the authentication code to continue',
    },
    cancelAccount: {
      title: 'Close account',
      deleteAccount: 'Delete my account',
      cancelAccountText:
        'If you press the button below, you will be logged out, and your personal data will be deleted after <strong>30 days.</strong>',
    },
  },
}
