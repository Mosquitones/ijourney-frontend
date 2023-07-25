import React, { useCallback, useState } from 'react'

import { Input, Button } from '@eduplaytion/numetry-ui-kit'
import { Box, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'

import { InputStackStyles } from './TwoFactor.styles'
import { useInputHandlers, FormEffectHandler } from './utils'
import defaultForm from './utils/defaultForm'

export default function TwoFactorPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { handleInputChange, handleInputFocus, handleKeyboardActions } =
    useInputHandlers()

  const handleSubmit = useCallback((_val: { code: string[] }) => {
    // TODO: api request and remove this placeholder loading
    const lastActive = document.activeElement
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (
        lastActive instanceof HTMLElement &&
        lastActive.tagName !== 'BUTTON'
      ) {
        lastActive.focus()
      } else {
        document.getElementsByName(`code[0]`)[0].focus()
      }
    }, 1200)
  }, [])

  return (
    <Formik onSubmit={handleSubmit} initialValues={defaultForm}>
      {(props) => (
        <Form>
          <Typography
            color='primary.main'
            fontWeight='bold'
            variant='subtitle1'
            px={4}
            pt={3}
          >
            {t('pages.account.twoFactorPrompt.title')}
          </Typography>
          <Box p={4} pt={3}>
            <Typography
              fontWeight={(theme) => theme.typography.fontWeightBold}
              textAlign='center'
            >
              {t('pages.account.twoFactorPrompt.subtitle')}
            </Typography>
            <InputStackStyles
              direction='row'
              justifyContent='center'
              spacing={1}
              my={2}
            >
              {[...Array(6)].map((_, index) => (
                <Input
                  key={`code[${index.toString()}]`}
                  name={`code[${index}]`}
                  componentsProps={{
                    input: { maxLength: 1 },
                  }}
                  disabled={isLoading}
                  onChange={(e) => handleInputChange(e, props.handleChange)}
                  onKeyDown={(e) => handleKeyboardActions(e, index)}
                  onFocus={handleInputFocus}
                />
              ))}
              <FormEffectHandler onFilled={handleSubmit} />
            </InputStackStyles>
            <Button
              type='submit'
              loading={isLoading}
              disabled={isLoading}
              variant='contained'
              fullWidth
            >
              {t('general.actions.submit')}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
