import { exercises } from '../src/exercises'

const fail = (message: string): never => {
  throw new Error(message)
}

if (exercises.length !== 195) fail(`Expected 195 exercises, found ${exercises.length}`)

exercises.forEach((exercise, index) => {
  if (exercise.id !== index + 1) fail(`Exercise ID mismatch at index ${index}`)
  if (!exercise.original.trim()) fail(`Exercise ${exercise.id} has an empty prompt`)
  if (!exercise.corrected.trim()) fail(`Exercise ${exercise.id} has an empty answer`)
  if (exercise.correctAsWritten && exercise.original !== exercise.corrected) {
    fail(`Exercise ${exercise.id} is marked correct but the texts differ`)
  }
})

for (let group = 1; group <= 19; group += 1) {
  const count = exercises.filter((exercise) => exercise.group === group).length
  if (count !== 10) fail(`Group ${group} should contain 10 exercises, found ${count}`)
}

const group20Count = exercises.filter((exercise) => exercise.group === 20).length
if (group20Count !== 5) fail(`Group 20 should contain 5 exercises, found ${group20Count}`)

const last = exercises.at(-1)!
if (last.original !== 'There has been a slight rise of the number of men employed.') {
  fail('The required final exercise is missing or out of order')
}
if (last.corrected !== 'There has been a slight rise in the number of men employed.') {
  fail('The final correction is wrong')
}

console.log(`Validated ${exercises.length} exercises across 20 groups.`)
