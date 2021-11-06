import { styled, transition } from '@generates/swag'

export default styled('a', {
  cursor: 'pointer',
  color: '$sky200',
  '&:hover': {
    color: '$sky300'
  },
  ...transition
})
