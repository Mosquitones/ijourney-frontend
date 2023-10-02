import React from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
  Box,
  Typography,
} from '@mui/material'
import { AxiosError } from 'axios'
import { useMutation } from 'react-query'

import { Button } from 'components'
import { useAuth, useFeedback } from 'contexts'
import { useIsDevice } from 'hooks'
import { ApiResponseTypes, CandidateServices } from 'services'

import { CompleteCouseModalPropTypes } from './CompleteCourseModal.types'

export const CompleteCourseModal: React.FC<CompleteCouseModalPropTypes> = ({
  course,
  refetchCourses,
  ...rest
}) => {
  const { userId } = useAuth()
  const isDevice = useIsDevice()
  const { alert } = useFeedback()

  const handleClose = () => {
    rest.onClose?.({}, 'backdropClick')
  }

  const completeCourseQuery = useMutation({
    mutationKey: [
      `/candidates/${userId}/courses/${course?.id}/complete`,
      { method: 'POST' },
    ],
    mutationFn: () =>
      CandidateServices.id.courses.id.complete.post(userId, Number(course?.id)),
    onSuccess: () => {
      refetchCourses?.()

      alert.showSuccess('Certificações obtidas com sucesso!')

      setTimeout(() => {
        handleClose()
      }, 1000)
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  return (
    <Dialog {...rest} fullScreen={isDevice.to.sm}>
      <>
        <DialogTitle
          id='alert-dialog-title'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          Obter certificado de conclusão
        </DialogTitle>
        <DialogContent sx={{ pb: 0 }}>
          <DialogContentText id='alert-dialog-description'>
            Você irá receber as certificações do curso{' '}
            <Typography
              component='span'
              fontSize='inherit'
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              {course?.title}
            </Typography>
            . Esta conquista representa um grande passo em sua jornada de
            desenvolvimento profissional. Com esta nova qualificação, você
            estará mais preparado para buscar empregos e oportunidades que
            correspondam ao seu conhecimento atualizado. Continue investindo em
            sua educação e alcance novos patamares em sua carreira!
          </DialogContentText>

          <Box
            display='flex'
            gap={1}
            alignItems='center'
            mt={2}
            flexWrap='wrap'
          >
            {course?.skills
              ?.sort((a, b) => a.id - b.id)
              .map((skill) => (
                <Chip key={skill.id} label={skill.name} />
              ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ flexWrap: 'wrap' }}>
          <Button onClick={handleClose}>Fechar</Button>
          <Button
            loading={completeCourseQuery.isLoading}
            disabled={completeCourseQuery.isLoading}
            onClick={() => {
              completeCourseQuery.mutate()
            }}
          >
            {completeCourseQuery.isIdle && 'Obter certificações'}
            {completeCourseQuery.isLoading && 'Obtendo certificações...'}
            {completeCourseQuery.isSuccess && 'Certificações obtidas'}
            {completeCourseQuery.isError && 'Ops. Algo de errado aconteceu'}
          </Button>
        </DialogActions>
      </>
    </Dialog>
  )
}
